import { Given, When, Then } from "@cucumber/cucumber";
import assert from "assert";
import puppeteer from 'puppeteer';
import UnicornHooks from "./UnicornHooks.js";
import Utility from "../../../utils/Utility.js";
import UnicornLoginPage from "../../../pages/unicorn_pages/UnicornLoginPage.js";
import UnicornWelcomePage from "../../../pages/unicorn_pages/UnicornWelcomePage.js";
import UnicornFormDetailsPage from "../../../pages/unicorn_pages/UnicornFormDetailsPage.js";
import UnicornPreviewPage from "../../../pages/unicorn_pages/UnicornPreviewPage.js";

const ulp = new UnicornLoginPage();
const uwp = new UnicornWelcomePage();
const dealPage = new UnicornFormDetailsPage();
const preview = new UnicornPreviewPage();

let page;

Given('user navigates to unicorn app', async () => {
  page = UnicornHooks.pageMap.get("pageVal");
  await ulp.navigateToUnicorn(page);


});


Then('unicorn {string} page should appear', async (string) => {

  if (string == 'Login') {
    const heading = await ulp.verifyUnicornLoginPage(page);
    assert.deepEqual(heading, "Login", "Cannot open unicorn login page");
  }

  if (string == 'Welcome') {
    const heading = await uwp.verifyWelcomePage(page);
    assert.deepEqual(heading, "Welcome to", "Cannot login");

  }
  if (string == 'Deal Details') {
    const heading = await dealPage.verifyFormDetailsPage(page);
    assert.notDeepEqual(heading, "Deal Details Form", "can not open Deal Details Form");
  }
  if (string == 'Preview Details') {
    await preview.verifyPreviewPage(page);
  }
});


When('unicorn user enters correct username {string} and password {string}', async (string, string2) => {
  await ulp.enterLoginCredentials(page, string, string2);
});


When('unicorn user clicks {string} button', async (string) => {
  if (string == 'Sign In') {
    await ulp.clickSignInButton(page);
  }
  if (string == 'Create New') {
    await uwp.clickCreateNewDeal(page);
  }
  if (string == 'submit') {
    await dealPage.clickSubmitDeal(page);
  }
  if (string == 'Preview') {
    await dealPage.clickPreviewDeal(page);
  }


});



When('unicorn user enters new property address and deal number', async () => {
  await uwp.enterDealCredentials(page);
});


When('unicorn user selects transaction type as {string}', async (string) => {
  if (string == 'Sale') {
    await uwp.selectSaleTransaction(page);
  }


});

When('unicorn user selects property type as {string}', async (string) => {

  if (string == 'Commercial Land') {
    await dealPage.selectCommercialProperty(page);

  }
});

When('unicorn user selects payment type as {string}', async (string) => {
  if (string == 'Cash+Finance') {
    await dealPage.selectCashFinancePayment(page);
  }
});

When('enters Loan amount as {string}', async (string) => {
  await dealPage.enterLoanAmount(page, string);
});


When('unicorn user selects date range as:', async (dataTable) => {
  const dateMap = dataTable.rowsHash();
  await dealPage.selectDealDateRange(page, dateMap['Booking_date'], dateMap['Deal_closing_date']);
});


When('unicorn user enters deal agent name as {string}', async (string) => {
  await dealPage.enterDealAgentName(page, string);
});


When('unicorn user uploads property photo', async () => {
  await dealPage.uploadDealPhoto(page);
});


Then('unicorn preview popup should appear', async () => {
  await dealPage.verifyPreviewPopup(page);
});



Then('unicorn user verifies folowing details on preview page:', async (dataTable) => {
  const dataMap = dataTable.rowsHash();
  const dataTexts = await preview.getAllSelectedTextsInDeal(page);

  let boolean = dataTexts.includes(dataMap['Deal_Number']);
  assert.ok(boolean, 'Deal Number not verified');
  console.log('Deal Number: 55555 verified');

  boolean = dataTexts.includes(dataMap['Property_Type']);
  assert.ok(boolean, 'Property_Type not verified');
  console.log('Property_Type: Commercial Land verified');

  boolean = dataTexts.includes(dataMap['Transaction_Type']);
  assert.ok(boolean, 'Transaction_Type not verified');
  console.log('Transaction_Type: Sale verified');

  boolean = dataTexts.includes(dataMap['Booking_date']);
  assert.ok(boolean, 'Booking_date not verified');

  boolean = dataTexts.includes(dataMap['Deal_Agent']);
  assert.ok(boolean, 'Deal_Agent not verified');
  console.log('Deal_Agent: Peter verified');

  boolean = dataTexts.includes(dataMap['Deal_closing_date']);
  assert.ok(boolean, 'Deal_closing_date not verified');
  console.log('Deal_closing_date: Dec 1, 2024 verified');

});