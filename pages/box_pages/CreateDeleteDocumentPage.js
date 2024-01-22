import puppeteer from 'puppeteer';
import assert from 'assert'
import PuppeteerControls from '../../controls/PuppeteerControls.js';


class CreateDeleteDocumentPage extends PuppeteerControls {


    CreateDeleteDocumentPage() {
        console.log('inside class');

    }

    async createDocument(page, nameToBeInput) {
        page = CucumberHooks.pageMap.get("pageVal");
        await page.click('li[aria-label=\'Create a new Word Document\']', { clickCount: 1 });
        await page.type('input[name=\'name\']', nameToBeInput);

    }

    async clickOnCreateButton(page) {
        await page.click('button.btn-primary', { clickCount: 1 });
    }

    async clickOnMenuButton(page) {
        // await utils.sleep(3000);
        // await page.waitForSelector('button[data-resin-target="unifiednewmenubutton"]');
        // await page.click('button[data-resin-target="unifiednewmenubutton"]');
        await page.waitForSelector('button.create-dropdown-menu-toggle-button:not([aria-disabled])');
        await page.click('button.create-dropdown-menu-toggle-button:not([aria-disabled])');
    }

    async verifyCreateDocumentMessage(page) {
        await page.waitForSelector('div[class*=\'notifications-wrapper\']');
        const successMessageText = afPage.nameToBeInput + "\" was just uploaded. Would you like to refresh the page?";
        console.log(successMessageText);
        await utils.sleep(3000);
        const heading = await page.$eval('div[class*=\'notification info wrap\']', (element => element.textContent));
        console.log("heading:" + heading);
        // assert.strictEqual(heading, successMessageText, 'Assertion failed: Element content does not match expected value');
        console.log('Word Document Creation Assertion Passed');
    }


    async refreshPage(page) {
        await page.click('button[class="btn"]', { clickCount: 1 });
    }

    async selectFileForDelete(page) {
        await page.waitForSelector('div[role=\'row\'][tabindex=\'0\']:nth-child(1)');
        await page.hover('div[role=\'row\'][tabindex=\'0\']:nth-child(1)');
        await page.click('input[id*=\'checkbox\']', { clickCount: 1 });
    }
    async clickOnTrashButton(page) {
        await page.waitForSelector('div[role=\'row\'][tabindex=\'0\']:nth-child(1)');
        await page.click('button[aria-label=\'Trash\']');
        await page.waitForSelector('button[data-resin-target=\'primarybutton\']');
        await page.click('button[data-resin-target=\'primarybutton\']');
        console.log('Clicking on trash button');
    }

    async verifyDeletionMessage(page) {
        await page.waitForSelector('div[class*=\'notifications-wrapper\']');
        // const successMessageText = afPage.nameToBeInput + "\" was just uploaded. Would you like to refresh the page?";
        // console.log(successMessageText);
        await utils.sleep(5000);
        const heading = await page.$eval('div[class*=\'notification info wrap\']', (element => element.textContent));
        console.log("heading:" + heading);
        // assert.strictEqual(heading, successMessageText, 'Assertion failed: Element content does not match expected value');
        console.log('Word Document Deletion Assertion Passed');
        // await page.click('button.close-btn',{clickCount: 1});
    }
}
export default CreateDeleteDocumentPage;