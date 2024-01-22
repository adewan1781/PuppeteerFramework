import PuppeteerControls from "../../controls/PuppeteerControls.js";

class UnicornWelcomePage extends PuppeteerControls{

    UnicornWelcomePage(){
        console.log('inside unicorn welcome page class');
    }

    async verifyWelcomePage(page){
        // await page.waitForSelector('h5.dashboard-title');
        // const heading = await page.$eval('h5.dashboard-title',(element=>element.textContent));
        await this.waitForSelector(page, 'h5.dashboard-title');
        const heading = await this.evaluateWithText(page,'h5.dashboard-title');
        return heading;
    }

    async enterDealCredentials(page){
        await this.sendKeys(page,'input#address','1250, Sector-5');
        await this.sendKeys(page,'input#fileNumber','55555');
    }

    async clickCreateNewDeal(page){
        // await page.click('button.primary-btn[type=\'submit\']',{clickCount: 1});
        await this.clickSelector(page, 'button.primary-btn[type=\'submit\']');
    }

    async selectSaleTransaction(page){
        // await page.click('input[value=\'Sale\']',{clickCount: 1});
        await this.clickSelector(page, 'input[value=\'Sale\']');
    }
}
export default UnicornWelcomePage;