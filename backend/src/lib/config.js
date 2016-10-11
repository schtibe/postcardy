let jsonfile = require('jsonfile')
let configFile = `${__dirname}/../../../config/postconfig.json`


function credentials() {
  let config = require(configFile)

  return {
    username: config.username,
    password: config.password
  }
}

/**
 * Return the default recipient address
 */
function address() {
  let config = require(configFile)

  return {
    salutation : config.salutation,
    givenName  : config.givenName,
    familyName : config.familyName,
    company    : config.company,
    street     : config.street,
    postCode   : config.postCode,
    place      : config.place
  }
}

export default {
  credentials,
  address
}
