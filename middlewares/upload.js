const multer = require('multer');
const path = require('path')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "Profile_Picture") {
            cb(null, "uploads/picture/");
        } else if (file.fieldname === "Documents") {
            cb(null, "uploads/document/");
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});



const fileFilter = (req, file, cb) => {
    if (file.fieldname === "Profile_Picture") {
        const allowed = /jpeg|jpg|png/;
        const ext = allowed.test(path.extname(file.originalname.toLowerCase()));
        const mime = allowed.test(file.mimetype)
        if (ext && mime) {
            cb(null, true)
        }
        else {
            cb(new Error("Only images are allowed"), false);
        }
    }
    else if (file.fieldname === "Documents") {
        const allowed = /docx|pdf|html|doc/;
        const ext = allowed.test(path.extname(file.originalname.toLowerCase()));
        const mime = allowed.test(file.mimetype)
        if (ext && mime) {
            cb(null, true)
        }
        else {
            cb(new Error("Only Documents are allowed"), false);
        }
    }
    else {
        throw new Error("Only Files are allowed");
    }
}




const upload = multer({ storage, fileFilter });

module.exports = { upload };