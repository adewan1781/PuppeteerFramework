import puppeteer from 'puppeteer';
import CucumberHooks from '../features/step_definations/CucumberHooks.js';

class PuppeteerControls{

    PuppeteerControls(){
        this.browser = null;
    }
    
    async launchBrowser(){
        try{
            this.browser = await puppeteer.launch({headless: false,
                defaultViewport: null,
                args: ['--start-maximized'] 
            });
        return this.browser;
        }
        catch(ex){
            throw ex;
        }    
    }

    async openPageTab(){
        try{
            const page = await this.browser.newPage();
            await page.setViewport({
              width: 1280,
              height: 500 ,
              deviceScaleFactor: 1,
            });
        return page;
        }
        catch(ex){

            throw new Error('Page tab not opened');
        }
    }

    async closeBrowser() {
        try{
            if (this.browser) {
                await this.browser.close();
              }
        }
        catch(ex){

            throw new Error('error while closing browser');
        }
      }
      
      async navigate(page, url){
        try{
            await page.goto(url, {timeout: 0, waitUntil: 'networkidle0'});
        }
        catch(ex){

            throw ex;
        }
       
      }

      async sendKeys(page, selector,value){
        try{
            await page.type(selector,value);
        }
        catch(ex){
            await this.launchBrowser();
            CucumberHooks.pageMap.set("pageVal", await this.openPageTab());
            CucumberHooks.browserArray.push(this.browser);
            throw ex;
        }

      }

      async clickSelector(page, selector){
        try{
            await page.click(selector,{clickCount: 1});
        }
        catch(ex){
            await this.launchBrowser();
            CucumberHooks.pageMap.set("pageVal", await this.openPageTab());
            CucumberHooks.browserArray.push(this.browser);
            throw ex;
        }
      }

      async closePageTab(page) {
        try{
            await page.close();
        }
        catch(ex){

            throw new Error('error while closing page tab');
        }   
      }

      async waitForSelector(page, selector){
        try{
            await page.waitForSelector(selector);
        }
        catch(ex){
            await this.launchBrowser();
            CucumberHooks.pageMap.set("pageVal", await this.openPageTab());
            CucumberHooks.browserArray.push(this.browser);
            throw ex;
        }
      }

}

export default PuppeteerControls;