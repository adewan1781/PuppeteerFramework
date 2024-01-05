import { Given } from "@cucumber/cucumber";
import { When } from "@cucumber/cucumber";
import { Then } from "@cucumber/cucumber";
import assert from "assert"
import { Before } from "@cucumber/cucumber";
import CucumberHooks from "./CucumberHooks.js";
import { setDefaultTimeout } from "@cucumber/cucumber";
import BoxNotesPage from "../../pages/BoxNotesPage.js";
setDefaultTimeout(60 * 1000);

let page;
let frame;
const loginPage = CucumberHooks.loginPage;
const afPage = CucumberHooks.afPage;
const nPage = new BoxNotesPage();


When('user clicks on Notes button in left side bar', async ()=> {
  page = CucumberHooks.pageMap.get("pageVal");
  // console.log("page at last  " + page)
    await nPage.clickLeftBarNotesButton(page);
  });

  Then('{string} page tab should appear', async (string) =>{
   const pageList = await nPage.getAllOpenedTabs();
  //  console.log(pageList);
   await nPage.focusTab(pageList, pageList.length-1);
  //  page = CucumberHooks.pageMap.get("pageVal");
  page = pageList[pageList.length-1];
   await nPage.verifyTabTitle(page, string);

  });



  When('user create a new note', async ()=> {
    // console.log("this is new page: "+await page.title());
    // await page.waitForTimeout(5000);
    // frame = await page.waitForFrame(async frame => {
    //   return frame.name() === 'service_iframe';
    // });
    frame = await nPage.returnIframe(page);
    // console.log(frame)
    await nPage.createBoxNote(frame);
  });


  When('user rename the title {string}', async (title)=>{
    await nPage.timeoutWait(frame, 10000);
    await nPage.renameNote(frame, title);
    // nameToBeInput = "new"+ Math.floor(Math.random() * 1000);
    // await frame.waitForSelector('div[id="mod-pad-2"] input[placeholder="Add a Title"]'); 
    // await frame.click('div[id="mod-pad-2"] input[placeholder="Add a Title"]');        
    // await frame.type('div[id="mod-pad-2"] input[placeholder="Add a Title"]',"TEST_CKJ123");
  });

  Then('page title should be as {string}', async (string)=> {
    await nPage.timeoutWait(frame, 8000);
    await nPage.verifyTabTitle(page, string);
  });

  When('user clicks on options button', async ()=>{
    
    await nPage.clickOptionsMenu(frame);

  });



  When('delete the newly created note', async ()=> {
    await nPage.clickDelete(frame);
  });


  Then('successful note deletion message should appear',async ()=>{
    await nPage.verifyNoteDeletion(frame);
  });



  When('user closes the current page', async ()=> {
    await page.close();
    page = CucumberHooks.pageMap.get("pageVal");
    await page.bringToFront();
  });