import puppeteer from 'puppeteer';
import assert from 'assert'
import PuppeteerControls from '../controls/PuppeteerControls.js';


 class NotePage extends PuppeteerControls{
   async clickLeftBarNotesButton(){
    await page.waitForSelector('a[aria-label=\'Notes\']');
    await page.click('a[aria-label=\'Notes\']');
   }

}