/**
 * Diagnostic utilities to troubleshoot Cloudinary widget loading
 */

export const runCloudinaryDiagnostics = () => {
  console.log("=== Cloudinary Diagnostics ===");
  
  // Check environment variables
  console.log("Environment Variables:");
  console.log("- VITE_CLOUDINARY_CLOUD_NAME:", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
  console.log("- VITE_CLOUDINARY_UPLOAD_PRESET:", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
  
  // Check if window.cloudinary exists
  console.log("\nWindow.cloudinary Status:");
  console.log("- window.cloudinary exists:", !!window.cloudinary);
  if (window.cloudinary) {
    console.log("- window.cloudinary.openUploadWidget exists:", typeof window.cloudinary.openUploadWidget === 'function');
  }
  
  // Check script loading
  console.log("\nScript Status:");
  const uploadWidgetScript = document.querySelector(
    'script[src*="upload-widget.cloudinary.com"]'
  );
  console.log("- Upload widget script loaded:", !!uploadWidgetScript);
  if (uploadWidgetScript) {
    console.log("- Script async:", uploadWidgetScript.async);
    console.log("- Script crossOrigin:", uploadWidgetScript.crossOrigin);
  }
  
  // Check network
  console.log("\nNetwork Status:");
  console.log("- Online:", navigator.onLine);
  
  // Check for CSP violations
  console.log("\nSecurity Policy:");
  const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  console.log("- CSP meta tag present:", !!cspMeta);
  if (cspMeta) {
    console.log("- CSP content:", cspMeta.getAttribute("content"));
  }
  
  return {
    cloudinaryReady: !!window.cloudinary,
    scriptLoaded: !!uploadWidgetScript,
    online: navigator.onLine,
    hasCloudName: !!import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
    hasUploadPreset: !!import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  };
};

/**
 * Manual test of Cloudinary widget
 */
export const testCloudinaryWidget = () => {
  if (!window.cloudinary) {
    console.error("Cloudinary widget not loaded. Run runCloudinaryDiagnostics() to troubleshoot.");
    return false;
  }

  try {
    window.cloudinary.openUploadWidget(
      {
        cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
        uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
        folder: "loudwavelive/test"
      },
      (error, result) => {
        if (error) {
          console.error("Test upload error:", error);
        }
        if (result?.event === "success") {
          console.log("Test upload successful:", result.info);
        }
      }
    ).open();
    return true;
  } catch (err) {
    console.error("Error opening test widget:", err);
    return false;
  }
};
