@unicorn
Feature: Verify user is able to make a new deal on Unicorn app

    Scenario: make a valid new property deal
        Given user navigates to unicorn app
        Then unicorn "Login" page should appear
        When unicorn user enters correct username "test@test.com" and password "test"
        And unicorn user clicks "Sign In" button
        Then unicorn "Welcome" page should appear
        When unicorn user enters new property address and deal number
        And unicorn user selects transaction type as "Sale"
        And unicorn user clicks "Create New" button
        Then unicorn "Deal Details" page should appear
        When unicorn user selects property type as "Commercial Land"
        And unicorn user selects payment type as "Cash+Finance"
        And enters Loan amount as "600"
        And unicorn user selects date range as:
            | Booking_date      | 12-01-2023 |
            | Deal_closing_date | 12-01-2024 |
        And unicorn user enters deal agent name as "Peter"
        And unicorn user uploads property photo
        And unicorn user clicks "submit" button
        Then unicorn preview popup should appear
        When unicorn user clicks "Preview" button
        Then unicorn "Preview Details" page should appear
        Then unicorn user verifies folowing details on preview page:
            | Deal_Number       | 55555           |
            | Property_Type     | Commercial Land |
            | Transaction_Type  | Sale            |
            | Booking_date      | Dec 1, 2023     |
            | Deal_closing_date | Dec 1, 2024     |
            | Deal_Agent        | Peter           |




