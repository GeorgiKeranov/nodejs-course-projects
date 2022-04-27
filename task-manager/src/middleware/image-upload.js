const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})

const imageUpload = multer({
    limits: {
        fileSize: 5242880, // 5MB in bytes
    },
    fileFilter(req, file, cb) {
        const fileName = file.originalname;
        
        if (!fileName.match(/.(jpg|jpeg|png|webp)$/)) {
            return cb(new Error('Please provide image with allowed extension like ".jpg", ".jpeg", ".png" or ".webp".'));
        }
        
        cb(null, true);
    },
    storage
});

const imageUploadMiddleware = imageUpload.single('image');

module.exports = imageUploadMiddleware;