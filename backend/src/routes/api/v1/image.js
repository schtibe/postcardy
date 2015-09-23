import { Router } from 'express'
import multer     from 'multer'

var storage  = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
})

let upload = multer({ storage })

let router = new Router
export default router


router.post('/images', upload.single('image'), (req, res, next) => {
  res.json({image: req.file.path})
})

