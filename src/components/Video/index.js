import React from 'react';
import './style.css';
// import startVideo from "../../videos/video.mp4";
import startVideo from "./video.mp4";

class Video extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <video width="100%" height="100%" autoPlay controls loop={true} muted={true} data-reactid=".0.1.0.0">
                <source type="video/mp4" data-reactid=".0.1.0.0.0" src={startVideo} />
            </video>
        );
    }
}

export default Video;





