# Counter

requires Node

1. Setup environment
   - clone repo
   - open terminal
   - navigate to repo folder
   - `npm install` to set up environment

2. start up express server
   - navigate to `/src/server`
   - `node server.js` to start up server
   - server is listening on port 3000

2. serve up counter application
   - open another terminal
   - navigate to the repo folder
   - for this local development environment, a proxy configuration is used to point to the express server
   	 - calls to /api/* -> localhost:3000
   - simply run `npm start`
   - application is served on port 4200
   - open localhost:4200 in browser

3. login
   - username : tbrady12
   - password : thegoat12

## APIs

* login
  - authenticates user
  - create jwt for authorization
    - the following api calls are authenticated using this token
    - token stored as cookie, expires when browsing session ends
    - returned to login page if authentication fails
* getCount
  - gets initial count value
    - count value exists in the backend
    - count resets to zero when the server is reset
* getIncrement
  - formula creates new next value based on count value
* setIncrement
  - count value is updated as the next value
