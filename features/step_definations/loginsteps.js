import { Given } from "@cucumber/cucumber";
import { When } from "@cucumber/cucumber";
import { Then } from "@cucumber/cucumber";
import assert from "assert"
import { Before } from "@cucumber/cucumber";
import CucumberHooks from "./CucumberHooks.js";
// import script8_createDeleteBookmark from "../../script8_createDeleteBookmark.js"
import { setDefaultTimeout } from "@cucumber/cucumber";
import Utility from "../../utils/Utility.js";
setDefaultTimeout(60 * 1000);

// const browserController = CucumberHooks.browserController;
let page;
const utils = new Utility();
const loginPage = CucumberHooks.loginPage;
const afPage = CucumberHooks.afPage;


Before(async () => {
  console.log("successful before scenario");
});

Given('user navigates to box app', async () => {
  page = CucumberHooks.pageMap.get("pageVal");
  console.log("afPage " + afPage);
  console.log("page " + page)
  await loginPage.navigateToBox(page);
  return console.log("step-1");
});

When('user enters correct username and password', async () => {
  await loginPage.loginPage(page);
  return console.log("step-2");
});

Then('{string} page should appear', async (string) => {
  if (string == "Box Login") {
    await utils.sleep(4000);
    console.log(await page.title() + "  correct title for login page");
    assert.deepStrictEqual(await page.title(), "Box | Login", "Page title is not correct");
  }
  else if (string == "All Files") {
    await utils.sleep(2000);
    console.log(await page.title() + "  correct title for " + string);
    assert.deepStrictEqual(await page.title(), "All Files | Powered by Box", "Page title is not correct");
  }
  return '';
});

When('clicks on login button', async () => {
  await loginPage.clickLoginSubmit(page);
  await utils.sleep(5000);
  return console.log("login button clicked");
});

When('user clicks on account menu button', async () => {
  await afPage.clickAccountBtn(page);
  return console.log("account button clicked");
});

When('logouts from app', async () => {
  await afPage.logout(page);
  return console.log("logout clicked");
});

When('user enters wrong username and password', async () => {
  await loginPage.loginWithWrongCredentials(page);
  return console.log("wrong credentials");
});

Then('error message should appear', async () => {
  await afPage.displayError(page);
  return console.log("error displayed");
});

