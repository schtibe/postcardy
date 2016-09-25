let jsonfile = require('jsonfile')
let configFile = `${__dirname}/../../../config/postconfig.json`


function getCredentials() {
  let config = require(configFile)

  return config
}

export default getCredentials
