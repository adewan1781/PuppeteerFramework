import { Given, When, Then} from "@cucumber/cucumber";
import assert from "assert";
import puppeteer from 'puppeteer';
import UnicornHooks from "./UnicornHooks.js";
import Utility from "../../../utils/Utility.js";
import UnicornLoginPage from "../../../pages/unicorn_pages/UnicornLoginPage.js";
import UnicornWelcomePage from "../../../pages/unicorn_pages/UnicornWelcomePage.js";
import UnicornFormDetailsPage from "../../../pages/unicorn_pages/UnicornFormDetailsPage.js";

const ulp = new UnicornLoginPage();
const uwp = new UnicornWelcomePage();
const dealPage = new UnicornFormDetailsPage();

let page;

Given('user navigates to unicorn app', async ()=> {
    page = UnicornHooks.pageMap.get("pageVal");
    await ulp.navigateToUnicorn(page);
   

  });


  Then('unicorn {string} page should appear', async (string)=> {
  
    if(string=='Login'){
      const heading = await ulp.verifyUnicornLoginPage(page);
      assert.deepEqual(heading,"Login","Cannot open unicorn login page"); 
    }
    
    if(string=='Welcome'){
        const heading = await uwp.verifyWelcomePage(page);
        assert.deepEqual(heading,"Welcome to","Cannot login");

    }
    if(string=='Deal Details'){
       const heading = await dealPage.verifyFormDetailsPage(page);
      assert.notDeepEqual(heading,"Deal Details Form","can not open Deal Details Form");
  }
    if(string=='Preview Details'){
      await page.waitForSelector('table.table-bordered');
      await page.waitForSelector('button.btn-primary.d-btn');
      await Utility.sleep(2000);
    }
  });


  When('unicorn user enters correct username {string} and password {string}', async (string, string2)=> {
    // await page.type('input#inputUserName',string);
    // await page.type('input#inputPassword',string2);
    await ulp.enterLoginCredentials(page, string,string2);
  });


  When('unicorn user clicks {string} button', async (string)=> {
    if(string=='Sign In'){
        // await page.click('button.primary-btn',{clickCount: 1});
        await ulp.clickSignInButton(page);
    }
    if(string=='Create New'){
      // await page.click('button.primary-btn[type=\'submit\']',{clickCount: 1});
      await uwp.clickCreateNewDeal(page);
  }
  if(string=='submit'){
   await dealPage.clickSubmitDeal(page);
  }
  if(string=='Preview'){
    await dealPage.clickPreviewDeal(page);
  }
    
 
  });



  When('unicorn user enters new property address and deal number', async ()=> {
    // await page.type('input#address','1250, Sector-5');
    // await page.type('input#fileNumber','55555');
    await uwp.enterDealCredentials(page);
  });


  When('unicorn user selects transaction type as {string}', async (string)=> {
    if(string=='Sale'){
      // await page.click('input[value=\'Sale\']',{clickCount: 1});
      await uwp.selectSaleTransaction(page);
    }
    

  });

  When('unicorn user selects property type as {string}', async (string)=> {
    
    if(string=='Commercial Land'){
      await dealPage.selectCommercialProperty(page);
     
    }
  });

  When('unicorn user selects payment type as {string}', async (string)=> {
    if(string=='Cash+Finance'){
      // await page.click('label[for=\'financeClosing\']',{clickCount: 1});
      await dealPage.selectCashFinancePayment(page);
    }
  });

  When('enters Loan amount as {string}', async (string)=> {
    // console.log('Value is  '+string);
    // let dateInput = await page.$('input#loanAmount');
    // await dateInput.click({clickCount: 3});
    // await dateInput.press('Backspace'); 
    // await page.type('input#loanAmount',string);
    await dealPage.enterLoanAmount(page,string);
  });


  When('unicorn user selects date range as:', async (dataTable)=> {
    const dateMap = dataTable.rowsHash();
    // console.log("ssss "+dateMap['Booking_date']+"sdsd  "+dateMap['Deal_closing_date']);
    await dealPage.selectDealDateRange(page, dateMap['Booking_date'],dateMap['Deal_closing_date']);
    // let dateInput = await page.$('input#closingDate');
    // await dateInput.click({clickCount: 3});
    // await dateInput.press('Backspace'); 
    // await page.type('input#closingDate',dateMap['Booking_date']);

    // dateInput = await page.$('input#disbursementDate');
    // await dateInput.click({clickCount: 3});
    // await dateInput.press('Backspace'); 
    // await page.type('input#disbursementDate',dateMap['Deal_closing_date']);
    
  });


  When('unicorn user enters deal agent name as {string}', async (string)=> {
    // let dateInput = await page.$('input#dealAgentName');
    // await dateInput.click({clickCount: 3});
    // await dateInput.press('Backspace'); 
    // await page.type('input#dealAgentName',string);
    await dealPage.enterDealAgentName(page, string);
  });


  When('unicorn user uploads property photo', async ()=> {
    // const inputUploadHandle = await page.$('input#file-input');
    // inputUploadHandle.scrollIntoView(true);
    // let fileToUpload = './utils/grid_diff123.png';
    // inputUploadHandle.uploadFile(fileToUpload);
    await dealPage.uploadDealPhoto(page);
  });


  Then('unicorn preview popup should appear', async ()=> {
    // await page.waitForSelector('div.confirm_modal_text');
    await dealPage.verifyPreviewPopup(page);
  });



  Then('unicorn user verifies folowing details on preview page:', async (dataTable)=> {
    const dataMap = dataTable.rowsHash();

    const dataTexts = []
        let x = 0;
    const options = await page.$$('th.table-secondary+td');
    for (let el in options) {
      const text = await (await options[el].getProperty('textContent')).jsonValue();
      dataTexts[x] = text;
      x++;
  }
    // console.log(dataTexts);
    if(dataTexts.includes(dataMap['Deal_Number']))console.log('Deal Number: 55555 verified');
    if(dataTexts.includes(dataMap['Property_Type']))console.log('Property_Type: Commercial Land verified');
    if(dataTexts.includes(dataMap['Transaction_Type']))console.log('Transaction_Type: Sale verified');
    if(dataTexts.includes(dataMap['Booking_date']))console.log('Booking_date: Dec 1, 2023 verified');
    if(dataTexts.includes(dataMap['Deal_closing_date']))console.log('Deal_closing_date: Dec 1, 2024 verified');
    if(dataTexts.includes(dataMap['Deal_Agent']))console.log('Deal_Agent: Peter verified');
  });