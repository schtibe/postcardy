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

  var from = req.query.from;
  var to   = req.query.to;

  var files     = fs.readdirSync(UPLOAD_LOCATION).sort().reverse();
  var fileCount = files.length;


  console.log(from, to);
  console.log(files);
  files = files.slice(from, to);
  console.log(files);
  files = files.map(function(currentVal) {
    return UPLOAD_LOCATION + currentVal;
  });

  res.json({ files, max: fileCount });
})

router.delete('/images', (req, res, next) => {
  var image = req.body.image

  fs.unlink(image);

  res.json({ result: 'success' })
})
