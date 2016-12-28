import Ember from 'ember'
import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import startApp from '../helpers/start-app'
import destroyApp from '../helpers/destroy-app'

const { $ } = Ember

describe('Acceptance | home', function() {
  let application

  beforeEach(function() {
    application = startApp()
  })

  afterEach(function() {
    destroyApp(application)
  })

  it('renders the default address correctly', async function() {
    let address = server.create('address')

    await visit('/')
      /*

    expect($('.recipient input:first').val()).to.equal(address.get('company'))
    */
  })
})
