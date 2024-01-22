import { Given, When, Then} from "@cucumber/cucumber";
import assert from "assert";
import puppeteer from 'puppeteer';
import UnicornHooks from "./UnicornHooks.js";
import Utility from "../../../utils/Utility.js";

let page;

Given('user navigates to unicorn app', async ()=> {
    page = UnicornHooks.pageMap.get("pageVal");
    await page.goto('https://trainee-web-app.azurewebsites.net/auth/login', {timeout: 0, waitUntil: 'networkidle0'});
   

  });


  Then('unicorn {string} page should appear', async (string)=> {
  
    if(string=='Login'){
        const heading = await page.$eval('h5#login-title',(element=>element.textContent));
        assert.deepEqual(heading,"Login","Cannot open unicorn login page");

    }
    
    if(string=='Welcome'){
        await page.waitForSelector('h5.dashboard-title');
        const heading = await page.$eval('h5.dashboard-title',(element=>element.textContent));
        assert.deepEqual(heading,"Welcome to","Cannot login");

    }
    if(string=='Deal Details'){
      await page.waitForSelector('div.section-header-group.qoe-heading');
      const heading = await page.$eval('div.section-header-group.qoe-heading',(element=>element.textContent));
      assert.notDeepEqual(heading,"Deal Details Form","can not open Deal Details Form");
  }
    if(string=='Preview Details'){
      await page.waitForSelector('table.table-bordered');
      await page.waitForSelector('button.btn-primary.d-btn');
      await Utility.sleep(4000);
    }
  });


  When('unicorn user enters correct username {string} and password {string}', async (string, string2)=> {
    await page.type('input#inputUserName',string);
    await page.type('input#inputPassword',string2);
  });


  When('unicorn user clicks {string} button', async (string)=> {
    if(string=='Sign In'){
        await page.click('button.primary-btn',{clickCount: 1});
    }
    if(string=='Create New'){
      await page.click('button.primary-btn[type=\'submit\']',{clickCount: 1});
  }
  if(string=='submit'){
    let element = await page.$('input.submit-btn.primary-btn');
    element.scrollIntoView(true);
    await page.click('input.submit-btn.primary-btn',{clickCount: 1});
  }
  if(string=='Preview'){
    await page.click('button.mx-2.submit-btn',{clickCount: 1});
  }
    
 
  });



  When('unicorn user enters new property address and deal number', async ()=> {
    await page.type('input#address','1250, Sector-5');
    await page.type('input#fileNumber','55555');


  });


  When('unicorn user selects transaction type as {string}', async (string)=> {
    if(string=='Sale'){
      await page.click('input[value=\'Sale\']',{clickCount: 1});
    }
    

  });

  When('unicorn user selects property type as {string}', async (string)=> {
    await page.click('input#disclosureType',{clickCount: 1});
    if(string=='Commercial Land'){
      await Utility.sleep(700);
      await page.click('span.ng-option-label[ng-reflect-ng-item-label=\'Commercial Land\']',{clickCount: 1});
    }
  });

  When('unicorn user selects payment type as {string}', async (string)=> {
    if(string=='Cash+Finance'){
      await page.click('label[for=\'financeClosing\']',{clickCount: 1});
    }
  });

  When('enters Loan amount as {string}', async (string)=> {
    // console.log('Value is  '+string);
    let dateInput = await page.$('input#loanAmount');
    await dateInput.click({clickCount: 3});
    await dateInput.press('Backspace'); 
    await page.type('input#loanAmount',string);
  });


  When('unicorn user selects date range as:', async (dataTable)=> {
    const dateMap = dataTable.rowsHash();
    // console.log("ssss "+dateMap['Booking_date']+"sdsd  "+dateMap['Deal_closing_date']);

    let dateInput = await page.$('input#closingDate');
    await dateInput.click({clickCount: 3});
    await dateInput.press('Backspace'); 
    await page.type('input#closingDate',dateMap['Booking_date']);

    dateInput = await page.$('input#disbursementDate');
    await dateInput.click({clickCount: 3});
    await dateInput.press('Backspace'); 
    await page.type('input#disbursementDate',dateMap['Deal_closing_date']);
    
  });


  When('unicorn user enters deal agent name as {string}', async (string)=> {
    let dateInput = await page.$('input#dealAgentName');
    await dateInput.click({clickCount: 3});
    await dateInput.press('Backspace'); 
    await page.type('input#dealAgentName',string);
  });


  When('unicorn user uploads property photo', async ()=> {
    const inputUploadHandle = await page.$('input#file-input');
    inputUploadHandle.scrollIntoView(true);
    let fileToUpload = './utils/grid_diff123.png';
    inputUploadHandle.uploadFile(fileToUpload);
  });


  Then('unicorn preview popup should appear', async ()=> {
    await page.waitForSelector('div.confirm_modal_text');
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