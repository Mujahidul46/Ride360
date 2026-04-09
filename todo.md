📝 Note:
Use ng bootstrap docs for styling: https://ng-bootstrap.github.io/#/home

🚀 Work on next: 
- Research how GPS monitoring will work
- Research what UI will look like - possibly a calendar similar to StepUp, and there is a motorbike on each day where there is 1 or more ride. 
zero rides have no motorbike logo. User can tap on this motorbike. Lets say it's 3 representing 3 separate rides. then user can click into the specific
ride they are looking for (ordered by time with most recent at the top). Then user can view statistics for that ride, such as top speed, average speed,
ride duration, time ride started and time ride ended and any short breaks - maybe a timeline can represent this visually easily. If there is only 1 ride, it goes straight into the statistics of that ride, rather than showing a singular ride you can tap into.
- another feature idea is online sharing with other users - can create riding groups, users can create profile with their bike name, picture, user can get riding style profile based on how they ride

probs need to block updating expense whilst it calculates
see frictionless-ux-ideas.txt

📋 TO DO:
User may want to add notes to expenses, currently it will be filtered out
❌ Create repository layer which talks to db
❌ add middleware OR refresh endppint which refreshes token on every api request so user never redirected to login if they are using app. only way they redirected is if inactive ( no http requests ) for 60 mins. use docs to learn proper way , ai is confused


💡 Development Ideas:
❌ Use playwright mcp for writing acceptance tests
❌ Generate monthly develop reports to review achievements
❌ Make commits trigger a pipeline which automatically runs tests

✨ Cool features to implement:

LEARNING:
- confusing methods, add bunch of comments. use feynam technique. rewrite it until its perfect.


Learning notes:

- unit tests: call controller methods directly. Test business logic in isolation. Very fast. Write lots, and cover all edge-cases.
var controller = new AuthController(db, config);
var response = await controller.SignUp(dto); // Direct method call

- integration tests: test full HTTP pipeline (request → routing → validation → controller → response). Slower than unit tests, so write fewer - only for critical paths.
Integration tests test that all the pieces work together correctly.
var client = new HttpClient();
var response = await client.PostAsync("/auth/signup", jsonContent); // Real HTTP request


####### setup instructions #####

- need hugging face api key for smart categorisation
- need jwt token for auth
