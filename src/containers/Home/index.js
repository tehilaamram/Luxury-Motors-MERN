import React from 'react';
import './style.css';
// import '../../css/variables.css';
// import {withRouter} from 'react-router-dom';
import Video from '../../components/Video';
import SlideShow from '../../components/SlidesShow';
import MainImage from '../../images/home_page_vehicle.jpg';
class Home extends React.Component {
    render() {
        console.log()
        return (
            <div className={"HomeContainer"}>
            <div className={"HomeMainImage"}>
            <img src={MainImage} alt="Smiley face" height="100%" width="100%"/> 
            <div className="HomeImageText">Your road <br/>
            to a new <br/>level <br/>
            starts here</div>
            </div>
            <div className={"HomeVideo"}>
            <Video/>
            </div>
            <div className={"HomeSlideShow"}>
            <SlideShow/>
            </div>
            </div>
          );
    }
}

export default Home;
