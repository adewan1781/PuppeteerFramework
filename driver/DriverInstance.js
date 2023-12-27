import puppeteer from 'puppeteer';  
import CucumberHooks from '../features/step_definations/CucumberHooks.js';

class DriverInstance{
    DriverInstance(){
        this.browser = null;
    
    }
    async launchBrowser() {
        this.browser = await puppeteer.launch({headless: false,
            defaultViewport: null,
            args: ['--start-maximized'] 
    
        });
      }
     
      async closeBrowser() {
        if (this.browser) {
          await this.browser.close();
        }
      }
     
      async createPage() {
        if (this.browser) {
          const page = await this.browser.newPage();
          
          await page.setViewport({
            width: 1280,
            height: 500 ,
            deviceScaleFactor: 1,
          });
          return page;
        }
        throw new Error('Browser not launched');
      }

      async closePage(page) {
        const page2 = CucumberHooks.pageMap.get("pageVal");
        if (page2) {
          await page.close();
        }
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