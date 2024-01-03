import { Given } from "@cucumber/cucumber";
import { When } from "@cucumber/cucumber";
import { Then } from "@cucumber/cucumber";
import assert from "assert"
import { BeforeAll, AfterAll } from "@cucumber/cucumber";
import { setDefaultTimeout } from "@cucumber/cucumber";
import CucumberHooks from "./CucumberHooks.js";
import Utility from "../../utils/Utility.js";
setDefaultTimeout(60 * 1000);
let page;
const utils = new Utility();
const afPage = CucumberHooks.afPage;
const browserController = CucumberHooks.browserController;
const createDeleteDocument = CucumberHooks.createDeleteDocument;

When('User create the document', async( )=>
{
    page = CucumberHooks.pageMap.get("pageVal");
    afPage.nameToBeInput = "new" + Math.floor(Math.random() * 1000);
    await utils.sleep(2000);
    createDeleteDocument.createDocument(page,afPage.nameToBeInput);
    await utils.sleep(5000);
});

When('User clicks on Menu button', async ()=>{
    await utils.sleep(9000);
    createDeleteDocument.clickOnMenuButton(page);
    await utils.sleep(2000);
   return console.log("step-2");
 });


Then('clicks on create document button', async () => {
    createDeleteDocument.clickOnCreateButton(page);
    await utils.sleep(5000);
});

Then('User will switch to new word document window', async () => {
    await page.bringToFront();
    await utils.sleep(10000);
});

Then('WordDocument created Message Should Displayed', async () => {
    createDeleteDocument.verifyCreateDocumentMessage(page);
    createDeleteDocument.refreshPage(page);
    return console.log("step-6");
});

When('user selects newly created document row', async ()=>{
    createDeleteDocument.selectFileForDelete(page);
    // await page.waitForSelector('div[role=\'row\'][tabindex=\'0\']:nth-child(1)');
        // await page.hover('div[role=\'row\'][tabindex=\'0\']:nth-child(1)');
        // await page.click('input[id*=\'checkbox\']',{clickCount: 1});
        await utils.sleep(8000);
        return console.log("step-7");
  });

  When('user clicks on Trash button', async ()=>{
    await utils.sleep(5000);
    createDeleteDocument.clickOnTrashButton(page);
    // await page.waitForSelector('div[role=\'row\'][tabindex=\'0\']:nth-child(1)');
    //     await page.click('button[aria-label=\'Trash\']');
    //     await page.waitForSelector('button[data-resin-target=\'primarybutton\']');
    //     await page.click('button[data-resin-target=\'primarybutton\']');
    //     console.log('Clicking on trash button');
        return console.log("step-8");
  });

  Then('successful deletion message should appear', async () => {
    // await page.waitForSelector('div[class*=\'notifications-wrapper\']');
    // const successMessageText = afPage.nameToBeInput + "\" was just uploaded. Would you like to refresh the page?";
    // console.log(successMessageText);
    await utils.sleep(5000);
    createDeleteDocument.verifyDeletionMessage(page);
    // const heading = await page.$eval('div[class*=\'notification info wrap\']',(element=>element.textContent));
    // console.log("heading:"+heading);
    // assert.strictEqual(heading, successMessageText, 'Assertion failed: Element content does not match expected value');
    // console.log('Word Document Deletion Assertion Passed');
    // await page.click('button.close-btn',{clickCount: 1});
    await utils.sleep(3000);
    return console.log("step-6");
});