const puppeteer = require ("puppeteer");

(async () => {
    await page.goto('https://app.box.com');
        await page.setViewport({
          width: 1280,
          height: 500 ,
          deviceScaleFactor: 1,
        });
        const inputSelector = 'input[id="login-email"]';
        await page.type(inputSelector,"qacult.demo@gmail.com");
        await page.click('#login-submit');
        await this.sleep(2000);
        await page.type('#password-login',"testing123");
        await page.click('#login-submit-password');
 


    

})();