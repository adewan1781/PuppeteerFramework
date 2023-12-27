import { BeforeAll, AfterAll } from "@cucumber/cucumber";
import script8_createDeleteBookmark from "../../script8_createDeleteBookmark.js"
import DriverInstance from "../../Driver/DriverInstance.js";
import LoginPage from "../../pages/LoginPage.js";

class CucumberHooks {
    static browserController = new script8_createDeleteBookmark();
    static loginPage = new LoginPage();

    static driver = new DriverInstance();
    static pageMap = new Map();
}


BeforeAll(async () => {
    await CucumberHooks.driver.launchBrowser();
    CucumberHooks.pageMap.set("pageVal", await CucumberHooks.driver.createPage());
    console.log("successful");
});

AfterAll(async () => {
    await CucumberHooks.driver.closeBrowser();
    console.log("successful done");
});

export default CucumberHooks;