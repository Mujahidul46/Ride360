📝 Note:
Use ng bootstrap docs for styling: https://ng-bootstrap.github.io/#/home

🚀 Work on NEXT: 
- fix bug where user cant create a ride with just ride name , despite other inputs intended to be optional
- Need to alter the implementation of the timer. The current issue is that when the app has been closed, or the user has turned their phone off for few minutes, the current timer pauses. This is because browsers stop client-side activity to preserve battery 
Solution: Need to store the startRide time on the server, and when the app is closed and reopened, the app chekcs if there is an active ride, if so then the client calculates the current time (currentTime = newDate().getTime()) and does currentTime-startTime and the client displays this value
- T feedback : edit and delete rides (name / description / rating), have a map for replaying your ride
- Add to Ride model category (e.g., "Commute", "Leisure", "Work", "Errand", "Travel", "Motorway", "Twisty Roads", "Urban", "Off-road/Trail", "Scenic Route")
- add calendar for rides view, with text at bottom saying user can click on day to view rides
- remove logout from bottom nav, and add user icon and put logout there.
- add user section where they can put bike name, add friends, and log out of account
- potentially include total riding duration on rides screen, just like how we had total expenses
// TO DO for rides screen:
    // <p>Rides page</p>
    // <p>- Cards go here</p>
    // <p>- Calendar goes here</p>
    // <p>users can click into a ride to see photos and stats</p>
    // can have ride categories when saving ride, e.g. city/country/track (useful as we can show stats for this later). also
    // separate section on ride card for if you were a pillion
- need to add to User model: profile picture, motorbike models, motorbike names, motorbike pictures

🚀 Work on: 
- secure endpoints by making sure users cant access other user's ids, add a check which looks at the userId of the JWT token passed to the endpoint. If the rideId the user is trying to access is not one of their own rideIds, then block them.
- Research how GPS monitoring will work
- Research what the UI will look like - possibly a calendar similar to StepUp, with a motorbike icon on each day where there is 1 or more rides. 
Days with zero rides have no motorbike logo. The user can tap on this motorbike. Let's say it's 3, representing 3 separate rides. Then the user can click into the specific
ride they are looking for (ordered by time with most recent at the top). Then the user can view statistics for that ride, such as top speed, average speed,
ride duration, time ride started and time ride ended, and any short breaks - maybe a timeline can represent this visually. If there is only 1 ride, it goes straight into the statistics of that ride, rather than showing a singular ride you can tap into. For inspiration on statistics, look into Strava.
- Another feature idea is online sharing with other users - can create riding groups, users can create a profile with their bike name and picture, and users can get a riding style profile based on how they ride
- Upload Photos feature
- New feature: Slow speed motorcycle drill practice. E.g. U-Turn 0/10. Gamified with Exp to motivate users to practise.

Backlog:
rider wrapped - end of year recap
-how many rides 
-total distance
-how many people you wrode with 
-possible integration with Spotify to upload playlists???
-new locations you visited
-total locations
- how many commutes 

DONE:
- Need start ride & stop ride button
- reuse expense card logic 
- be able to click cancel on save ride
- remove start stop ride text and centre button and get ai to style
- also fix formatting of cards and get ai to style
- fix bug when description (and possilby ride name) is one word and very long, it doesnt wrap to next line
- add link to Waze and maps after start ride (beyya idea)