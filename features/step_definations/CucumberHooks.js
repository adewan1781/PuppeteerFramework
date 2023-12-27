import { BeforeAll, AfterAll, After } from "@cucumber/cucumber";
// import script8_createDeleteBookmark from "../../script8_createDeleteBookmark.js"
import DriverInstance from "../../driver/DriverInstance.js";
import LoginPage from "../../pages/LoginPage.js";
import AllFilesPage from "../../pages/AllFilesPage.js";

class CucumberHooks {
    // static browserController = new script8_createDeleteBookmark();
    static loginPage = new LoginPage();
    static afPage = new AllFilesPage();
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

After(async () => {
    // await CucumberHooks.driver.deleteAllCookies();
    console.log("after each scenario");
});


export default CucumberHooks;