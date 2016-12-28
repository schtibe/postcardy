import { expect } from 'chai'
import { it, describe } from 'mocha'
import { setupModelTest } from 'ember-mocha'

describe('Unit | Model | address', function() {
  setupModelTest('address', {
  })

  it('exists', function() {
    let model = this.subject()
    // let store = this.store()
    expect(model).to.be.ok
  })
})
