
import { BeforeAll, AfterAll, After, Before, TestCaseHookDefinition } from "@cucumber/cucumber";
// import script8_createDeleteBookmark from "../../script8_createDeleteBookmark.js"
import DriverInstance from "../../Driver/DriverInstance.js";
import LoginPage from "../../pages/LoginPage.js";
import AllFilesPage from "../../pages/AllFilesPage.js";
import CreateDeleteDocumentPage from "../../pages/CreateDeleteDocumentPage.js";

class CucumberHooks {
    static loginPage = new LoginPage();
    static afPage = new AllFilesPage();
    static driver = new DriverInstance();
    static pageMap = new Map();
    static browserArray = [];
    static createDeleteDocument = new CreateDeleteDocumentPage();
}
let browser;

BeforeAll(async () => {
    browser = await CucumberHooks.driver.launchBrowser();
    CucumberHooks.pageMap.set("pageVal", await CucumberHooks.driver.createPage());
    CucumberHooks.browserArray.push(browser);
    console.log("successful");
});

AfterAll(async () => {
    for(let b in CucumberHooks.browserArray){
        CucumberHooks.browserArray[b].close();
    }
    console.log("successful done");
});

After(async (scenario) => {
    // await CucumberHooks.driver.deleteAllCookies();
    const page1 = CucumberHooks.pageMap.get("pageVal");
    console.log("after each scenario ");
    const base64 = await page1.screenshot({ encoding: "base64" });
    // CucumberHooks.attach(base64, { mediaType: 'base64:image/png' })
    // .attach(base64, 'image/png');
    // await testcase.attach(base64, { mediaType: 'image/png' });
    // this.attach('Some text');


});

Before(async (scenario) => {
    console.log("***********************************");
    console.log("Starting scenario: "+scenario.pickle.name);

    // testcase.result.log('scenario started');

});

export default CucumberHooks;