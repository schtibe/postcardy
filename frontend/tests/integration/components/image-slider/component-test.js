import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describe('Integration | Component | image slider', function() {
  setupComponentTest('image-lister', {
    integration: true
  })

  it('renders', function() {
    this.render(hbs`{{image-lister}}`)
    expect(this.$()).to.have.length(1)
  })

  it('shows three images', async function() {
    let images = await server.createList('image', 3)

    this.set('images', images)
    this.set('max', 3)

    this.render(hbs`{{image-lister images=images max=images}}`)
    expect(this.$('img')).to.have.length(3)
  })

  it('can set an image', async function() {
    let images = await server.createList('image', 3)

    this.set('images', images)
    this.set('max', 3)

    this.set('update', function(id) {
      expect(id).to.equal(images[0].id)
    })

    this.render(hbs`{{image-lister images=images max=images update=(action update)}}`)

    this.$('a:first').click()
  })
})
