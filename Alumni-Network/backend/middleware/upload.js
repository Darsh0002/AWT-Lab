const multer = require("multer");

// We use memoryStorage so the uploaded file
// stays in RAM instead of being saved on disk.
const storage = multer.memoryStorage();

// This middleware will be used in routes to handle file uploads
module.exports = multer({ storage });