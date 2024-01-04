// import utilityMethods from "./utilityMethods.js"

// (async () => {
//     const browserController = new utilityMethods();
//     try {
//       await browserController.launchBrowser();
//       const page = await browserController.createPage();
//       await browserController.loginPage(page);
//       await browserController.create_Delete_Notes(page);
//       await browserController.logout(page);      
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//        await browserController.closeBrowser();
//     }
//   })();