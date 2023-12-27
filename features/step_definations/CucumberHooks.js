import { BeforeAll, AfterAll } from "@cucumber/cucumber";
import script8_createDeleteBookmark from "../../script8_createDeleteBookmark.js"

class CucumberHooks{
    static browserController = new script8_createDeleteBookmark();
    static pageMap = new Map();
    // static page; 
    // static{
    //     async()=>{
    //         await CucumberHooks.browserController.launchBrowser();
    //         page = await CucumberHooks.browserController.createPage();
    //     }

    // }

    // static async launch(){
    //     await CucumberHooks.browserController.launchBrowser();
    //     CucumberHooks.page = await CucumberHooks.browserController.createPage();
    // }
}

BeforeAll(async() => {
    await CucumberHooks.browserController.launchBrowser();
    
    // const page = await CucumberHooks.browserController.createPage();
    CucumberHooks.pageMap.set("pageVal",await CucumberHooks.browserController.createPage());
    // await CucumberHooks.launch();
    console.log("successful");
   });

   AfterAll(async() => {
    await CucumberHooks.browserController.closeBrowser();
     console.log("successful done");
   });

export default CucumberHooks;