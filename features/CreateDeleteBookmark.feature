@bookmark @all
Feature: create and delete bookmark in box app

Background: 
Given user navigates to box app
Then "Box | Login" page should appear
When user enters correct username "qacult.demo@gmail.com" and password "testing123"
And clicks on login button
Then "All Files" page should appear

Scenario: Create/delete bookmark action
When user clicks on "New" button
And user clicks on "Create Bookmark" link
Then new bookmark popup should open
When user inputs new bookmark name with "new_bookmark" and random text
And user enter name and description as "new_bookmark"
And user clicks on "Create" button
Then successful "bookmark creation" message should appear
And user closes notification message
When user selects newly created bookmark row
And user clicks on "Trash" button
And user clicks "Ok" button to confirm action
Then successful "deletion" message should appear
And user closes notification message
When user clicks on account menu button
And logouts from app
Then "Box | Login" page should appear