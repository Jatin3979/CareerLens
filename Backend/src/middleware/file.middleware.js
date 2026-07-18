const multer=require('multer');

const upload = multer({
    storage: multer.memoryStorage(),
    Limits: {
        fileSize: 3 * 1024 * 1024, // 3MB limit
    },
})

module.exports = upload;