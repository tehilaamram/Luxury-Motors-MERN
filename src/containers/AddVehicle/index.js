import React from 'react';
import autoBind from 'react-autobind';
import _ from 'lodash';
import FormData from 'form-data'

import './style.css';
import { MAKER, TRANSMISSION, VEHICLE } from '../../helpers/consts';
import ImageUpload from '../../components/ImageUpload';
import TextInput from '../../components/TextInput';
import Picker from '../../components/Picker';
import Button from '../../components/Button';
import AjaxService from '../../services/AjaxService';
class AddVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      model: '',
      make: MAKER[0],
      year: 2020,
      color: 'black',
      doors: 2,
      transmission: TRANSMISSION[0],
      mainImage: '',
      additionalImages: '',
      seats: 2,
      price: 0,
      quantity: 0,
    }
    autoBind(this);
}
onModelChange(event) {
  this.setState({ model: event.target.value });
}
onMakeChange(event) {
  this.setState({ make: event });
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
onSeatsChange(event) {
  this.setState({ seats: event.target.value });
}
onTransmissionChange(event) {
  this.setState({ transmission: event });
}
onMainImageChange(event) {
  console.log(event);
  this.setState({ mainImage: _.cloneDeep(event) });
}
onAdditionalImagesChange(event) {
  this.setState({ additionalImages: _.cloneDeep(event) });
}
onPriceChange(event) {
  this.setState({
    price: event.target.value,
  });
}
onQuantityChange(event) {
  this.setState({
    quantity: event.target.value,
  });
}
save() {
console.log(this.state);
let data = new FormData();
data.append('file', this.state.mainImage[0], 'main');
this.state.additionalImages.forEach(element => {
  data.append('file', element, element.name);
});
data.append(VEHICLE.MODEL, this.state.model);
data.append(VEHICLE.MAKER, this.state.make);
data.append(VEHICLE.DOORS, this.state.doors);
data.append(VEHICLE.TRANSMISSION, this.state.transmission);
data.append(VEHICLE.COLOR, this.state.color);
data.append(VEHICLE.YEAR, this.state.year);
data.append(VEHICLE.SEATS, this.state.seats);
data.append("price", this.state.price);
data.append("quantity", this.state.quantity);

AjaxService.post('/vehicle/addVehicle', data , {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
  this.props.history.push(`/vehicle/${res.data.id}`);
}).catch((err) => {
  console.log(err, ' add vehicle save error');
});
}
  render() {
    return (
        <div className={"AddVehicleContainer"}>
        <div className="AddVehicleDetailsContainer">
        <TextInput id={"model"} text={"Model"} type={"text"} onChange={this.onModelChange} value={this.state.model} />
        <Picker id={"maker"} text={"Maker"} valueChanged={this.onMakeChange} list={MAKER} />
        <TextInput id={"year"} text={"Year"} type={"number"} onChange={this.onYearChange} value={this.state.year}/>
        <TextInput id={"color"} text={"Color"} type={"color"} onChange={this.onColorChange} value={this.state.color} />
        <TextInput id={"doors"} text={"Doors"} type={"number"} onChange={this.onDoorsChange} value={this.state.doors} />
        <Picker id={"transmission"} text={"Transmission"} list={TRANSMISSION} valueChanged={this.onTransmissionChange} />
        <TextInput id={"seats"} text={"Seats"} type={"number"} onChange={this.onSeatsChange} value={this.state.seats} />
        <TextInput id={"price"} text={"Price"} type={"number"} onChange={this.onPriceChange} value={this.state.price} />
        <TextInput id={"quantity"} text={"Quantity"} type={"number"} onChange={this.onQuantityChange} value={this.state.quantity} />

        </div>
        <div className="AddVehicleUploadImagesContainer">
        <ImageUpload onValueChanged={this.onMainImageChange} buttonText={"Upload Main Image"} singleImage={true}/>
        <ImageUpload onValueChanged={this.onAdditionalImagesChange} buttonText={"Upload Additional Images"} singleImage={false}/>
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