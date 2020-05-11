import React from 'react';
import ImageGallery from 'react-image-gallery';
import './style.css';


class Gallery extends React.Component {
  render() {
    return <ImageGallery stopPropagation={true} useTranslate3D={false} infinite={true} items={this.props.imageList} thumbnailPosition={"bottom"} showFullscreenButton={true} showBullets={true} showIndex={true} showPlayButton={false}/>;
  }
}

export default Gallery;