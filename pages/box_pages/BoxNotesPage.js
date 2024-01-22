import puppeteer from 'puppeteer';
import assert from 'assert'
import PuppeteerControls from '../../controls/PuppeteerControls.js';
import Utility from '../../utils/Utility.js';


 class BoxNotesPage extends PuppeteerControls{

    BoxNotesPage(){
        
    }
    // async sleep(ms){
    //     // const utils = new Utility();
    //     // return utils.sleep(ms);
    //     console.log("sleeping from notes page");
    //         return new Promise(resolve => setTimeout(resolve, ms));
    // }

    async clickLeftBarNotesButton(page){
        await this.waitForSelector(page, 'a[aria-label=\'Notes\']');
        await this.clickSelector(page, 'a[aria-label=\'Notes\']');
        // this.sleep(10000);
        await page.waitForTimeout(2000);
   }

   async getAllOpenedTabs(){
    // BoxNotesPage.sleep(12000);
    return await this.getOpenedTabList();
   }

   async focusTab(tabList, index){
    await this.bringTabToFront(tabList, index);
   }

   async verifyTabTitle(tab, title){
    const currentTitle = await this.verifyPageTitle(tab, title);
//     console.log("current title of page: "+currentTitle);
   }

   async returnIframe(page){
        // await page.waitForNavigation({
        //     waitUntil: 'networkidle0',
        // });
        // await page.waitForTimeout(15000);
        return this.returnFrameContent(page,  'service_iframe');
        
   }

   async createBoxNote(frame){
    // await page.waitForTimeout(6000);
     //    await frame.waitForSelector('button.btn.btn-primary.create-note-button');
     //    await frame.click('button.btn.btn-primary.create-note-button');
         await this.waitForSelector(frame, 'button.btn.btn-primary.create-note-button');
        await this.clickSelector(frame,'button.btn.btn-primary.create-note-button');
        // this.sleep(10000);
        // await page.waitForTimeout(5000);
   }

   async timeoutWait(page, ms){
     await page.waitForTimeout(ms);
   }

   async renameNote(frame, text){
    const nameToBeInput = text+ Math.floor(Math.random() * 1000);
     // await frame.waitForSelector('div[id="mod-pad-2"] input[placeholder="Add a Title"]'); 
     // await frame.click('div[id="mod-pad-2"] input[placeholder="Add a Title"]');        
     // await frame.type('div[id="mod-pad-2"] input[placeholder="Add a Title"]',"TEST_CKJ123");

     await this.waitForSelector(frame, 'div[id="mod-pad-2"] input[placeholder="Add a Title"]');
     await this.clickSelector(frame, 'div[id="mod-pad-2"] input[placeholder="Add a Title"]');
     await this.sendKeys(frame, 'div[id="mod-pad-2"] input[placeholder="Add a Title"]', nameToBeInput);

   }
   
   async clickOptionsMenu(frame){
          await this.timeoutWait(frame,5000);
     // await frame.waitForSelector('div[class="options-menu-container"] span[class="buttonicon-ellipsis "]');
     //    await frame.click('div[class="options-menu-container"] span[class="buttonicon-ellipsis "]');
        await this.waitForSelector(frame, 'div[class="options-menu-container"] span[class="buttonicon-ellipsis "]');
        await this.clickSelector(frame, 'div[class="options-menu-container"] span[class="buttonicon-ellipsis "]');
   }

   async clickDelete(frame){
     await this.timeoutWait(frame, 1500);
     // await iframe.waitForSelector('.options-menu-delete > .options-menu-text');
     // await iframe.click('.options-menu-delete > .options-menu-text');
        await this.waitForSelector(frame,'.options-menu-delete > .options-menu-text');
     await this.clickSelector(frame, '.options-menu-delete > .options-menu-text');

   }

   async verifyNoteDeletion(frame){
     await this.timeoutWait(frame, 2500);
     await this.waitForSelector(frame,'div[class*=\'notification info wrap\']');
     const successMessageText = await frame.$eval('div[class*=\'notification info wrap\']',(element=>element.textContent));
     //    console.log(successMessageText);
        assert.notDeepEqual(successMessageText, 'Item successfully moved to trash.', 'Assertion failed: Element content does not match expected value');
        console.log('Note deleted successfully');
   }
}

export default BoxNotesPage;
