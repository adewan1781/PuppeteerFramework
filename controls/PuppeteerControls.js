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
                // slowMo: 250
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

      async verifyPageTitle(page, title){
        try{
           const currentTitle = await page.title();
        //    console.log(currentTitle);
           if(currentTitle.includes(title)){
                return currentTitle;
           }
           else{
            throw new Error("Page title not correct. Expected: "+title+" Currenttitle: "+currentTitle);
           }
        }
        catch(ex){
            await this.launchBrowser();
            CucumberHooks.pageMap.set("pageVal", await this.openPageTab());
            CucumberHooks.browserArray.push(this.browser);
            throw ex;
        }
        
      }

      async getOpenedTabList(){
        try{
            console.log(CucumberHooks.browserArray.length)
            this.browser = CucumberHooks.browserArray[0];
            // console.log(this.browser+" browser value");
            const pageList = await this.browser.pages();
            console.log("NUMBER TABS:", pageList.length);
            return pageList;
         }
         catch(ex){
             await this.launchBrowser();
             CucumberHooks.pageMap.set("pageVal", await this.openPageTab());
             CucumberHooks.browserArray.push(this.browser);
             throw ex;
         }
      }

      async bringTabToFront(tabList, index){
        try{
          
            await tabList[index].bringToFront();
         }
         catch(ex){
             await this.launchBrowser();
             CucumberHooks.pageMap.set("pageVal", await this.openPageTab());
             CucumberHooks.browserArray.push(this.browser);
             throw ex;
         }
      }

      async returnFrameContent(page, frameName){
        try{
          
            // const framecontext = await page.$(frameSelector);
            // const iframe = await framecontext.contentFrame();
            const iframe = await page.waitForFrame(async frame => {
                return frame.name() === frameName;
              });
            return iframe;
         }
         catch(ex){
             await this.launchBrowser();
             CucumberHooks.pageMap.set("pageVal", await this.openPageTab());
             CucumberHooks.browserArray.push(this.browser);
             throw ex;
         }
        
      }

      async evaluateWithText(page, sel){
        try{
            const heading = await page.$eval(sel,(element=>element.textContent));
           return heading;
         }
         catch(ex){
             await this.launchBrowser();
             CucumberHooks.pageMap.set("pageVal", await this.openPageTab());
             CucumberHooks.browserArray.push(this.browser);
             throw ex;
         }
      }

      async mouseHover(page, selector){
        try{
            await page.hover(selector);
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