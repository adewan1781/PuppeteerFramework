import PuppeteerControls from "../../controls/PuppeteerControls.js";
import Utility from "../../utils/Utility.js";

class UnicornFormDetailsPage extends PuppeteerControls{
    UnicornFormDetailsPage(){
        console.log('inside unicorn forms detail page class');
    }

    async verifyFormDetailsPage(page){
        await this.waitForSelector(page, 'div.section-header-group.qoe-heading');
        const heading = await this.evaluateWithText(page,'div.section-header-group.qoe-heading');
        return heading;
    }

    async selectCommercialProperty(page){
        await this.clickSelector(page, 'input#disclosureType');
        // await page.click('input#disclosureType',{clickCount: 1});
        await Utility.sleep(700);
        // await page.click('span.ng-option-label[ng-reflect-ng-item-label=\'Commercial Land\']',{clickCount: 1});
        await this.clickSelector(page, 'span.ng-option-label[ng-reflect-ng-item-label=\'Commercial Land\']');
    }

    async selectCashFinancePayment(page){
        await this.clickSelector(page, 'label[for=\'financeClosing\']');
    }

    async enterLoanAmount(page, value){
        await this.clearTextField(page, 'input#loanAmount');
        await this.sendKeys(page,'input#loanAmount',value);
    }

    async selectDealDateRange(page, bookingDate, closingDate){
        await this.clearTextField(page, 'input#closingDate');
        await this.sendKeys(page, 'input#closingDate',bookingDate);

        await this.clearTextField(page, 'input#disbursementDate');
        await this.sendKeys(page, 'input#disbursementDate',closingDate);        
    }

    async enterDealAgentName(page, value){
        await this.clearTextField(page, 'input#dealAgentName');
        await this.sendKeys(page,'input#dealAgentName',value);
    }

    async uploadDealPhoto(page){{
        let fileToUpload = './utils/grid_diff123.png';
        await this.uploadFile(page, 'input#file-input', fileToUpload);
    }}

    async clickSubmitDeal(page){
        await this.clickSelector(page, 'input.submit-btn.primary-btn');
    }

    async verifyPreviewPopup(page){
        await this.waitForSelector(page, 'div.confirm_modal_text');
    }

    async clickPreviewDeal(page){
        await this.clickSelector(page, 'button.mx-2.submit-btn');
    }
}

export default UnicornFormDetailsPage;