import { expect } from 'chai'
import { it, describe } from 'mocha'
import { setupModelTest } from 'ember-mocha'

describe('Unit | Model | image', function() {
  setupModelTest('image', {
    needs: [ 'model:postcard' ]
  })

  it('exists', function() {
    let model = this.subject()
    // let store = this.store()
    expect(model).to.be.ok
  })
})
