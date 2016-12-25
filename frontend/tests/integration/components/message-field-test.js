import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('message-field', 'Integration | Component | message field', {
  integration: true
})

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value')
  // Handle any actions with this.on('myAction', function(val) { ... })

  this.render(hbs`{{message-field}}`)

  assert.equal(this.$().text().trim(), '')

  // Template block usage:
  this.render(hbs`
    {{#message-field}}
      template block text
    {{/message-field}}
  `)

  assert.equal(this.$().text().trim(), 'template block text')
  assert.equal(this.$('.alert_warning').length, 0)
})

test('it shows the message after 12 lines', function(assert) {
  this.render(hbs`{{message-field}}`)

  let messageTmpl = 'Lorem ipsum dolor sit amet aenean suscipit.'
  let message = ''

  for (let i = 0; i <= 15; i++) {
    message += `${messageTmpl}\r\n`
  }
  this.$('textarea').val(message)
  this.$('textarea').change()

  assert.ok(this.$('.alert_warning').is(':visible'))
})
