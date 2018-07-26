module.exports = {
  'Landing Page': (browser) => {
    browser
      .url('http://localhost:8080')
      .waitForElementVisible('body', 5000)
      .waitForElementVisible('.nav-wrapper', 5000)
      .assert.visible('h3')
      .assert.containsText('h3', 'WELCOME TO WECONNECT')
      .assert.visible('.card-title')
      .assert.containsText('.card-title', 'GETTING STARTED');
    browser.end();
  }
};
