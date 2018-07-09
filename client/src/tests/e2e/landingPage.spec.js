module.exports = {
  'Landing Page': (browser) => {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('.inner-welcome', 5000)
      .waitForElementVisible('.nav-wrapper', 5000)
      .assert.visible('#welcome-message')
      .assert.visible('h3')
      .assert.containsText('h3', 'Welcome to WEconnect')
      .assert.visible('p')
      .assert.containsText('p', 'SIGN UP')
      .assert.containsText('p', 'SIGN IN');
    browser.end();
  }
};
