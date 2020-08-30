# Luxury Motors
## Run the project
### 1. Go to routes -> index.js <br />
#### Define email for reset password process
Write your Gmail email address at "serverEmailAddress" (line 9) <br />
Write your email password at "serverEmailPassword" (line 10) <br />
At your email account security settings enable control access to less secure apps
### 2. Make sure that MongoDB service is running
### 3. Insert Vehicles to the DB `npm run addVehicles`
Run the helpscripts -> addVehicleList.js script
### 4. Insert Users to the DB `npm run addUsers`
Run the helpscripts -> addUsers.js script <br />
This script adds Admin user, if you register by the site you'll get a user permission, Change the email, name, or any othe field in that script as you want for your comfort. 
### 5. `npm run server_start`

Run the server side app: http://localhost:3010

### 6. `npm run client_start`

Run the client side app in development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser. <br/>

## Technologies
* JQuery: SlideShow component
* Socket.io: Chat
* Passport: User authentication
* Nodemailer: Reset password
* Media query: Responsive web application
* Material-UI: AppBar and other components
* MongoDB: Database
* React: Client side
* Node.js: Server side
* Axios: HTTP requests
* JavaScript: Programming language
* CSS: Design
* Cookie: Cart
* Session: HTTP requests authentication
