var multer = require("multer");
var path = require("path");
var storage = {
    storage: multer.diskStorage({}),
    fileFilter: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
            cb(new Error("File type is not supported"), false);
            return;
        }
        cb(null, true);
    }
};
module.exports = multer(storage);
