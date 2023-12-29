import puppeteer from 'puppeteer';
import assert from 'assert'
import Utility from '../utils/Utility.js';

class AllFilesPage{
    AllFilesPage(){
        this.nameToBeInput = null;
        this.utils = new Utility();
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
        await this.utils.sleep(2000);
        assert.strictEqual(heading, 'Create New Bookmark', 'Assertion failed: Element content does not match expected value');
        console.log('Assertion Passed');
        // expect(heading).toEqual('Create a New Folder');
     }

     async createBookmark(page){
      this.nameToBeInput = "new"+ Math.floor(Math.random() * 1000);
      await page.type('input[data-resin-target=\'urlinput\']',this.nameToBeInput);
      await page.click('button.btn-primary',{clickCount: 1});
      await this.utils.sleep(2000);
     }

     async verifyNotification(page){
      await page.waitForSelector('div[class*=\'notification info wrap\']');
      const successMessageText = "A bookmark for \""+this.nameToBeInput+"\" was created successfully.";
      console.log(successMessageText);
      await this.utils.sleep(2000);
      const heading = await page.$eval('div[class*=\'notification info wrap\']',(element=>element.textContent));
      assert.strictEqual(heading, successMessageText, 'Assertion failed: Element content does not match expected value');
      console.log('Assertion Passed');
      await page.click('button.close-btn',{clickCount: 1});
      await this.utils.sleep(2000);
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
      await this.utils.sleep(2000);
      const heading = await page.$eval('div[class*=\'notification info wrap\']',(element=>element.textContent));
      assert.notStrictEqual(heading, deleteMessageText, 'Assertion failed: Element content does not match expected value');
      console.log('Assertion Passed');
      await page.click('button.close-btn',{clickCount: 1});
      
     }

     async clickAccountBtn(page){
      await page.waitForSelector('button[data-resin-target=\'accountmenu\']');
      await page.click('button[data-resin-target=\'accountmenu\']',{clickCount: 1});
     }

     async logout(page){
      await page.waitForSelector('a[data-testid=\'account-menu-logout\']');
      await page.click('a[data-testid=\'account-menu-logout\']',{clickCount: 1});
      await page.waitForSelector('input[id="login-email"]');
    //   await this.utils.sleep(2000);
     }

     async displayError(page){
      await page.waitForSelector('div.form-error');
     }

     async getleftSideBarLinkTexts(page){
        await page.waitForSelector('button.create-dropdown-menu-toggle-button:not([aria-disabled])');
        const sideBarTexts = []
        let x=0;
        const options = await page.$$('a[class*=\'CollapsibleSidebarMenuItem__StyledLink\'] span[class*=\'menuItemLabel\']');
        for(let el in options){
            const text = await (await options[el].getProperty('textContent')).jsonValue();
            // console.log(text);
            sideBarTexts[x] = text;
            x++;
        }
        // console.log(sideBarTexts);
        return sideBarTexts;
     }

}

export default AllFilesPage;