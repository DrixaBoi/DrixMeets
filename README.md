#DrixMeets

DrixMeets is a webapp that will provide the users with the ability to search for events happening in their own cities, or any cities they would like to search.

Events can also be added by users for others to view and attend.


Feature 2: As a user I should be able to click an event to either show, or hide the details of that specific event.

Scenario 1: An event element is collapsed by default. 
-Given the user hasn't tried clicking
-When events are available
-Then details will be hidden

Scenario 2: User can expand an event to see its details.
-Given the user had selected that event
-When the user clicked on the event
-Then details will be expanded

Scenario 3: User can collapse an event to hide its details.
-Given the user is was done with the event
-When the user clicked to collapse event
-Then details were once again hidden


Feature 3: Specify number of events.

Scenario 1: When a user hasn't specified a number, 32 is the default number.
-Given the user hadn't stated a number of events
-When they do not choose the amount of events
-Then the deafult will set to 32

Scenario 2: User can change the number of events they want to see.
-Given user wants to see a different amount of events
-When they change the amount they would like to view
-Then they are shown the amount they prefer


Feature 4: Use the app when offline.

Scenario 1: Show cached data when there's no internet connection.
-Given the user will be provided cached data
-When there is no internet connection
-Then the user can still view events offline

Scenario 2: Show error when user changes settings(city, time range)
-Given the user recieves an error
-When the user attempts to change settings offline
-Then an error will tell the user this isnt possible offline


Feature 5: Data Visualization.

Scenario 1: Show a chart with the number of upcoming events in each city.
-Given the user has requested upcoming events
-When they select the event to show a chart of each citys events
-Then a chart will display giving them upcoming events for each city
