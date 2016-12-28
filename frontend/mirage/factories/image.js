import { Factory, faker } from 'ember-cli-mirage'

export default Factory.extend({
  name(i) {
    return `Image ${i}`
  },
  URL() {
    return faker.image.imageURL()
  }
})
