import Ember from 'ember'
import { expect } from 'chai'
import { it, describe } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describe('Integration | Component | message field', function () {
  setupComponentTest('message-field', {
    integration: true
  })

  it('renders', function() {

    // Set any properties with this.set('myProperty', 'value')
    // Handle any actions with this.on('myAction', function(val) { ... })

    this.render(hbs`{{message-field}}`)

    expect(this.$('textarea').text().trim()).to.equal('')

    expect(this.$('.alert_warning')).to.have.length(0)
  })

  it('shows the message after 12 lines', function() {
    this.render(hbs`{{message-field}}`)

    let messageTmpl = 'Lorem ipsum dolor sit amet aenean suscipit.'
    let message = ''

    for (let i = 0; i <= 15; i++) {
      message += `${messageTmpl}\r\n`
    }
    this.$('textarea').val(message)
    this.$('textarea').change()

    expect(this.$('.alert_warning')).to.be.visible
  })
})

