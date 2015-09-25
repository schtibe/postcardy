import { Router } from 'express'
import multer     from 'multer'
import fs         from 'fs'

const UPLOAD_LOCATION = 'uploads/';

var storage  = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, UPLOAD_LOCATION);
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

router.get('/images', (req, res, next) => {
  var files = fs.readdirSync(UPLOAD_LOCATION).sort().reverse()
  files = files.map(function(currentVal) {
    return UPLOAD_LOCATION + currentVal;
  }).slice(0, 5);
  res.json({ files });
})
