import { expect } from 'chai'
import { it, describe } from 'mocha'
import { setupModelTest } from 'ember-mocha'

describe('Unit | Model | postcard', function() {
  setupModelTest('postcard', {
    needs: [ 'model:image', 'model:address' ]
  })

  it('exists', function() {
    let model = this.subject()
    // let store = this.store()
    expect(model).to.be.ok
  })
})
