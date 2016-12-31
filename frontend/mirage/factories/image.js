import { Factory, faker } from 'ember-cli-mirage'

export default Factory.extend({
  name(i) {
    return `Image ${i}`
  },
  url() {
    return faker.image.imageUrl()
  }
})
