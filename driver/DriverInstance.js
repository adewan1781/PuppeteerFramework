import puppeteer from 'puppeteer';  

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
}

export default DriverInstance;