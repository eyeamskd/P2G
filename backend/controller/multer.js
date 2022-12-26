const multer = require("multer");

const Storage = multer.diskStorage({
    destination: "../frontend/src/assets/uploads",
    filename: (req, file, cb) => {
        let ext = file.originalname.substring(
            file.originalname.lastIndexOf(".")
        );
        cb(null, "img" + "-" + Date.now() + ext);
    },
});

const upload = multer({
    storage: Storage,
});

module.exports = upload;
