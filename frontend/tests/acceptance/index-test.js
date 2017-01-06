import Ember from 'ember'
import { describe, it, beforeEach, afterEach } from 'mocha'

import startApp   from '../helpers/start-app'
import destroyApp from '../helpers/destroy-app'
import Plan       from '../helpers/test-plan'

const { $ } = Ember

let expect = Plan.expect


describe('Acceptance | index | default address', function() {
  let application

  beforeEach(function() {
    application = startApp()
  })

  afterEach(function() {
    destroyApp(application)
  })

  it('renders  correctly', async function() {
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

describe('Acceptance | index | chose image', function() {
  let application

  beforeEach(function() {
    server.shutdown()
    application = startApp()
  })

  afterEach(function() {
    destroyApp(application)
  })

  it('sets a chosen image correctly', async function() {
    let address = await server.create('address')
    let images = await server.createList('image', 3)

    await visit('/')

    $('.buttonbar:first a:first').click()
    expect($('#chosenImage').attr('src')).to.equal(images[0].url)
  })
})

describe('Acceptance | index | delete image', function() {
  let application

  beforeEach(function() {
    server.shutdown()
    Plan.reset()
    application = startApp()
  })

  afterEach(function() {
    destroyApp(application)
    Plan.check()
  })

  it.skip('removes it from the chosenImage', async function() {
    let address = await server.create('address')
    let images = await server.createList('image', 3)

    await visit('/')

    // let's use one first
    $('.buttonbar:first a:first').click()
    expect($('#chosenImage').attr('src')).to.equal(images[0].url)

    // now delete it
    $('.buttonbar:first a:last').click()
    expect($('#chosenImage').attr('src')).to.equal('')

    expect($('.img-lister img').attr('src')).to.not.equal(images[0].url)
  })

  it('correctly sends the request', async function() {
    Plan.plan(1)
    let address = await server.create('address')
    let images  = await server.createList('image', 3)

    server.del('/images/:id', (schema, request) => {
      let id = request.params.id

      // TODO: there should be a way to assert
      // that this is happening
      expect(id).to.equal(images[0].id)
    })

    await visit('/')

    $('.buttonbar:first a:last').click()
  })
})

describe('Acceptance | index | send postcard', function() {
  let application

  beforeEach(function() {
    server.shutdown()
    Plan.reset()
    application = startApp()
  })

  afterEach(function() {
    destroyApp(application)
    Plan.check()
  })

  it('Shows an error when no image is set', async function() {
    let address = await server.create('address')
    let images  = await server.createList('image', 3)

    await visit('/')

    $('.btn-primary').click()
    expect($('.alert')).to.be.visible
    expect($('.alert').hasClass('alert_error')).to.be.true
    expect($('.alert').text().trim()).to.equal('No image defined!')
  })

  it('Correctly sends a basic postcard', async function() {
    Plan.plan(2)
    let address = await server.create('address')
    let images  = await server.createList('image', 3)

    server.post('/postcards', (schema, request) => {
      let data  = JSON.parse(request.requestBody).data
      let attrs = data.attributes
      let rels  = data.relationships

      expect(attrs.message.trim()).to.equal('test-message')
      expect(rels.image.data.id).to.equal(images[0].id)
    })

    await visit('/')

    $('.buttonbar:first .img-use').click()
    $('textarea').text('test-message')
    $('.btn-primary').click()
  })

  it.skip('Correctly stores the postcard')

  it.skip('Shows error messages')
})

