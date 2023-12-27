import { Given } from "@cucumber/cucumber";
import { When } from "@cucumber/cucumber";
import { Then } from "@cucumber/cucumber";
import assert from "assert"
import { Before} from "@cucumber/cucumber";
import CucumberHooks from "./CucumberHooks.js";
import script8_createDeleteBookmark from "../../script8_createDeleteBookmark.js"
import { setDefaultTimeout } from "@cucumber/cucumber";
setDefaultTimeout(60 * 1000);

const browserController = CucumberHooks.browserController;
let page;
// const page = CucumberHooks.page;

Before(async() => {
  // await CucumberHooks.browserController.launchBrowser();
  // return page = await browserController.createPage();
  // await CucumberHooks.launch();
  console.log("successful before scenario");
 });

Given('user navigates to box app', async ()=>{
    page = CucumberHooks.pageMap.get("pageVal");
    console.log("browserController "+browserController);
    console.log("page "+page )
    // page = await browserController.createPage();
    
     await browserController.navigateToBox(page);
    return console.log("step-1");
  });

  When('user enters correct username and password', async()=>{
    await browserController.loginPage(page);
    return console.log("step-2");
  });

  Then('{string} page should appear', async(string)=> {
    if(string=="Box Login"){
      await browserController.sleep(4000);
      console.log(await page.title()+"  correct title for login page");
      assert.deepStrictEqual(await page.title(),"Box | Login","Page title is not correct");
    }
    else if(string=="All Files"){
      await browserController.sleep(2000);
      console.log(await page.title()+"  correct title for "+string);
      assert.deepStrictEqual(await page.title(),"All Files | Powered by Box","Page title is not correct");
    }
    return '';
  });

  When('clicks on login button', async()=> {
    await browserController.clickLoginSubmit(page);
    await browserController.sleep(5000);
    return console.log("login button clicked");
  });

  When('user clicks on account menu button', async ()=> {
    await browserController.clickAccountBtn(page);
    return console.log("account button clicked");
  });

  When('logouts from app', async ()=> {
    await browserController.logout(page);
    return console.log("logout clicked");
  });



  When('user enters wrong username and password',async ()=> {
  await browserController.loginWithWrongCredentials(page);
  return console.log("wrong credentials");
  });

  Then('error message should appear', async ()=> {
    await browserController.displayError(page);
  return console.log("error displayed");
  });

  