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
                <div className="VehicleCardHeader">
                    <img src={this.props.imgUrl} alt="Avatar" className={"VehicleCardImage"} />
                </div>
                <div className="VehicleCardBody">
                </div>
                <div className="VehicleCardFooter">
                </div>
            </div>
        );
    }
}

export default Video;





