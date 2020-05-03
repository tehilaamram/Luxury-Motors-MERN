import React from 'react';
import './style.css';
class Video extends React.Component {
    cardImg;
    // constructor(props) {
    //     super(props);
    //     this.cardImg = require(this.props.)
    // }
    render() {
        return (
            <div className={"VehicleCard"}>
            <img src={this.props.imgUrl} alt="Avatar" className={"CardImage"}/>
            </div>
        );
    }
}

export default Video;





