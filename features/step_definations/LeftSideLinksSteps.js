
import { When } from "@cucumber/cucumber";
import CucumberHooks from "./CucumberHooks.js";

const afPage = CucumberHooks.afPage;
let page;

 When('user verifies the following left sidebar links:', async(dataTable)=>{
        page = CucumberHooks.pageMap.get("pageVal");
        const dataList = dataTable.raw();

        const sideBarTextList = await afPage.getleftSideBarLinkTexts(page);
        
        for(let name in dataList){
                if(sideBarTextList.includes(dataList[name][0])){
                        console.log(dataList[name][0]+" is present in side bar")
                }
        }

 });