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
    console.log("this is new page: "+await page.title());
    await page.waitForTimeout(50000);
    frame = nPage.returnIframe(page);
    console.log(frame)
    nPage.createBoxNote(frame);
    // await page.waitForTimeout(5000);
  });


  When('user rename the title {string}', async (title)=>{

  });


  When('user clicks on options button', async ()=>{

  });



  When('delete the newly created note', async ()=> {

  });


  Then('successful {string} message should appear',async (string)=>{
 
  });



  When('user closes the current page', async ()=> {

  });