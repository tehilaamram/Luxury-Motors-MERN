import React from 'react';
import './style.css';

class IconText extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className="IconTextContainer">
                <div className="IconTextImgDiv">
                <img src={this.props.imgUrl} alt="Vehicle" className={"IconTextImgDiv"} />
                </div>
                <div className="IconTextLabel">
                {this.props.text}
                </div>
            </div>
        );
    }
}

export default IconText;