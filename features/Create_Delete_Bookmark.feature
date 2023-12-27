Feature: create and delete bookmark


Scenario: Create the bookmark
Given User is on HomePage
When User clicks on Menu button
And clicks on bookmark button
Then User will enter bookmark details
And User clicks on CreateBookmarkButton  
Then BookMarkCreated Message Should Displayed

@testBookMark
Scenario: Delete Bookmark
Given User is on HomePage
And Selected BookMark Should be deleted
And BookMark deleted message should appear on screen