import puppeteer from 'puppeteer';
import assert from 'assert'
// import Utility from '../utils/Utility.js';

 class LoginPage{

  // static wait = new Utility();
  LoginPage()
  {
    console.log('inside class');
    // this.utils = new Utility();
  }
 
  async navigateToBox(page){
    await page.goto('https://app.box.com', {timeout: 0, waitUntil: 'networkidle0'});
  }

    async clickLoginSubmit(page){
      await page.click('#login-submit-password');

    }

    async loginPage(page,uname,pword)
    {
      if(page)
      {
          const inputSelector = 'input[id="login-email"]';
          await page.type(inputSelector,uname);
          await page.click('#login-submit');
          // await wait.sleep(2000);
          await page.waitForSelector('#password-login');
          await page.type('#password-login',pword);
      }
    }
 }
export default LoginPage;