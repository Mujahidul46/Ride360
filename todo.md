📝 Note:
Use ng bootstrap docs for styling: https://ng-bootstrap.github.io/#/home

🚀 Work on next: 
- secure endpoints by making sure users cant access other user's ids, add a check which looks at the userId of the JWT token passed to the endpoint. If the rideId the user is trying to access is not one of their own rideIds, then block them.
- Research how GPS monitoring will work
- Need start ride & stop ride button
- Research what the UI will look like - possibly a calendar similar to StepUp, with a motorbike icon on each day where there is 1 or more rides. 
Days with zero rides have no motorbike logo. The user can tap on this motorbike. Let's say it's 3, representing 3 separate rides. Then the user can click into the specific
ride they are looking for (ordered by time with most recent at the top). Then the user can view statistics for that ride, such as top speed, average speed,
ride duration, time ride started and time ride ended, and any short breaks - maybe a timeline can represent this visually. If there is only 1 ride, it goes straight into the statistics of that ride, rather than showing a singular ride you can tap into. For inspiration on statistics, look into Strava.
- Another feature idea is online sharing with other users - can create riding groups, users can create a profile with their bike name and picture, and users can get a riding style profile based on how they ride
- Upload Photos feature
- New feature: Slow speed motorcycle drill practice. E.g. U-Turn 0/10. Gamified with Exp to motivate users to practise.
