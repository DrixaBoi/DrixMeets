Feature: Show or Hide an events details

Scenario: An event element is collapsed by default.
    Given the user has main page open
    When events are available
    Then details will be hidden.

Scenario: User can expand an event to see its details.
    Given the user had selected that event
    When the user clicked on the event
    Then details will be expanded.

Scenario: User can collapse an event to hide its details.
    Given the user is done with the event
    When the user clicked to collapse event
    Then details were once again hidden.