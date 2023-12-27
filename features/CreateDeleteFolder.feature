@cdfolder
Feature: create delete folder


Scenario: Folder action
Given user navigates to box app
Then "Box Login" page should appear
When user enters correct username and password
And clicks on login button
Then "All Files" page should appear
# When user clicks on Menu button
# And clicks on bookmark button
# Then User will enter bookmark details
# And User clicks on CreateBookmarkButton  
# Then BookMarkCreated Message Should Displayed