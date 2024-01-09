@login @all
Feature: login action


Scenario: valid login
Given user navigates to box app
Then "Box | Login" page should appear
When user enters correct username "qacult.demo@gmail.com" and password "testing123"
And clicks on login button
Then "All Files" page should appear
When user clicks on account menu button
And logouts from app
Then "Box | Login" page should appear

Scenario: invalid login
Given user navigates to box app
Then "Box | Login" page should appear
When user enters wrong username "abcdefgh@xyz.com" and password "zxcvbbnm"
And clicks on login button
Then error message should appear

