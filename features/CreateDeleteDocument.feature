Feature: create and delete document

# Background: 
# Given user navigates to box app
# Then "Box Login" page should appear
# When user enters correct username and password
# And clicks on login button
# Then "All Files" page should appear

@test
Scenario: Create and Delete the Document
Given user navigates to box app
Then "Box Login" page should appear
When user enters correct username "lokesh.nemade@yash.com" and password "Lokesh@123"
And clicks on login button
# Then "All Files" page should appear
When User clicks on Menu button
When User create the document 
And clicks on create document button
Then WordDocument created Message Should Displayed
# When user clicks on account menu button
# And logouts from app
# Then "Box Login" page should appear
# When user selects newly created document row
# And user clicks on Trash button
# # Then successful deletion message should appear



Scenario: Delete the word Document
Given user navigates to box app
Then "Box Login" page should appear
When user enters correct username "lokesh.nemade@yash.com" and password "Lokesh@123"
And clicks on login button
When user selects newly created document row
And user clicks on Trash button
Then successful deletion message should appear
