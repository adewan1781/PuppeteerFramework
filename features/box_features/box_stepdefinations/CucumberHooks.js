
import { BeforeAll, AfterAll, After, Before, World} from "@cucumber/cucumber";
// import script8_createDeleteBookmark from "../../script8_createDeleteBookmark.js"
import DriverInstance from "../../../Driver/DriverInstance.js";
import LoginPage from "../../../pages/box_pages/LoginPage.js";
import AllFilesPage from "../../../pages/box_pages/AllFilesPage.js";
import CreateDeleteDocumentPage from "../../../pages/box_pages/CreateDeleteDocumentPage.js";
// import AttachmentManager from "@cucumber/cucumber/lib/runtime/attachment_manager/index.js";
// import { ICreateAttachment, ICreateLog } from "@cucumber/cucumber"
//  import World from "./World.js";

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
    // const manager = new AttachmentManager(base64);
    // manager.create(base64, "image/png");
    // World.screenshot(base64);
    // setWorldConstructor;
    // const world = new World(base64, "image/png", "jadoo");
    // world.attach(base64.toString('base64'), "base64:image/png");

    // scenario.attach(base64, "image/png");
    // World(base64,"screenshot-image","image/png");
    // new World(base64);
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