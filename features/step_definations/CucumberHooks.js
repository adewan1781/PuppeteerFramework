import { BeforeAll, AfterAll, After,Before} from "@cucumber/cucumber";
import DriverInstance from "../../driver/DriverInstance.js";
import LoginPage from "../../pages/LoginPage.js";
import AllFilesPage from "../../pages/AllFilesPage.js";

class CucumberHooks {
    static loginPage = new LoginPage();
    static afPage = new AllFilesPage();
    static driver = new DriverInstance();
    static pageMap = new Map();
    static browserArray = [];
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

After(async () => {
    // await CucumberHooks.driver.deleteAllCookies();
    console.log("after each scenario");


});

Before(async () => {


});

export default CucumberHooks;