#Author       :  Yash
#Scenario     :  Verify Left Side Bar Links from Box app
#Application  :  Box
Feature: Verify Left Side bar links

    @boxleftsidebar @all
    Scenario: Verify Left Side bar links
        Given user navigates to box app
Then "Box | Login" page should appear
When user enters correct username "qacult.demo@gmail.com" and password "testing123"
        And clicks on login button
        Then "All Files" page should appear
        When user verifies the following left sidebar links:
            | All Files |
            | Recents   |
            | Synced    |
            | Trash     |
            | Notes     |
        When user clicks on account menu button
        And logouts from app
Then "Box | Login" page should appear