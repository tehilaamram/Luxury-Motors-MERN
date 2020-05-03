import React from 'react';
import './style.css';
import AboutTitleImage from '../../images/about_title_background.png';
// import '../../css/variables.css';

class About extends React.Component {
    render() {
        console.log()
        return (
            <div className={"AboutContainer"}>
                <div className={"Title"}>
                    <img src={AboutTitleImage} className={"ImageTitle"} alt="about title background" />
                    <div className={"TitleText"}>
                        About Us
            </div>
                </div>
                <div className={"AboutBody"}>
                    <p className={"AboutMainText"}>
                        LUXURY MOTORS was founded following the need of our customers who demanded exclusive and exclusive luxury vehicles that are not imported to Israel regularly by the official importers, while emphasizing service and price lower than the prices of the official importers.
                    </p>
                    <p className={"AboutMainText"}>
                    In our company you can enjoy every pen from the renewal of the world of luxury cars to ensure you the most luxurious vehicles and set the highest level in the world of luxury cars and sports.
                    </p>
                    <p className={"AboutMainText"}>
                    LUXURY MOTORS has a professional and skilled team with decades of experience in the field of luxury and import vehicles of all types of vehicles, luxury vehicles that have just been launched, Kastom Bild SUVs, exotic sports vehicles and a large variety of vehicles.
                    </p>
                    <p className={"AboutMainText"}>
                    In our company you can enjoy personal import of new (or almost new) vehicles from Europe and the United States, with a large savings on the price of regular importers in Israel, and the possibility of importing non-standard models or luxury models that do not exist in Israel, By car dealerships in Israel and thus enjoy exclusive and unique designs only for you.
                    </p>
                    <p className={"AboutMainText"}>
                    LUXURY MOTORS is among the few companies that have received a personal import brokerage license from the Ministry of Transport, which guarantees the customer security, transparency and integrity.
                    </p>
                    <p className={"AboutMainText"}>
                    Another advantage in our company is the management of close and continuous ties for many years with car manufacturers and authorized suppliers in many countries around the world.
                    </p>
                    <p className={"AboutMainText"}>
                    Every customer of our company enjoys close accompaniment not only until the vehicle is received but much later, so it is no wonder that all of our customers become an integral part of the LUXURY MOTORS family and always welcome any request or problem of all our customers.
                    </p>
                </div>
            </div>
        );
    }
}

export default About;
