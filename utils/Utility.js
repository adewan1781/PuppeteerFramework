import puppeteer from 'puppeteer';
class Utility {
      async sleep(milliseconds) {
            return new Promise(resolve => setTimeout(resolve, milliseconds));
      }
}
export default Utility;