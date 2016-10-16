let fs = require('fs')
let path = require('path')
let multer = require('multer')

const UPLOAD_LOCATION = '../uploads/'

// TODO handle the paths better

/**
 * Return the storage for multer
 */
function _getStorage() {
  let storage  = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOAD_LOCATION)
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })

  return storage
}

/**
 * Read the images from the directory
 */
function _listImages() {
  let files = fs.readdirSync(UPLOAD_LOCATION).sort().reverse()

  return files.filter((element) => {
    let ext = path.extname(element).toLowerCase()
    return [ '.png', '.jpg' ].indexOf(ext) >= 0
  })
}

/**
 * Counts the number of images available in the directory
 */
function countImages() {
  let files = _listImages()
  return files.length
}

/**
 * @param {Object} range - The range of images to get
 * @param {int} range.from - The start point of the range
 * @param {int} range.to - The end point of the range
 */
function getImages(range) {
  let images = _listImages()

  images = images.slice(range.from, range.to)

  return images
}

/**
 * Read the image to an assetStream
 *
 * @param {string} path - The path of the image
 * @returns {stream.Readable}
 */
function readImage(imgPath) {
  return fs.createReadStream(
    path.join(
      UPLOAD_LOCATION,
      imgPath
    )
  )
}

/**
 * Delete an image
 *
 * @param {string} name - The file name
 */
function deleteImage(name) {
  fs.unlinkSync(path.join(UPLOAD_LOCATION, name))
}

/**
 * Uploads an Image
 */
function uploadImage() {
  let storage = _getStorage()
  let upload = multer({ storage })
  return upload.single('image')
}

export default {
  countImages,
  uploadImage,
  getImages,
  deleteImage,
  readImage
}
