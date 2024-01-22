import PuppeteerControls from "../../controls/PuppeteerControls.js";
import Utility from "../../utils/Utility.js";


class UnicornLoginPage extends PuppeteerControls{

    UnicornLoginPage()
    {
      console.log('inside unicorn login page class');
      
    }

    async navigateToUnicorn(page){
        await this.navigate(page, 'https://trainee-web-app.azurewebsites.net/auth/login');
        await Utility.sleep(4000);
    }

    async verifyUnicornLoginPage(page){
      const heading = await this.evaluateWithText(page,'h5#login-title');
      return heading;
     
    }

    async enterLoginCredentials(page, uname, pword){
      await this.sendKeys(page,'input#inputUserName',uname);
      await this.sendKeys(page,'input#inputPassword',pword);
    }
    
    async clickSignInButton(page){
      await this.clickSelector(page, 'button.primary-btn');
    }

}

export default UnicornLoginPage;