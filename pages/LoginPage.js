import puppeteer from 'puppeteer';
import assert from 'assert'
import Utility from '../utils/Utility.js';

 class LoginPage{

  static utils = new Utility();
  LoginPage()
  {
    console.log('inside class');
  }
    async loginPage(page)
  {
    if(page)
    {
        const inputSelector = 'input[id="login-email"]';
        await page.type(inputSelector,"qacult.demo@gmail.com");
        await page.click('#login-submit');
        await utils.sleep(2000);
        await page.type('#password-login',"testing123");
    }
  }
  async navigateToBox(page){
    await page.goto('https://app.box.com', {timeout: 0, waitUntil: 'networkidle0'});
  }
  async loginWithWrongCredentials(page){
    const inputSelector = 'input[id="login-email"]';
    await page.type(inputSelector,"abcdef@gmail.com");
  
    await page.click('#login-submit');
    await utils.sleep(2000);
    await page.type('#password-login',"qwertyuiop");
  }

    async clickLoginSubmit(page){
      await page.click('#login-submit-password');

    }
 }
export default LoginPage;