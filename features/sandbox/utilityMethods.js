import puppeteer from 'puppeteer';
import assert from 'assert'

 class utilityMethods {
    utilityMethods() {
    this.browser = null;
    this.nameToBeInput = null;
  }

  async logOnConsole(message){
    console.log(message);
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
    if (page) {
      await page.close();
    }
  }
  async loginPage(page)
  {
    if(page)
    {
        await page.goto('https://app.box.com');
        
        const inputSelector = 'input[id="login-email"]';
        await page.type(inputSelector,"qacult.demo@gmail.com");
        await page.click('#login-submit');
        await this.sleep(2000);
        await page.type('#password-login',"testing123");
        await page.click('#login-submit-password');
        await this.sleep(12000);
    }
  }

    // use of function sleep
    async sleep(milliseconds) {  
        return new Promise(resolve => setTimeout(resolve, milliseconds));  
     }  

    async create_Delete_Notes(page){
        await page.waitForSelector('a[aria-label=\'Notes\']');
        await page.click('a[aria-label=\'Notes\']');
        await this.sleep(12000);
        const pageList = await this.browser.pages();
        console.log("NUMBER TABS:", pageList.length);
        await pageList[2].bringToFront();
        const pagetitle = await pageList[2].title();
        console.log(pagetitle);

        const framecontext = await pageList[2].$('iframe[name=\'service_iframe\']');
        const iframe = await framecontext.contentFrame();
        
        await iframe.waitForSelector('button.btn.btn-primary.create-note-button');
        await iframe.click('button.btn.btn-primary.create-note-button');

        await this.sleep(12000);

        await iframe.waitForSelector('div[id="mod-pad-2"] input[placeholder="Add a Title"]'); 
        await iframe.click('div[id="mod-pad-2"] input[placeholder="Add a Title"]');        
        await iframe.type('div[id="mod-pad-2"] input[placeholder="Add a Title"]',"TEST_CKJ");
        
        await this.sleep(5000);
        await iframe.waitForSelector('div[class="options-menu-container"] span[class="buttonicon-ellipsis "]');
        await iframe.click('div[class="options-menu-container"] span[class="buttonicon-ellipsis "]');
        
        await this.sleep(5000);
        await iframe.waitForSelector('.options-menu-delete > .options-menu-text');
        await iframe.click('.options-menu-delete > .options-menu-text');
        await this.sleep(3000);
        const successMessageText = await iframe.$eval('div[class*=\'notification info wrap\'] span[data-testid="notification"]',(element=>element.textContent));
        console.log(successMessageText);
        assert.strictEqual(successMessageText, 'Item successfully moved to trash.', 'Assertion failed: Element content does not match expected value');
        console.log('Assertion Passed');
        await pageList[2].close();
        await pageList[1].bringToFront();
        await page.closeBrowser
    }

    async openNewBookmarkPopup(page){
        await page.waitForSelector('button.create-dropdown-menu-toggle-button:not([aria-disabled])');
        await page.click('button.create-dropdown-menu-toggle-button:not([aria-disabled])');
        await page.click('li[aria-label=\'Create a new Bookmark\']',{clickCount: 1});
        let selector = "div.modal-header";
        await page.waitForSelector(selector);
        // await this.sleep(selector);
        const heading = await page.$eval('div.modal-header',(element=>element.textContent));
        console.log(heading);
        await this.sleep(2000);
        assert.strictEqual(heading, 'Create New Bookmark', 'Assertion failed: Element content does not match expected value');
        console.log('Assertion Passed');
        // expect(heading).toEqual('Create a New Folder');
     }

     async createBookmark(page){
      this.nameToBeInput = "new"+ Math.floor(Math.random() * 1000);
      await page.type('input[data-resin-target=\'urlinput\']',this.nameToBeInput);
      await page.click('button.btn-primary',{clickCount: 1});
      await this.sleep(5000);
     }

     async verifyNotification(page){
      await page.waitForSelector('div[class*=\'notification info wrap\']');
      const successMessageText = "A bookmark for \""+this.nameToBeInput+"\" was created successfully.";
      console.log(successMessageText);
      await this.sleep(800);
      const heading = await page.$eval('div[class*=\'notification info wrap\']',(element=>element.textContent));
      assert.strictEqual(heading, successMessageText, 'Assertion failed: Element content does not match expected value');
      console.log('Assertion Passed');
      await page.click('button.close-btn',{clickCount: 1});
      await this.sleep(3000);
     }

     async deleteBookmark(page){
      await page.waitForSelector('div[role=\'row\'][tabindex=\'0\']:nth-child(1)');
      await page.hover('div[role=\'row\'][tabindex=\'0\']:nth-child(1)');
      await page.click('input[id*=\'checkbox\']',{clickCount: 1});
      await page.click('button[aria-label=\'Trash\']');
      await page.waitForSelector('button[data-resin-target=\'primarybutton\']');
      await page.click('button[data-resin-target=\'primarybutton\']');
     }

     async verifyDeleteNotification(page){
      await page.waitForSelector('div[class*=\'notification info wrap\']');
      const deleteMessageText = "Item successfully moved to trash.";
      // console.log(successMessageText);
      await this.sleep(800);
      const heading = await page.$eval('div[class*=\'notification info wrap\']',(element=>element.textContent));
      assert.notStrictEqual(heading, deleteMessageText, 'Assertion failed: Element content does not match expected value');
      console.log('Assertion Passed');
      await page.click('button.close-btn',{clickCount: 1});
      
     }

     async logout(page){
      await page.click('button[data-resin-target=\'accountmenu\']',{clickCount: 1});
      await page.waitForSelector('a[data-testid=\'account-menu-logout\']');
      await page.click('a[data-testid=\'account-menu-logout\']',{clickCount: 1});
      await this.sleep(3000);
     }

     async createDeleteDocument(page){
      // await page.waitForTimeout(10000);
      await page.waitForSelector('button.create-dropdown-menu-toggle-button:not([aria-disabled])');
      await page.click('button.create-dropdown-menu-toggle-button:not([aria-disabled])');
      await page.waitForSelector('li[aria-label=\'Create a new Word Document\']');
      await page.click('li[aria-label=\'Create a new Word Document\']',{clickCount: 1});
      // await this.sleep(12000);

      let selector = "div.modal-header";
      await page.waitForSelector(selector);
      // await this.sleep(selector);
      const heading = await page.$eval('div.modal-header',(element=>element.textContent));
      console.log(heading);
      await this.sleep(2000);
      assert.strictEqual(heading, 'Create a Word Document', 'Assertion failed: Element content does not match expected value');
      console.log('Assertion Passed');

      let nameToBeInput = "new"+ Math.floor(Math.random() * 1000);
      await page.type('input[name=\'name\']',nameToBeInput);
      await page.click('button.btn-primary',{clickCount: 1});
      await this.sleep(12000);

     }
}
 
export default utilityMethods;
