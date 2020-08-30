# Luxury Motors
This project is a web for buying luxury vehicles. In this application you can add vehicles, register with email and password, reset password by email that is being sent to your email, open chat rooms, real-time chat, cart, manage orders, manage users and so on. <br />
All pages are responsive. <br />
#### Home page
![home](https://github.com/tehilaamram/Luxury-Motors-MERN/blob/master/screenshots/home%20page.png)
<br />
#### Catalog page <br />
* Desktop <br /> <br />
![desktop view](https://github.com/tehilaamram/Luxury-Motors-MERN/blob/master/screenshots/catalog%20page%20-%20desktop.png)
<br /> <br />
* Tablet <br /> <br />
![tablet view](https://github.com/tehilaamram/Luxury-Motors-MERN/blob/master/screenshots/catalog%20page%20-%20tablet.png)
<br /> <br />
* Mobile <br /> <br />
<img src="https://raw.githubusercontent.com/tehilaamram/Luxury-Motors-MERN/master/screenshots/catalog%20page%20-%20mobile.png?token=AISN2FMQT432G74BK2ALGUK7JPSSW" data-canonical-src="https://github.com/tehilaamram/Luxury-Motors-MERN/blob/master/screenshots/catalog%20page%20-%20mobile.png" width="200" height="550" />
<br /> <br />
#### Sign in modal <br />
![sign in modal](https://github.com/tehilaamram/Luxury-Motors-MERN/blob/master/screenshots/sign%20in%20modal.png)
<br />
#### Cart page
<br /> <br />
![cart page](https://github.com/tehilaamram/Luxury-Motors-MERN/blob/master/screenshots/cart%20page.png)
<br /> <br />
#### Buy Process
<br /> <br />
![summary](https://github.com/tehilaamram/Luxury-Motors-MERN/blob/master/screenshots/buy%20process%20-%20summary.png)
<br/> <br/>
![payment](https://github.com/tehilaamram/Luxury-Motors-MERN/blob/master/screenshots/buy%20process%20-%20payment.png)
<br/><br/>
![done](https://github.com/tehilaamram/Luxury-Motors-MERN/blob/master/screenshots/buy%20process%20-%20done.png)
<br /> <br />
#### Chat Rooms
* Add Room
<br /> <br />
![new room](https://github.com/tehilaamram/Luxury-Motors-MERN/blob/master/screenshots/new%20chat%20room.png)
<br/><br/>
* Request to join room
<br/><br/>
![join room](https://github.com/tehilaamram/Luxury-Motors-MERN/blob/master/screenshots/join%20room%20user%20view.png)
<br/><br/>
* Manage requests
<br/><br/>
![manage requests](https://github.com/tehilaamram/Luxury-Motors-MERN/blob/master/screenshots/request%20join%20room%20management.png)
<br/><br/>
* Search in chat
<br/><br/>
![chat search](https://github.com/tehilaamram/Luxury-Motors-MERN/blob/master/screenshots/chat%20search.png)
<br/><br/>
#### Orders history page <br />
![history orders](https://github.com/tehilaamram/Luxury-Motors-MERN/blob/master/screenshots/orders%20history%20page.png)
<br/>
#### Manage orders page <br/>
![manage orders page](https://github.com/tehilaamram/Luxury-Motors-MERN/blob/master/screenshots/manage%20orders%20page.png)
<br/>
#### Add Vehicle page
![add vehicle](https://github.com/tehilaamram/Luxury-Motors-MERN/blob/master/screenshots/add%20vehicle%20page.png)
<br/>
#### Error page
![error](https://github.com/tehilaamram/Luxury-Motors-MERN/blob/master/screenshots/error%20page.png)
<br/>
## Run the project
### 1. Go to routes -> index.js <br />
#### Define email for reset password process
Write your Gmail email address at "serverEmailAddress" (line 9) <br />
Write your email password at "serverEmailPassword" (line 10) <br />
[routes/index.js](https://github.com/tehilaamram/Luxury-Motors-MERN/blob/master/routes/index.js) <br/>
At your email account security settings enable control access to less secure apps
### 2. Make sure that MongoDB service is running
### 3. Create new folder named "uploadedImages" in the root directory (same level as src, routes etc.)
### 4. Insert Vehicles to the DB `npm run addVehicles`
Run the helpscripts -> addVehicleList.js script
### 5. Insert Users to the DB `npm run addUsers`
Run the helpscripts -> addUsers.js script <br />
This script adds Admin user, if you register by the site you'll get a user permission, Change the email, name, or any othe field in that script as you want for your comfort. 
### 6. `npm run server_start`

Run the server side app: http://localhost:3010

### 7. `npm run client_start`

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
