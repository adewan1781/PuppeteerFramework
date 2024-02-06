Puppeteer and cucumber
First verify nodejs is installed on system.
node version should be latest
then go to project directory and >npm init
npm install --save-dev puppeteer
npm install --save-dev @cucumber/cucumber
then include in package.json
  "type": "module",
Install Cucumber(Gherkin) Full Support Extension in VSCode

In VSCode to open Terminal
Step-1 Control+Shift+P
Step-2 In Command Pallete select "Terminal:Select Default Profile" 
Step-3 Then select "Command Prompt"
Step-4 Restart VSCode
Step-5 Goto view and select terminal

Then in Terminal run Command 
For Box app
.\node_modules\.bin\cucumber-js --tags @login -f json:report/cucumber_report.json -f html:report.html
.\node_modules\.bin\cucumber-js --tags @boxall -f json:report/cucumber_report.json -f html:report.html
For unicorn app
.\node_modules\.bin\cucumber-js --tags @unicorn -f json:report/cucumber_report.json -f html:report.html


