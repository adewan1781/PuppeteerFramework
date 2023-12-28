
import { When } from "@cucumber/cucumber";

 When('user verifies the following left sidebar links:', async(dataTable)=>{
        const dataList = dataTable.rows();
        console.log(dataList);
        for(let name in dataList){
                console.log(name);
        }



 });