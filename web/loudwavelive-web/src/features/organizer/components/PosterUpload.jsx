import { useEffect, useRef, useState } from "react";
import { isValidCloudinaryUrl } from "../../../shared/utils/cloudinary";
import "../../../styles/poster-upload.css";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

function PosterUpload({ imageUrl, setImageUrl, onUploadStart, onUploadEnd }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(imageUrl || "");
  const widgetRef = useRef(null);
  const scriptLoadedRef = useRef(false);

  // Load Cloudinary widget script
  useEffect(() => {
    if (scriptLoadedRef.current || window.cloudinary) {
      console.log("Cloudinary widget already loaded");
      return;
    }

    // Use the proper Cloudinary upload widget CDN URL
    const cdnUrls = [
      "https://upload-widget.cloudinary.com/latest/index.js",
      "https://cdn.jsdelivr.net/npm/cloudinary-upload-widget@2.2.0/index.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/cloudinary-upload-widget/2.2.0/index.min.js"
    ];

    let scriptLoaded = false;
    let currentUrlIndex = 0;

    const tryLoadScript = (urlIndex) => {
      if (urlIndex >= cdnUrls.length) {
        console.error("Failed to load Cloudinary from all CDN URLs");
        setUploadError("Failed to load upload widget from all sources. Please check your internet connection and refresh the page.");
        return;
      }

      const script = document.createElement("script");
      script.src = cdnUrls[urlIndex];
      script.async = true;
      script.type = "text/javascript";
      script.crossOrigin = "anonymous";

      script.onload = () => {
        console.log(`Cloudinary loaded from: ${cdnUrls[urlIndex]}`);
        
        // Verify the upload widget is available
        if (window.cloudinary && typeof window.cloudinary.openUploadWidget === 'function') {
          scriptLoadedRef.current = true;
          scriptLoaded = true;
          setUploadError(""); // Clear any previous errors
        } else {
          console.warn("Script loaded but openUploadWidget not available, trying next URL...");
          if (!scriptLoaded) {
            tryLoadScript(urlIndex + 1);
          }
        }
      };

      script.onerror = (error) => {
        console.warn(`Failed to load from ${cdnUrls[urlIndex]}:`, error);
        if (!scriptLoaded) {
          tryLoadScript(urlIndex + 1);
        }
      };

      document.head.appendChild(script);

      // Timeout after 10 seconds per URL
      setTimeout(() => {
        if (!scriptLoaded && !scriptLoadedRef.current) {
          if (!window.cloudinary || typeof window.cloudinary.openUploadWidget !== 'function') {
            console.warn(`Timeout loading from ${cdnUrls[urlIndex]}, trying next URL...`);
            tryLoadScript(urlIndex + 1);
          }
        }
      }, 10000);
    };

    tryLoadScript(0);
  }, []);

  const handleUploadClick = () => {
    // Validate configuration
    if (!cloudName || !uploadPreset) {
      setUploadError("Cloudinary configuration incomplete. Please check your .env file.");
      console.error("Missing Cloudinary credentials:", { cloudName, uploadPreset });
      return;
    }

    // Check if Cloudinary is loaded
    if (!window.cloudinary) {
      setUploadError("Upload widget is loading. Please wait a moment and try again.");
      console.error("window.cloudinary not available yet");
      return;
    }

    // Check if openUploadWidget is available
    if (typeof window.cloudinary.openUploadWidget !== 'function') {
      setUploadError("Upload widget not properly loaded. Please refresh the page.");
      console.error("window.cloudinary.openUploadWidget is not a function");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    if (onUploadStart) {
      onUploadStart();
    }

    try {
      window.cloudinary.openUploadWidget(
        {
          cloudName: cloudName,
          uploadPreset: uploadPreset,
          folder: "loudwavelive/posters",
          resourceType: "image",
          multiple: false,
          maxFileSize: 10000000, // 10MB
          maxFiles: 1,
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "gif"],
          showAdvancedOptions: false,
          cropping: true,
          croppingAspectRatio: 1.5,
          defaultSource: "local",
          showPoweredBy: false,
          theme: "light",
          styles: {
            palette: {
              window: "#ffffff",
              windowBorder: "#90a0b0",
              tabIcon: "#0078d4",
              menuIcons: "#5a6c7d",
              textDark: "#000000",
              textLight: "#ffffff",
              link: "#0078d4",
              action: "#ff620d",
              inactiveButtonBorder: "#3b4049",
              error: "#ff0000",
              inProgress: "#0078d4",
              complete: "#20b44b",
              sourceBg: "#e7e7e7"
            }
          }
        },
        (error, result) => {
          if (error) {
            console.error("Upload error:", error);
            setUploadError(error?.message || "Upload failed. Please try again.");
            setIsUploading(false);
            if (onUploadEnd) {
              onUploadEnd(null);
            }
            return;
          }

          if (result?.event === "success") {
            console.log("Upload successful:", result.info);
            const secureUrl = result.info.secure_url;
            setImageUrl(secureUrl);
            setPreviewUrl(secureUrl);
            setUploadError("");
            setIsUploading(false);
            if (onUploadEnd) {
              onUploadEnd(secureUrl);
            }
          } else if (result?.event === "close") {
            setIsUploading(false);
          } else if (result?.event === "abort") {
            setIsUploading(false);
          }
        }
      ).open();
    } catch (err) {
      console.error("Error opening upload widget:", err);
      setUploadError("Failed to open upload widget. Please refresh the page.");
      setIsUploading(false);
      if (onUploadEnd) {
        onUploadEnd(null);
      }
    }
  };

  const handleClearImage = () => {
    setImageUrl("");
    setPreviewUrl("");
    setUploadError("");
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
              onClick={handleUploadClick}
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
              onClick={handleUploadClick}
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
