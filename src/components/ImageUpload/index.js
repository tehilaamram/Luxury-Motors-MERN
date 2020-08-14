import React from 'react';
import ImageUploader from 'react-images-upload';

class ImageUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
            pictures: pictureFiles
        });
        this.props.onValueChanged(pictureFiles);
    }

    render() {
        return (
            <ImageUploader
            style={{ margin: "0 0 10px 0" }}
                withIcon={true}
                buttonText={this.props.buttonText}
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif', '.jpeg']}
                maxFileSize={5242880}
                withPreview={true}
                singleImage={this.props.singleImage}
            />
        );
    }
}

export default ImageUpload;
