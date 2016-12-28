import { Factory, faker } from 'ember-cli-mirage'

faker.locale = 'de_CH'

export default Factory.extend({
  salutation() {
    return faker.name.prefix()
  },
  company() {
    return faker.company.companyName()
  },
  givenName() {
    return faker.name.firstName()
  },
  familyName() {
    return faker.name.lastName()
  },
  street() {
    return faker.address.streetAddress()
  },
  postCode() {
    return faker.address.zipCode()
  },
  place() {
    return faker.address.city()
  }
})
