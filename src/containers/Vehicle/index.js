import React from 'react';
import autoBind from 'react-autobind';

import './style.css';

import ImageUpload from '../../components/ImageUpload';
import TextInput from '../../components/TextInput';
import Picker from '../../components/Picker';
import Button from '../../components/Button';
class AddVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: '',
      make: '',
      year: 2020,
      color: '',
      doors: 2,
      transmission: '',
    }
    autoBind(this);
}
onModelChange(event) {
  this.setState({ model: event.target.value });
}
onMakeChange(event) {
  this.setState({ make: event.target.value });
}
onYearChange(event) {
  this.setState({ year: event.target.value });
}
onColorChange(event) {
  this.setState({ color: event.target.value });
}
onDoorsChange(event) {
  this.setState({ doors: event.target.value });
}
onTransmissionChange(event) {
  this.setState({ transmission: event.target.value });
}
save() {

}
  render() {
    return (
        <div className={"AddVehicleContainer"}>
        <div className="AddVehicleDetailsContainer">
        <TextInput id={"model"} text={"Model"} type={"text"} onChange={this.onModelChange} value={this.state.model} />
        <TextInput id={"make"} text={"Make"} type={"text"} onChange={this.onMakeChange} value={this.state.make} />
        <TextInput id={"year"} text={"Year"} type={"number"} onChange={this.onYearChange} value={this.state.year} min={2000} max={2020}/>
        <TextInput id={"color"} text={"Color"} type={"color"} onChange={this.onColorChange} value={this.state.color} />
        <TextInput id={"doors"} text={"Doors"} type={"number"} onChange={this.onDoorsChange} value={this.state.doors} />
        <Picker id={"transmission"} text={"Transmission"} type={""} onChange={this.onTransmissionChange} value={this.state.transmission} />
        <TextInput id={"fullName"} text={"Capacity"} type={"text"} onChange={this.onFullNameChange} value={this.state.fullName} />

        </div>
        <div className="AddVehicleUploadImagesContainer">
        <ImageUpload buttonText={"Upload Main Image"} singleImage={true}/>
        <ImageUpload buttonText={"Upload Additional Images"} singleImage={false}/>
        </div>
        <div className="AddVehicleButton">
        <div className="SaveBottonAddVehicle">
        <Button css={"PrimaryButton"} title={"Save"} onClick={this.save} />
        </div>
        </div>
         </div>
      );
  }
}

export default AddVehicle;