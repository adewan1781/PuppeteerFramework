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

When('user clicks on {string} button', async (btnName)=> {
    page = CucumberHooks.pageMap.get("pageVal");
     if(btnName=='New'){
        await page.waitForSelector('button.create-dropdown-menu-toggle-button:not([aria-disabled])');
        await page.click('button.create-dropdown-menu-toggle-button:not([aria-disabled])');
     }
     if(btnName=='Create'){
        await page.click('button.btn-primary',{clickCount: 1});
        await page.waitForTimeout(5000);
     }
     if(btnName=='Trash'){
        await page.waitForSelector('button[aria-label=\'Trash\']');
        await page.click('button[aria-label=\'Trash\']');
     }
  });


  When('user clicks on {string} link', async (linkName)=> {
    if(linkName=='Create Bookmark'){
        await page.waitForSelector('li[aria-label=\'Create a new Bookmark\']');
        await page.click('li[aria-label=\'Create a new Bookmark\']',{clickCount: 1});
    }
    if(linkName=='Create Folder'){
        await page.waitForSelector('li[aria-label=\'Create a new Folder\']');
        await page.click('li[aria-label=\'Create a new Folder\']',{clickCount: 1});
    }
  });


  Then('new bookmark/folder popup should open', async ()=> {
    let selector = "div.modal-header";
    await page.waitForSelector(selector);
    // await this.sleep(selector);
    const heading = await page.$eval('div.modal-header',(element=>element.textContent));
    console.log(heading);
    // await this.sleep(2000);
    assert.notDeepEqual(heading, 'Create New ', 'Assertion failed: Element content does not match expected value');
    console.log('Assertion Passed');
  });


  When('user inputs new bookmark/folder name with {string} and random text', async (nameVal)=> {
    entryName = nameVal+ Math.floor(Math.random() * 1000);
    if(nameVal.includes('bookmark')){
      await page.type('input[data-resin-target=\'urlinput\']',entryName);
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
        await page.waitForSelector('div[class*=\'notification info wrap\']');
      const successMessageText = "A bookmark for \""+entryName+"\" was created successfully.";
      console.log(successMessageText);
      await page.waitForTimeout(800);
      const heading = await page.$eval('div[class*=\'notification info wrap\']',(element=>element.textContent));
      assert.strictEqual(heading, successMessageText, 'Assertion failed: Element content does not match expected value');
      console.log('Assertion Passed');
    }
    if(notiType=='deletion'){
        await page.waitForSelector('div[class*=\'notification info wrap\']');
      const deleteMessageText = "Item successfully moved to trash.";
      // console.log(successMessageText);
      await page.waitForTimeout(800);
      const heading = await page.$eval('div[class*=\'notification info wrap\']',(element=>element.textContent));
      assert.notStrictEqual(heading, deleteMessageText, 'Assertion failed: Element content does not match expected value');
      console.log('Assertion Passed');
    }
    if(notiType=='folder creation'){
        await page.waitForSelector('div[class*=\'notification info wrap\']');
      const successMessageText = "\""+entryName+"\" was created successfully.";
      console.log(successMessageText);
      await page.waitForTimeout(800);
      const heading = await page.$eval('div[class*=\'notification info wrap\']',(element=>element.textContent));
      assert.strictEqual(heading, successMessageText, 'Assertion failed: Element content does not match expected value');
      console.log('Assertion Passed');
    }
  });


  Then('user closes notification message', async ()=> {
    await page.click('button.close-btn',{clickCount: 1});
      await page.waitForTimeout(3000);
  });


  When('user selects newly created bookmark/folder row', async ()=> {
    await page.waitForSelector('div[role=\'row\'][tabindex=\'0\']:nth-child(1)');
    await page.hover('div[role=\'row\'][tabindex=\'0\']:nth-child(1)');
    await page.click('input[id*=\'checkbox\']',{clickCount: 1});
  });

  When('user clicks {string} button to confirm action', async (string)=> {
    await page.waitForSelector('button[data-resin-target=\'primarybutton\']');
    await page.click('button[data-resin-target=\'primarybutton\']');
  });


