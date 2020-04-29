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
            <div className={"MainImage"}>
            <img src={MainImage} alt="Smiley face" height="100%" width="100%"/> 
            <div className="ImageText">Your road <br/>
            to a new <br/>level <br/>
            starts here</div>
            </div>
            <div className={"Video"}>
            <Video/>
            </div>
            <div className={"SlideShow"}>
            <SlideShow/>
            </div>
            </div>
          );
    }
}

export default Home;
