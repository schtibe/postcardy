let fs = require('fs')
let jsonfile = require('jsonfile')
let dataFilePath = `${__dirname}/../../../config/data.json`


/**
 */
function readFile() {
  return jsonfile.readFileSync(dataFilePath)
}

/**
 */
function writeFile(data) {
  jsonfile.writeFile(dataFilePath, data)
}

/**
 * Return the data from the json file
 */
function getLastOrder() {
  try {
    return readFile()
  }
  catch (err) {
    if (err.code === 'ENOENT') {
      return { date: null, image: '' }
    }

    throw err
  }
}

/**
 * @param {moment} date - The date of the last order
 * @param {string} image - The name of the image
 */
function saveOrder(date, image) {
  let data = { date, image }

  return jsonfile.writeFileSync(dataFilePath, data)
}

export default {
  getLastOrder,
  saveOrder
}
