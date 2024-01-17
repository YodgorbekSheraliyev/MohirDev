const multer = require('multer');
const path = require('path')

// Creating and setting storage
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

// Initialize upload func
const upload = multer({
    storage: storage,
    limits: {fileSize: 10000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    }
})

// Check file for image format
function checkFileType(file, cb){
    const filetypes = /jpeg|png|jpg|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(path.extname(file.mimetype))

    if(extname && mimetype){
        return cb(null, true)
    }else {
        return cb('Error: You can upload only image files')
    }
}

module.exports = upload