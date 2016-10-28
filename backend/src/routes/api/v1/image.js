let express   = require('express')
let multer    = require('multer')
let fs        = require('fs')
let path      = require('path')

let image = require('../../../lib/image')

let easyimage = require('easyimage')

let router = new express.Router

router.post('/images', image.uploadImage(), (req, res, next) => {
  let file = req.file

  image.createThumb(path.basename(file.path), () => {
    let imgPath = path.join('/images', path.basename(file.path))
    res.json({ image: imgPath })
  })
})

router.get('/images', (req, res, next) => {
  let from = req.query.from
  let to   = req.query.to

  let files = image.getImages({ from, to })

  files = files.map(function(currentVal) {
    return path.join('/images', currentVal)
  })

  res.json({ files, max: image.countImages() })
})

router.delete('/images', (req, res, next) => {
  let img = path.basename(req.body.image)

  image.deleteImage(img)

  res.json({ result: 'success' })
})

export default router
