let Postcardcreator = require('postcardcreator')
let SSOPostHelper = require('postcardcreator/lib/helper/SSOPostHelper')

let SSOHelper = new SSOPostHelper()

/**
 * @param {Object} - Response object
 */
function _formatResponse(resp) {
  return `Status: ${resp.status}, Message: ${resp.message}`
}

/**
 * @param {string} token - The auth token
 * @param {readStream} - assetStream The image basically
 * @param {string} message -The message
 * @param {Object} callbacks - Callbacks for results
 * @param {function} callbacks.error - Callback for errors
 * @param {function} callbacks.success - Callback for success
 */
function _sendPostcard(token, recipient, assetStream, message, callbacks) { // eslint-disable-line max-params
  let client   = new Postcardcreator(token)
  let postcard = new Postcardcreator.Postcard(assetStream, message, recipient)

  client.sendPostcard(postcard, function(err, result) {
    if (err && 'error' in callbacks) {
      let formattedResponse = _formatResponse(err)
      callbacks.error(`Error sending postcard: ${formattedResponse}`)
    }

    if ('success' in callbacks) {
      callbacks.result(_formatResponse(result))
    }
  })
}

/**
 * @param {string} user - Username
 * @param {string} pw - Password
 * @param {function} callback - Call when the auth was successful
 */
function authorize(user, pw, success, error) {
  SSOHelper.getPostcardcreatorToken(
    user, pw, (err, token) => {
      if (err) {
        if (typeof error !== undefined) {
          error(`Unable to get token: ${err}`)
        }
      }
      success(token)
    }
  )
}

/**
 * @param {string} user -Username
 * @param {string} pw - Password
 * @param {Object} recipient - Recipient containing the addressing
 * @param {readStream} - assetStream The image basically
 * @param {string} message -The message
 * @param {Object} callbacks - Callbacks for results
 * @param {function} callbacks.error - Callback for errors
 * @param {function} callbacks.success - Callback for success
 */
function sendPostcard(user, pw, recipient, assetStream, message, callbacks) { // eslint-disable-line max-params
  authorize(user, pw, (token) => {
    _sendPostcard(token, recipient, assetStream, message, callbacks)
  })
}

export default sendPostcard
