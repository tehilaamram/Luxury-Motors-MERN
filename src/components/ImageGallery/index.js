import React from 'react';
import ImageGallery from 'react-image-gallery';
import './style.css';
import FirstImage from '../../images/vehicle_1.png';


const images = [
  {
    original: FirstImage,
    thumbnail: FirstImage,
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];

class Gallery extends React.Component {
  render() {
    return <ImageGallery infinite={false} items={images} thumbnailPosition={"right"} showFullscreenButton={true} showBullets={true} showIndex={true} showPlayButton={false}/>;
  }
}

export default Gallery;