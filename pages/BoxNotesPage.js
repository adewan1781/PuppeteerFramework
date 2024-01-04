import puppeteer from 'puppeteer';
import assert from 'assert'
import PuppeteerControls from '../controls/PuppeteerControls.js';
import Utility from '../utils/Utility.js';


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
    console.log("current title of page: "+currentTitle);
   }

   async returnIframe(page){
        // await page.waitForNavigation({
        //     waitUntil: 'networkidle0',
        // });
        // await page.waitForTimeout(15000);
        return this.returnFrameContent(page,  'iframe[name=\'service_iframe\']');
        
   }

   async createBoxNote(frame){
    // await page.waitForTimeout(6000);
        await frame.waitForSelector('button.btn.btn-primary.create-note-button');
        await frame.click('button.btn.btn-primary.create-note-button');
        //  await this.waitForSelector(frame, 'button.btn.btn-primary.create-note-button');
        // await this.clickSelector(frame,'button.btn.btn-primary.create-note-button');
        // this.sleep(10000);
        // await page.waitForTimeout(5000);
   }

}

export default BoxNotesPage;
