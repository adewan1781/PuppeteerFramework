import { Given } from "@cucumber/cucumber";
import { When } from "@cucumber/cucumber";
import { Then } from "@cucumber/cucumber";
import assert from "assert"
import { BeforeAll, AfterAll } from "@cucumber/cucumber";
import script8_createDeleteBookmark from "../../script8_createDeleteBookmark.js"
import { setDefaultTimeout } from "@cucumber/cucumber";
import CucumberHooks from "./CucumberHooks.js";
import Utility from "../../utils/Utility.js";
setDefaultTimeout(60 * 1000);


const browserController = CucumberHooks.browserController;
const loginPage = CucumberHooks.loginPage;

const utils = new Utility();
let  page;

   BeforeAll(async() => {
    console.log("successful before scenario");
   });      

   Given('User is on HomePage', async ()=>{
    page = CucumberHooks.pageMap.get("pageVal");
    await loginPage.navigateToBox(page);
    await loginPage.loginPage(page);
    await loginPage.clickLoginSubmit(page);
    await utils.sleep(5000);
    console.log("successful");
    return console.log("step-1");
 });

When('User clicks on Menu button', async ()=>{
    await page.waitForSelector('button.create-dropdown-menu-toggle-button:not([aria-disabled])');
    await page.click('button.create-dropdown-menu-toggle-button:not([aria-disabled])');
    await utils.sleep(2000);
   return console.log("step-2");
 });

 Then('bookmark button should appear', async ()=> {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

When('clicks on bookmark button', async ()=>{
    await page.click('li[aria-label=\'Create a new Bookmark\']',{clickCount: 1});
    let selector = "div.modal-header";
    await page.waitForSelector(selector);
    // await this.sleep(selector);
    const heading = await page.$eval('div.modal-header',(element=>element.textContent));
    console.log(heading);
    await utils.sleep(2000);
    assert.strictEqual(heading, 'Create New Bookmark', 'Assertion failed: Element content does not match expected value');
    console.log('Assertion Passed');
   return console.log("step-3");
 });

 When('User will enter bookmark details', async ()=>{
    browserController.nameToBeInput = "new"+ Math.floor(Math.random() * 1000);
    await page.type('input[data-resin-target=\'urlinput\']',browserController.nameToBeInput);
   return console.log("step-4");
 });

 When('User clicks on CreateBookmarkButton', async ()=>{
    await page.click('button.btn-primary',{clickCount: 1});
    await utils.sleep(5000);
   return console.log("step-5");
 });

 Then('BookMarkCreated Message Should Displayed', async ()=> {
      await page.waitForSelector('div[class*=\'notification info wrap\']');
      const successMessageText = "A bookmark for \""+browserController.nameToBeInput+"\" was created successfully.";
      console.log(successMessageText);
      await utils.sleep(5000);
      const heading = await page.$eval('div[class*=\'notification info wrap\']',(element=>element.textContent));
      assert.strictEqual(heading, successMessageText, 'Assertion failed: Element content does not match expected value');
      console.log('Book Mark Creation Assertion Passed');
      await page.click('button.close-btn',{clickCount: 1});
      await utils.sleep(3000);
      return console.log("step-6");
});



When('Selected BookMark Should be deleted', async ()=>{
  await page.waitForSelector('div[role=\'row\'][tabindex=\'0\']:nth-child(1)');
      await page.hover('div[role=\'row\'][tabindex=\'0\']:nth-child(1)');
      await page.click('input[id*=\'checkbox\']',{clickCount: 1});
      await utils.sleep(3000);
      await page.click('button[aria-label=\'Trash\']');
      await page.waitForSelector('button[data-resin-target=\'primarybutton\']');
      await page.click('button[data-resin-target=\'primarybutton\']');
      console.log('Boook Mark deletion successful');
      return console.log("step-2");
});

When('BookMark deleted message should appear on screen', async ()=>{
  await page.waitForSelector('div[class*=\'notification info wrap\']');
  const deleteMessageText = "Item successfully moved to trash.";
  await utils.sleep(5000);
  const heading = await page.$eval('div[class*=\'notification info wrap\']',(element=>element.textContent));
  assert.notStrictEqual(heading, deleteMessageText, 'Assertion failed: Element content does not match expected value');
  console.log('Assertion Passed');
  await page.click('button.close-btn',{clickCount: 1});
});


