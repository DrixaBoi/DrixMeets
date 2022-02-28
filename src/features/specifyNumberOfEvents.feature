Feature: Specify number of events.

Scenario: When a user hasn`t specified a number thirty-two will be the default number.
    Given the user hadn't stated a number of events
    When they do not choose the amount of events
    Then the default will set to thirty-two.

Scenario: User can change the number of events they want to see.
    Given user wants to see a different amount of events
    When they change the amount they would like to view
    Then they are shown the amount they prefer.