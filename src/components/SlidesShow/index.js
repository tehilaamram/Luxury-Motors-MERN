import React from 'react';
import './style.css';
import FirstImage from '../../images/vehicle_1.png';
import SecondImage from '../../images/vehicle_2.jpg';
import ThirdImage from '../../images/vehicle_3.png';
import $ from "jquery";

class SlideShow extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    componentDidMount() {
        // window.
        $("#slideshow > div:gt(0)").hide();

        setInterval(function () {
            $('#slideshow > div:first')
                .fadeOut(1000)
                .next()
                .fadeIn(1000)
                .end()
                .appendTo('#slideshow');
        }, 3000);
    }

    render() {
        return (
            <div id="slideshow">
                <div>
                    <img src={FirstImage} alt={"vehicle1"} height="100%" width="100%" />
                </div>
                <div>
                    <img src={SecondImage} alt={"vehicle2"} height="100%" width="100%" />
                </div>
                <div>
                <img src={ThirdImage} alt={"vehicle3"} height="100%" width="100%" />
                </div>
            </div>
        );
    }
}

export default SlideShow;