
import { BeforeAll, AfterAll, After, Before} from "@cucumber/cucumber";
import DriverInstance from "../../../Driver/DriverInstance.js";


class UnicornHooks {
    // static driver = new DriverInstance();
    static pageMap = new Map();
    static browserArray = [];
}
let browser;

// BeforeAll(async () => {
//     const driver = new DriverInstance();
//     browser = await driver.launchBrowser();
//     UnicornHooks.pageMap.set("pageVal", await driver.createPage());
//     UnicornHooks.browserArray.push(browser);
//     console.log("successful");
// });

// AfterAll(async () => {
//     for(let b in UnicornHooks.browserArray){
//         UnicornHooks.browserArray[b].close();
//     }
//     console.log("successful done");
// });

// After(async (scenario) => {
//     // await CucumberHooks.driver.deleteAllCookies();
//     const page1 = UnicornHooks.pageMap.get("pageVal");
//     console.log("after each scenario ");
//     const base64 = await page1.screenshot({ encoding: "base64" });

// });

// Before(async (scenario) => {
//     console.log("***********************************");
//     console.log("Starting unicorn scenario: "+scenario.pickle.name);

// });

export default UnicornHooks;