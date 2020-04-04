const multer = require("multer");
const uuidv4 = require("uuid/v4");
const path = require("path");

const upload = multer({
  fileFilter: function(req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(/*res.end('Only images are allowed')*/ null, false);
    }
    callback(null, true);
  },
  limits: {
    fileSize: 100 * 1024 * 1024
  }
});

module.exports = upload;
