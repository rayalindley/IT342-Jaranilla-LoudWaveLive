/**
 * Cloudinary Utilities for Poster Uploads
 */

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

/**
 * Opens Cloudinary Upload Widget for poster image selection
 * @param {Function} onSuccess - Callback when upload completes
 * @param {Function} onError - Callback when upload fails
 */
export const openCloudinaryUploadWidget = (onSuccess, onError) => {
  if (!cloudName) {
    onError(new Error("Cloudinary configuration missing. Please check your .env file."));
    return;
  }

  if (!window.cloudinary) {
    onError(new Error("Cloudinary widget is not loaded. Please refresh the page."));
    return;
  }

  if (typeof window.cloudinary.openUploadWidget !== 'function') {
    onError(new Error("Cloudinary upload function is not available. Please refresh the page."));
    return;
  }

  try {
    window.cloudinary
      .openUploadWidget(
        {
          cloudName: cloudName,
          uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
          folder: "loudwavelive/posters",
          resourceType: "image",
          multiple: false,
          maxFileSize: 10000000, // 10MB
          maxFiles: 1,
          clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "gif"],
          showAdvancedOptions: false,
          cropping: true,
          croppingAspectRatio: 1.5, // Poster aspect ratio
          defaultSource: "local",
          showPoweredBy: false,
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
            },
            fonts: {
              default: null,
              "'Droid Sans', sans-serif": {
                url: "https://fonts.googleapis.com/css?family=Droid+Sans",
                active: true
              }
            }
          }
        },
        (error, result) => {
          if (error) {
            console.error("Upload error:", error);
            onError(error);
          }

          if (result?.event === "success") {
            console.log("Upload successful:", result.info);
            onSuccess(result.info);
          }
        }
      )
      .open();
  } catch (err) {
    console.error("Error opening upload widget:", err);
    onError(err);
  }
};

/**
 * Validate Cloudinary URL
 * @param {string} url - The URL to validate
 * @returns {boolean} True if valid Cloudinary URL
 */
export const isValidCloudinaryUrl = (url) => {
  if (!url) return false;
  try {
    return (
      url.includes("res.cloudinary.com") ||
      url.includes("cloudinary.com")
    );
  } catch {
    return false;
  }
};

/**
 * Get Cloudinary image with optimizations
 * @param {string} publicId - Cloudinary public ID
 * @param {Object} options - Image transformation options
 * @returns {string} Optimized Cloudinary URL
 */
export const getOptimizedImageUrl = (publicId, options = {}) => {
  const {
    width = 800,
    height = 1200,
    quality = "auto",
    format = "auto",
    crop = "fill"
  } = options;

  return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},h_${height},q_${quality},f_${format},c_${crop}/${publicId}`;
};
