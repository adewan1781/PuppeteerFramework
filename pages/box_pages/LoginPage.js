import puppeteer from 'puppeteer';
import assert from 'assert'
import PuppeteerControls from '../../controls/PuppeteerControls.js';


 class LoginPage extends PuppeteerControls{

 
  LoginPage()
  {
    console.log('inside class');
    
  }
 
  async navigateToBox(page){
    await this.navigate(page, 'https://app.box.com');
  }

    async clickLoginSubmit(page){
      await this.clickSelector(page, '#login-submit-password');
    }

    async loginPage(page,uname,pword)
    {
      if(page)
      {
          const inputSelector = 'input[id="login-email"]';
          await this.sendKeys(page,inputSelector,uname);
          await this.clickSelector(page, '#login-submit');
          await this.waitForSelector(page, '#password-login');
          await this.sendKeys(page, '#password-login', pword);
      }
    }

    async pageTitle(page, title){
       return await this.verifyPageTitle(page, title);
    }

 }
export default LoginPage;