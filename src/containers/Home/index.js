import React from 'react';
import Video from '../../components/Video';
import SlideShow from '../../components/SlidesShow';
import MainImage from '../../images/home_page_vehicle.jpg';
import './style.css';

class Home extends React.Component {
    render() {
        return (
            <div className={"HomeContainer"}>
                <div className={"HomeMainImage"}>
                    <img className="HomeMainImageCSS" src={MainImage} alt="Smiley face" />
                    <div className="HomeImageText">Your road <br />
            to a new <br />level <br />
            starts here</div>
                </div>
                <div className={"HomeVideo"}>
                    <Video />
                </div>
                <div className={"HomeSlideShow"}>
                    <SlideShow />
                </div>
            </div>
        );
    }
}

export default Home;
