const userInfo = require('./mockData/userInfoMock');
const path = require('path');


module.exports = {
  'Users should be able to signup and logout': (browser) => {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('.signupbutton', 5000)
      .click('.signupbutton')
      .assert.urlEquals('http://localhost:8080/signUp')
      .setValue('input[name=firstname]', userInfo.firstname)
      .setValue('input[name=lastname]', userInfo.lastname)
      .setValue('input[name=username]', userInfo.username)
      .setValue('input[name=email]', userInfo.email)
      .setValue('input[name=password]', userInfo.password)
      .setValue('input[name=confirmPassword]', userInfo.confirmPassword)
      .setValue('input[name=telephoneNumber]', userInfo.telephone)
      .click('button.btn-large')
      .waitForElementVisible('.avatar', 4000)
      .assert.urlEquals('http://localhost:8080/userProfile')
      .click('.dropdown-button')
      .waitForElementVisible('#logout1', 5000)
      .click('#logout1')
      .assert.urlEquals('http://localhost:8080/')
      .pause(2000);
  },
  'Users should not be able to submit form if fields are empty':
  (browser) => {
    browser
      .url('http://localhost:8080/signUp')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=firstname]', '')
      .setValue('input[name=username]', '')
      .setValue('input[name=email]', '')
      .setValue('input[name=password]', '')
      .setValue('input[name=confirmPassword]', 'andela')
      .click('button.btn-large')
      .assert.urlEquals('http://localhost:8080/signUp')
      .pause(2000);
  },
  'Users should not be able to sign up with an existing email':
  (browser) => {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('.signupbutton', 5000)
      .click('.signupbutton')
      .assert.urlEquals('http://localhost:8080/signUp')
      .setValue('input[name=firstname]', userInfo.firstname)
      .setValue('input[name=lastname]', userInfo.lastname)
      .setValue('input[name=username]', userInfo.username)
      .setValue('input[name=email]', userInfo.email)
      .setValue('input[name=password]', userInfo.password)
      .setValue('input[name=confirmPassword]', userInfo.confirmPassword)
      .setValue('input[name=telephoneNumber]', userInfo.telephone)
      .click('button.btn-large')
      .waitForElementVisible('h4', 2000)
      .assert.containsText('h4', 'Something Went Wrong')
      .assert.urlEquals('http://localhost:8080/signUp');
  },
  'Users should not be able to sign up with an existing username':
  (browser) => {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('.signupbutton', 5000)
      .click('.signupbutton')
      .assert.urlEquals('http://localhost:8080/signUp')
      .setValue('input[name=firstname]', userInfo.firstname)
      .setValue('input[name=lastname]', userInfo.lastname)
      .setValue('input[name=username]', userInfo.username)
      .setValue('input[name=email]', 'andela@gmail.com')
      .setValue('input[name=password]', userInfo.password)
      .setValue('input[name=confirmPassword]', userInfo.confirmPassword)
      .setValue('input[name=telephoneNumber]', userInfo.telephone)
      .click('button.btn-large')
      .waitForElementVisible('h4', 2000)
      .assert.containsText('h4', 'Something Went Wrong')
      .assert.urlEquals('http://localhost:8080/signUp');
  },
  'Users should not be able to login with invalid details':
  (browser) => {
    browser
      .url('http://localhost:8080/login')
      .waitForElementVisible('body', 5000)
      .setValue('input[name=email]', 'weconnect@admin.com')
      .setValue('input[name=password]', 'Admin')
      .click('button.btn-large')
      .waitForElementVisible('span.red-text', 10000)
      .assert.containsText('span.red-text', 'Authentication failed')
      .pause(2000);
  },
  'Users should be able to login with valid details':
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
//   'Users should not be able to login with an invalid details':
//   (browser) => {
//     browser
//       .url('http://localhost:8080/login')
//       .waitForElementVisible('body', 5000)
//       .setValue('input[name=email]', 'weconnect@admin.com')
//       .setValue('input[name=password]', 'Admin')
//       .click('button.btn-large')
//       .waitForElementVisible('span.red-text', 5000)
//       .assert.containsText('span.red-text', 'Authentication failed')
//       .end();
//   },
};
