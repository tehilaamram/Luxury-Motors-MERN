import React from 'react';
import './style.css';

class About extends React.Component {
    render() {
        return (
            <div className={"AboutContainer"}>
                <div className={"AboutBody"}>
                    <h1 className="H1Title">About Us</h1>
                    <p className="AboutDescription">I'm on a mission to make this site the best one i can.</p>
               <h2 className="H2Title">Our Mission</h2>
               <p className="PTag">Our company is focused on making buying process of luxury vehicles easier, faster and online.</p>
               <h2 className="H2Title">Our Vision</h2>
               <p className="PTag">Our vision is to provide the best online shopping experience just as any othe pro service.</p>
               <h2 className="H2Title">Our Story</h2>
               <p className="PTag">Luxury Motors was founded by Tehila Amram as part of software engineering to the internet course at her fourth and last year of her graduation.<br/>
             This project was built by using a wide range of technologies as: <br/>
             For client side: React  <br/>
             For server side: Node.js  <br/>
             For users authentication: Passport  <br/>
             For database: MongoDB  <br/>
             For chat and comments: Socket.io  <br/>
             For PWA: Media query  <br/>
             and others like: JQuery, axios  <br/>
             </p>
                </div>
            </div>
        );
    }
}

export default About;
