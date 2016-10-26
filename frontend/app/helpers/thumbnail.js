import Ember from 'ember'

export function thumbnail([ value, ...rest ]) {
  let parts = value.split('.')
  let fileName = parts.slice(0, parts.length - 1).join('.')
  let ext = parts.slice(parts.length - 1)

  return `${fileName}_thumb.${ext}`

}

export default Ember.Helper.helper(thumbnail)
