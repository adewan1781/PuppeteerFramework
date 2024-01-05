@cdfolder
Feature: create delete folder in box app

Background: 
Given user navigates to box app
Then "Box | Login" page should appear
When user enters correct username "qacult.demo@gmail.com" and password "testing123"
And clicks on login button
Then "All Files" page should appear

Scenario: Folder create annd delete action
When user clicks on "New" button
And user clicks on "Create Folder" link
Then new folder popup should open
When user inputs new folder name with "new_folder" and random text
And selects permission as "Viewer"
And user clicks on "Create" button
Then successful "folder creation" message should appear
And user closes notification message
When user selects newly created folder row
And user clicks on "Trash" button
And user clicks "Ok" button to confirm action
Then successful "deletion" message should appear
And user closes notification message
When user clicks on account menu button
And logouts from app
Then "Box | Login" page should appear