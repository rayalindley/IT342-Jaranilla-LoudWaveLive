import { useRef, useState } from "react";
import { isValidCloudinaryUrl } from "../../../shared/utils/cloudinary";
import "../../../styles/poster-upload.css";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

function PosterUpload({ imageUrl, setImageUrl, onUploadStart, onUploadEnd }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(imageUrl || "");
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setUploadError("Only JPG, PNG, WebP, and GIF files are allowed.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File size must be less than 10MB.");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    if (onUploadStart) {
      onUploadStart();
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("folder", "loudwavelive/posters");

      console.log("Uploading to Cloudinary...");
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || `Upload failed with status ${response.status}`
        );
      }

      const data = await response.json();
      console.log("Upload successful:", data);

      const secureUrl = data.secure_url;
      setImageUrl(secureUrl);
      setPreviewUrl(secureUrl);
      setUploadError("");

      if (onUploadEnd) {
        onUploadEnd(secureUrl);
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError(
        error.message || "Upload failed. Please check your configuration and try again."
      );
      if (onUploadEnd) {
        onUploadEnd(null);
      }
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleClearImage = () => {
    setImageUrl("");
    setPreviewUrl("");
    setUploadError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="poster-upload-container">
      <label className="poster-upload-label">Poster Image</label>

      <div className="poster-upload-widget">
        {previewUrl && isValidCloudinaryUrl(previewUrl) ? (
          <div className="poster-preview">
            <img
              src={previewUrl}
              alt="Event poster preview"
              className="poster-preview-image"
            />
            <button
              type="button"
              className="change-poster-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Change Poster"}
            </button>
            <button
              type="button"
              className="clear-poster-btn"
              onClick={handleClearImage}
              disabled={isUploading}
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="poster-upload-area">
            <button
              type="button"
              className="upload-poster-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <span className="upload-spinner"></span>
                  Uploading...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  Upload Poster Image
                </>
              )}
            </button>
            <p className="upload-hint">
              JPG, PNG, WebP, or GIF (Max 10MB)
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileSelect}
              disabled={isUploading}
              style={{ display: "none" }}
            />
          </div>
        )}
      </div>

      {uploadError && (
        <div className="upload-error-message">
          {uploadError}
        </div>
      )}

      {/* Hidden input to store the URL for form submission */}
      <input
        type="hidden"
        name="imageUrl"
        value={imageUrl}
      />
    </div>
  );
}

export default PosterUpload;
