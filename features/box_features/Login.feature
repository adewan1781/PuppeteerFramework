@login @boxall
Feature: valid and invalid login action


    Scenario Outline: valid login
        Given user navigates to box app
        Then "Box | Login" page should appear
        When user enters correct username "<username>" and password "<password>"
        And clicks on login button
        Then "All Files" page should appear
        When user clicks on account menu button
        And logouts from app
       Then "Box | Login" page should appear
        Examples:
            | username              | password   |
            | qacult.demo@gmail.com | testing123 |
            | pfighter@gmail.com    | axa12345   |


    Scenario: invalid login
        Given user navigates to box app
        Then "Box | Login" page should appear
        When user enters wrong username "abcdefgh@xyz.com" and password "zxcvbbnm"
        And clicks on login button
        Then error message should appear

