import React from 'react';
import autoBind from 'react-autobind';

import './style.css';

class ImageViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedImageIndex: 0,
        };
        autoBind(this);
    }
    onSelect(index, event) {
        event.preventDefault();
        // console.log(selectedImageIndex);
        document.getElementById('vehicleImageViewer' + this.state.selectedImageIndex).className = '';
            document.getElementById('vehicleImageViewer' + index).className = 'active';
        // console.log(i);
        this.setState({
            selectedImageIndex: index,
        });
    }
    renderImages() {
        return (
            this.props.images.map((element, index) => {
                return (
                    <li id={'vehicleImageViewer' + index} key={index} onClick={this.onSelect.bind(this, index)} className="">
                        <div className="images-view-item">
                            <img  src={`data:image/jpeg;base64,${element.image}`} alt="vehicle"/>
                        </div>
                    </li>
                );
            })
        );
       
    }
    render() {
        const { images } = this.props;
        const { selectedImageIndex } = this.state;
        // console.log(this.props.images, ' props of image viewer');
        // console.log(this.props.images[selectedImageIndex], ' img');
        return (
            <div className="image-viewer">
                <div className="image-view-magnifier-wrap">
                {images !== undefined && images.length > 0 && 
                 <img alt="vehicle" className="magnifier-image" src={`data:image/jpeg;base64,${this.props.images[selectedImageIndex].image}`} 
                // style="top: 0px; left: 0px; width: 100%; height: auto;"
                />}
                    {/* <div id="magnifier-image" className="magnifier-cover" data-spm-anchor-id="a2g0o.detail.1000017.i0.1af71b40GsAS38"></div> */}
                </div>
                <div className="images-view-wrap">
                    <ul className="images-view-list">
                        {this.renderImages()}
                        
                    </ul>
                </div>
            </div>
        );
    }
}

export default ImageViewer;
