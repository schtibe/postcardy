let fs = require('fs')
let jsonfile = require('jsonfile')
let dataFilePath = `${__dirname}/../../../config/data.json`


function readFile() {
  return jsonfile.readFileSync(dataFilePath)
}

function writeFile(data) {
  jsonfile.writeFile(dataFilePath, data)
}

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

function saveOrder(date, image) {
  let data = { date, image }

  jsonfile.writeFile(dataFilePath, data)
}

export default {
  getLastOrder,
  saveOrder
}
