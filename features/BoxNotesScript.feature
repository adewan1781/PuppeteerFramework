@BoxNotes
Feature: create delete Notes in the box app

Background: 
Given user navigates to box app
Then "Box Login" page should appear
When user enters correct username "qacult.demo@gmail.com" and password "testing123"
And clicks on login button
Then "All Files" page should appear

Scenario: Notes create and delete action
When user clicks on Notes button in left side bar
Then "Box Notes" page should appear
When user create a new note
And user rename the title "notes_test"
Then "notes_test" page should appear
When user clicks on options button
And delete the newly created note
Then successful "deletion" message should appear
When user closes the current page
Then "All Files" page should appear
When user clicks on account menu button
And logouts from app
Then "Box Login" page should appear