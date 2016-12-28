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
    let address = await server.create('address')

    await visit('/')

    expect($('.recipient_company').val()).to.equal(address.company)
    expect($('.recipient_firstName').val()).to.equal(address.firstName)
    expect($('.recipient_lastName').val()).to.equal(address.lastName)
    expect($('.recipient_saluation').val()).to.equal(address.saluation)
    expect($('.recipient_street').val()).to.equal(address.street)
    expect($('.recipient_postCode').val()).to.equal(address.postCode)
    expect($('.recipient_place').val()).to.equal(address.place)
  })
})
