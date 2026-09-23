import multer from "multer";

/**
 * File Upload Middleware
 *
 * Handles multipart/form-data requests that contain file uploads.
 *
 * This middleware is normally implemented using Multer and is
 * responsible for receiving files before the request reaches
 * the controller.
 *
 * Depending on the configuration, uploaded files can be stored
 * temporarily, in memory, or prepared for upload to external
 * storage such as Amazon S3.
 */
export const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 }
});