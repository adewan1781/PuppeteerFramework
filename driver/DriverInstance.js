import puppeteer from 'puppeteer';  

import PuppeteerControls from '../controls/PuppeteerControls.js';

class DriverInstance extends PuppeteerControls{
    DriverInstance(){
        this.browser = null;
    
    }
    async launchBrowser() {
        return await super.launchBrowser();
      }
     
      async closeBrowser() {
        await super.closeBrowser();
      }
     
      async createPage() {
        return await this.openPageTab();
      }

      async closePage(page) {
        await this.closePageTab(page);
      }

      async deleteAllCookies(){
        // const page1 = CucumberHooks.pageMap.get("pageVal");
        // const cookies = await page1.cookies();
        // // const cookieJson = JSON.stringify(cookies)
        // for(ck in cookies){
        //     await page1.deleteCookie(ck);
        // }
        // // await page1.deleteCookie(cookieJson);
      }
}

export default DriverInstance;