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
    intervalId;
    componentDidMount() {
        // window.
        $("#slideshow > div:gt(0)").hide();

        this.intervalId = setInterval(function () {
            $('#slideshow > div:first')
                .fadeOut(1000)
                .next()
                .fadeIn(1000)
                .end()
                .appendTo('#slideshow');
        }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
      }

    render() {
        return (
            <div id="slideshow">
                <div>
                    <img src={FirstImage} alt={"vehicle1"} className="SlideShowImg"/>
                </div>
                <div>
                    <img src={SecondImage} alt={"vehicle2"} className="SlideShowImg" />
                </div>
                <div>
                <img src={ThirdImage} alt={"vehicle3"} className="SlideShowImg" />
                </div>
            </div>
        );
    }
}

export default SlideShow;