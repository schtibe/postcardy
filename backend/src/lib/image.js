let fs = require('fs')
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
  return fs.readdirSync(UPLOAD_LOCATION).sort().reverse()
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
  images = images.map(function(currentVal) {
    return UPLOAD_LOCATION + currentVal
  })

  return images
}

/**
 * Read the image to an assetStream
 *
 * @param {string} path - The path of the image
 */
function readImage(path) {
  return fs.createReadStream(path)
}

/**
 * Delete an image
 *
 * @param {string} name - The file name
 */
function deleteImage(name) {
  fs.unlinkSync(name)
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
