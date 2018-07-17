const path = require('path');
const businessInfo = require('./mockData/businessInfoMock');

const selectLocation = '[name=location]';
const selectCategory = '[name=category]';

module.exports = {
  'Users should be able to login':
  (browser) => {
    browser
      .url('http://localhost:8080/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'weconnect@admin.com')
      .setValue('input[name=password]', 'weconnect@admin')
      .click('button.btn-large')
      .waitForElementVisible('.avatar', 4000)
      .assert.urlEquals('http://localhost:8080/userProfile')
      .pause(2000);
  },
  'Users should be able to register a business':
  (browser) => {
    browser
      .url('http://localhost:8080/registerBusiness')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=name]', businessInfo.business1.name)
      .setValue('input[name=email]', businessInfo.business1.email)
      .setValue('input[name=address]', businessInfo.business1.address)
      .setValue('textarea[name=description]', businessInfo.business1.description)
      .setValue('input[name=telephoneNumber]', businessInfo.business1.telephoneNumber)
      .setValue('input[name=businessImage]', path.resolve('client/public/images/blue-image.jpg'))
      .click('.location')
      .pause(5000)
      .click('.category')
      .pause(5000)
      .click('button.btn-large')
      .waitForElementVisible('.avatar', 10000)
      .assert.urlEquals('http://localhost:8080/userProfile')
      .pause(10000);
  },
  'Users should be not be able to register a business with same email':
  (browser) => {
    browser
      .url('http://localhost:8080/registerBusiness')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=name]', 'Andela Kenya')
      .setValue('input[name=email]', businessInfo.business1.email)
      .setValue('input[name=address]', businessInfo.business1.address)
      .setValue('textarea[name=description]', businessInfo.business1.description)
      .setValue('input[name=telephoneNumber]', businessInfo.business1.telephoneNumber)
      .setValue('input[name=businessImage]', path.resolve('client/public/images/blue-image.jpg'))
      .click('.location')
      .pause(5000)
      .click('.category')
      .pause(5000)
      .click('button.btn-large')
      .waitForElementVisible('li.collection-item', 10000)
      .assert.containsText('li.collection-item', 'Email already exists')
      .pause(2000);
  },
  'Users should be not be able to register a business without required fields':
  (browser) => {
    browser
      .url('http://localhost:8080/registerBusiness')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=name]', '')
      .setValue('input[name=email]', businessInfo.business1.email)
      .setValue('input[name=address]', businessInfo.business1.address)
      .setValue('textarea[name=description]', businessInfo.business1.description)
      .setValue('input[name=telephoneNumber]', businessInfo.business1.telephoneNumber)
      .setValue('input[name=businessImage]', path.resolve('client/public/images/blue-image.jpg'))
      .click('.location')
      .pause(5000)
      .click('.category')
      .pause(5000)
      .click('button.btn-large')
      .assert.urlEquals('http://localhost:8080/registerBusiness')
      .pause(2000);
  },
  'Users should be able to register another business':
  (browser) => {
    browser
      .url('http://localhost:8080/registerBusiness')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=name]', businessInfo.business2.name)
      .setValue('input[name=email]', businessInfo.business2.email)
      .setValue('input[name=address]', businessInfo.business2.address)
      .setValue('textarea[name=description]', businessInfo.business2.description)
      .setValue('input[name=telephoneNumber]', businessInfo.business2.telephoneNumber)
      .setValue('input[name=businessImage]', path.resolve('client/public/images/business.jpeg'))
      .click('.location')
      .pause(5000)
      .click('.category')
      .pause(5000)
      .click('button.btn-large')
      .waitForElementVisible('.avatar', 150000)
      .assert.urlEquals('http://localhost:8080/userProfile')
      .pause(2000);
  },
  'Users should be able to update their business':
  (browser) => {
    browser
      .url('http://localhost:8080/userProfile')
      .waitForElementVisible('body', 5000)
      .click('a[href="#tab_31"]')
      .waitForElementVisible('.update', 5000)
      .click('.update')
      .pause(5000)
      .click('button.btn-large')
      .pause(5000)
      .waitForElementVisible('.card-action', 10000)
      .assert.containsText('.card-action', 'Business Profile')
      .pause(2000);
  },
  'Users should be able to delete their business':
  (browser) => {
    browser
      .url('http://localhost:8080/userProfile')
      .waitForElementVisible('body', 5000)
      .click('a[href="#tab_31"]')
      .waitForElementVisible('.delete', 5000)
      .click('.delete')
      .pause(5000)
      .click('.confirmDelete')
      .pause(5000)
      .assert.urlEquals('http://localhost:8080/userProfile')
      .pause(2000);
  },
  'Users should be able to view their business':
  (browser) => {
    browser
      .url('http://localhost:8080/userProfile')
      .waitForElementVisible('body', 5000)
      .click('a[href="#tab_31"]')
      .waitForElementVisible('.view', 5000)
      .click('.view')
      .pause(5000)
      .waitForElementVisible('.card-action', 10000)
      .assert.containsText('.card-action', 'Business Profile')
      .pause(2000);
  },
  'Users should be able to search for a business':
  (browser) => {
    browser
      .url('http://localhost:8080/businessListing')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=advancedSearch]', businessInfo.business1.name)
      .click('#searchSubmitBtn')
      .pause(5000)
      .waitForElementVisible('.truncate', 10000)
      .assert.containsText('.truncate', businessInfo.business1.name)
      .pause(2000);
  },
  'Users should be able to review a business':
  (browser) => {
    browser
      .url('http://localhost:8080/businessListing')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('.view', 5000)
      .click('.view')
      .pause(5000)
      .waitForElementVisible('.card-action', 10000)
      .assert.containsText('.card-action', 'Business Profile')
      .pause(5000)
      .setValue('textarea[name=review]', 'Nice Business Idea')
      .click('[data-index="3"]')
      .click('.btn-large')
      .waitForElementVisible('#review-business', 5000)
      .pause(5000)
      .end();
  },
};
