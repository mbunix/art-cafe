import path from 'path'
import express from 'express'
import multer from 'multer' 
const router = express.Router()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${path.extname(file.originalname)}`
        )
    }   ,
})

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
        },
    fileFilter: function (req, file, cb) { 
    checkFileType(file, cb);
    },
})
router.post('/', upload.single('image'), (req, res) => {
    res.send( `${req.file.path}`)
})