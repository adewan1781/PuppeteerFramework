import { Given } from "@cucumber/cucumber";
import { When } from "@cucumber/cucumber";
import { Then } from "@cucumber/cucumber";
import assert from "assert"
import { Before } from "@cucumber/cucumber";
import CucumberHooks from "./CucumberHooks.js";
import { setDefaultTimeout } from "@cucumber/cucumber";
setDefaultTimeout(60 * 1000);

let entryName;
let page;
const afPage = CucumberHooks.afPage;

When('user clicks on {string} button', async (btnName)=> {
    page = CucumberHooks.pageMap.get("pageVal");
     if(btnName=='New'){
        await afPage.clickNewButton(page);
     }
     if(btnName=='Create'){
        await afPage.clickCreateItem(page);
     }
     if(btnName=='Trash'){
        await afPage.clickTrash(page);
     }
  });


  When('user clicks on {string} link', async (linkName)=> {
    if(linkName=='Create Bookmark'){
        await afPage.clickBookmarkLink(page);
    }
    if(linkName=='Create Folder'){
        await page.waitForSelector('li[aria-label=\'Create a new Folder\']');
        await page.click('li[aria-label=\'Create a new Folder\']',{clickCount: 1});
    }
  });


  Then('new bookmark/folder popup should open', async ()=> {
    await afPage.verifyBookmarkPopup(page);
  });


  When('user inputs new bookmark/folder name with {string} and random text', async (nameVal)=> {
    entryName = nameVal+ Math.floor(Math.random() * 1000);
    if(nameVal.includes('bookmark')){
    await afPage.enterBookmarkValue(page, entryName);
    }
    if(nameVal.includes('folder')){
        await page.waitForSelector('input[name=\'folder-name\']');
      await page.type('input[name=\'folder-name\']',entryName);
    }
     
  });

  When('selects permission as {string}', async (string)=> {
    await page.select('select[name=\'invite-permission\']', 'Viewer'); 
  });



  When('user enter name and description as {string}', function (string) {
    
  });


  Then('successful {string} message should appear', async (notiType)=> {
    if(notiType=='bookmark creation'){
    await afPage.bookmarkCreationNotification(page, entryName);
    }
    if(notiType=='deletion'){
    await afPage.deletionNotification(page);
    }
    if(notiType=='folder creation'){
        await page.waitForSelector('div[class*=\'notification info wrap\']>span');
      const successMessageText = "\""+entryName+"\" was created successfully.";
      console.log(successMessageText);
      await page.waitForTimeout(800);
      const heading = await page.$eval('div[class*=\'notification info wrap\']>span',(element=>element.textContent));
      assert.strictEqual(heading, successMessageText, 'Assertion failed: Element content does not match expected value');
      console.log('Assertion Passed');
    }
  });


  Then('user closes notification message', async ()=> {
    await afPage.notificationMessageClose(page);
  });


  When('user selects newly created bookmark/folder row', async ()=> {
    await afPage.selectRow(page);
  });

  When('user clicks {string} button to confirm action', async (string)=> {
    await afPage.confirmOk(page);
});


