import puppeteer from 'puppeteer';
import assert from 'assert'
import Utility from '../utils/Utility.js';
import PuppeteerControls from '../controls/PuppeteerControls.js';

class AllFilesPage extends PuppeteerControls {
    AllFilesPage() {
        this.nameToBeInput = null;
        this.utils = new Utility();
    }

    async clickNewButton(page) {
        await this.waitForSelector(page, 'button.create-dropdown-menu-toggle-button:not([aria-disabled])');
        await this.clickSelector(page, 'button.create-dropdown-menu-toggle-button:not([aria-disabled])');
    }

    async clickBookmarkLink(page) {
        await this.waitForSelector(page, 'li[aria-label=\'Create a new Bookmark\']');
        await this.clickSelector(page, 'li[aria-label=\'Create a new Bookmark\']');
    }

    async verifyBookmarkPopup(page) {
        let selector = "div.modal-header";
        await this.waitForSelector(page, selector);
        const heading = await this.evaluateWithText(page, selector);
        assert.notDeepEqual(heading, 'Create New ', 'Assertion failed: Element content does not match expected value');
    }

    async enterBookmarkValue(page, value) {
        await this.sendKeys(page, 'input[data-resin-target=\'urlinput\']', value);
    }

    async clickCreateItem(page) {
        await this.clickSelector(page, 'button.btn-primary');
        await page.waitForTimeout(5000);
    }

    async bookmarkCreationNotification(page, entryName) {
        await this.waitForSelector(page, 'div[class*=\'notification info wrap\']');
        const successMessageText = "A bookmark for \"" + entryName + "\" was created successfully.";
        // console.log(successMessageText);
        await page.waitForTimeout(800);
        const heading = await this.evaluateWithText(page, 'div[class*=\'notification info wrap\']');
        assert.strictEqual(heading, successMessageText, 'Assertion failed: Element content does not match expected value');
        console.log('Assertion Passed');
    }

    async folderCreationNotification(page, entryName){
        const successMessageText = '"'+entryName+'" was created successfully.';
        // console.log(successMessageText);  
        const notiSelector = 'div.notification.info.wrap>span';
        const notiText = " was created successfully.";
 
        await this.waitForTextToAppear(page, notiSelector, notiText);
        const heading = await this.evaluateWithText(page, notiSelector);
        assert.strictEqual(heading, successMessageText, 'Assertion failed: Element content does not match expected value');
        console.log('Assertion Passed');
    }
    async folderRenameNotification(page, entryName){
        const successMessageText = 'The folder has been renamed to '+entryName+'.';
         console.log(successMessageText);  
        const notiSelector = 'div.notification.info.wrap>span';
        const notiText = "The folder has been renamed to ";
 
        await this.waitForTextToAppear(page, notiSelector, notiText);
        const heading = await this.evaluateWithText(page, notiSelector);
        console.log(heading); 
        assert.strictEqual(heading, successMessageText, 'Assertion failed: Element content does not match expected value');
        console.log('Assertion Passed');
    }
    
    async deletionNotification(page) {
        await this.waitForSelector(page, 'div[class*=\'notification info wrap\']');
        const successMessageText = "Item successfully moved to trash.";
        // console.log(successMessageText);
        await page.waitForTimeout(800);
        const heading = await this.evaluateWithText(page, 'div[class*=\'notification info wrap\']');
        assert.notStrictEqual(heading, successMessageText, 'Assertion failed: Element content does not match expected value');
        console.log('Assertion Passed');
    }

    async notificationMessageClose(page) {
        await this.waitForSelector(page, 'button.close-btn');
        await this.clickSelector(page, 'button.close-btn');
        await page.waitForTimeout(3000);
    }

    async selectRow(page) {
        await this.waitForSelector(page, 'div[role=\'row\'][tabindex=\'0\']:nth-child(1)');
        await this.mouseHover(page, 'div[role=\'row\'][tabindex=\'0\']:nth-child(1)');
        await this.clickSelector(page, 'input[id*=\'checkbox\']');
    }

    async clickTrash(page) {
        await this.waitForSelector(page, 'button[aria-label=\'Trash\']');
        await this.clickSelector(page, 'button[aria-label=\'Trash\']');
    }

    async confirmOk(page){
        await this.waitForSelector(page, 'button[data-resin-target=\'primarybutton\']');
        await this.clickSelector(page, 'button[data-resin-target=\'primarybutton\']');
    }

    async clickAccountBtn(page) {
        await this.waitForSelector(page, 'button[data-resin-target=\'accountmenu\']');
        await this.clickSelector(page, 'button[data-resin-target=\'accountmenu\']');
    }

    async logout(page) {
        await this.waitForSelector(page,'a[data-testid=\'account-menu-logout\']');
        await this.clickSelector(page, 'a[data-testid=\'account-menu-logout\']');
    }

    async displayError(page) {
        await this.waitForSelector('div.form-error');
    }

    async getleftSideBarLinkTexts(page) {
        await page.waitForSelector('button.create-dropdown-menu-toggle-button:not([aria-disabled])');
        const sideBarTexts = []
        let x = 0;
        const options = await page.$$('a[class*=\'CollapsibleSidebarMenuItem__StyledLink\'] span[class*=\'menuItemLabel\']');
        for (let el in options) {
            const text = await (await options[el].getProperty('textContent')).jsonValue();
            sideBarTexts[x] = text;
            x++;
        }
        // console.log(sideBarTexts);
        return sideBarTexts;
    }

     async MouseOverMoreOptins(page) {
        await this.waitForSelector(page, 'button[aria-label=\'More Options\']');
        await this.mouseHover(page, 'button[aria-label=\'More Options\']');
        await this.clickSelector(page, 'button[aria-label=\'More Options\']');
        await this.mouseHover(page, '.menu-item:nth-child(5) > span');
        await this.mouseHover(page, '.submenu > .menu-item:nth-child(2) > span');
        await this.clickSelector(page, '.submenu > .menu-item:nth-child(2) > span');

}

async clickSaveBtnOnRenameFolder(page) {
    await this.clickSelector(page, '.btn:nth-child(2) > .btn-content > span');
    await page.waitForTimeout(5000);
}



}
export default AllFilesPage;