import PuppeteerControls from "../../controls/PuppeteerControls.js";
import Utility from "../../utils/Utility.js";

class UnicornPreviewPage extends PuppeteerControls{

    UnicornPreviewPage(){
        console.log('inside unicorn preview page class');
    }

    async verifyPreviewPage(page){
        await this.waitForSelector(page, 'table.table-bordered');
        await this.waitForSelector(page, 'button.btn-primary.d-btn');
        await Utility.sleep(2000);
    }

    async getAllSelectedTextsInDeal(page){
        const dataTexts = []
        let x = 0;
        const options = await this.getElementList(page, 'th.table-secondary+td');
        for (let el in options) {
            const text = await (await options[el].getProperty('textContent')).jsonValue();
            dataTexts[x] = text;
            x++;
        }
        return dataTexts;
    }

}

export default UnicornPreviewPage;