import { Given } from "@cucumber/cucumber";
import { When } from "@cucumber/cucumber";
import { Then } from "@cucumber/cucumber";
import assert from "assert"
import { Before } from "@cucumber/cucumber";
import CucumberHooks from "./CucumberHooks.js";
import { setDefaultTimeout } from "@cucumber/cucumber";
import Utility from "../../../utils/Utility.js";
setDefaultTimeout(60 * 1000);

let page;
const utils = new Utility();
const loginPage = CucumberHooks.loginPage;
const afPage = CucumberHooks.afPage;

Given('user navigates to box app', async () => {
  page = CucumberHooks.pageMap.get("pageVal");
  // console.log("afPage " + afPage);
  // console.log("page " + page)
  await loginPage.navigateToBox(page);
  return console.log("step-1");
});

Then('{string} page should appear', async (string) => {
  await Utility.sleep(1000);
  console.log(await loginPage.pageTitle(page, string) + "  correct title for " + string);
  return '';
});

When('clicks on login button', async () => {
  await loginPage.clickLoginSubmit(page);
  await Utility.sleep(5000);
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

Then('error message should appear', async () => {
  await afPage.displayError(page);
  return console.log("error displayed");
});

When('user enters correct/wrong username {string} and password {string}', async (string, string2)=> {
  await loginPage.loginPage(page, string, string2);
  return console.log("step-2");
});

