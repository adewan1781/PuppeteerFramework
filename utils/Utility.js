import puppeteer from 'puppeteer';
class Utility {
      static async sleep(milliseconds) {
            // console.log("sleeping");
            return new Promise(resolve => setTimeout(resolve, milliseconds));
      }
}
export default Utility;