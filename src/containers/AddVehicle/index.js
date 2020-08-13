import React from 'react';
import autoBind from 'react-autobind';
import _ from 'lodash';
import FormData from 'form-data'

import './style.css';
import { MAKER, TRANSMISSION, VEHICLE , MODEL_TO_MANUFACTURER} from '../../helpers/consts';
import ImageUpload from '../../components/ImageUpload';
import TextInput from '../../components/TextInput';
import Picker from '../../components/Picker';
import Button from '../../components/Button';
import AjaxService from '../../services/AjaxService';
class AddVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            model: 'A4',
            make: MAKER[0],
            year: 2020,
            color: 'black',
            doors: 2,
            transmission: TRANSMISSION[0],
            mainImage: '',
            additionalImages: [],
            seats: 2,
            modelsList:['A4','A5','A6','Q5','SQ5','Q7','Q8'],
        }
        autoBind(this);
    }

    onModelChange(event) {
        this.setState({model: event});
    }

    onMakeChange(event) {
        let list = [];
        MODEL_TO_MANUFACTURER.forEach((item)=>{
            if(item.manufacturer === event.toLowerCase())
                list = item.models
        });
        this.setState({make: event, modelsList: list});
    }

    onYearChange(event) {
        this.setState({year: event.target.value});
    }

    onColorChange(event) {
        this.setState({color: event.target.value});
    }

    onDoorsChange(event) {
        this.setState({doors: event.target.value});
    }

    onSeatsChange(event) {
        this.setState({seats: event.target.value});
    }

    onTransmissionChange(event) {
        this.setState({transmission: event});
    }

    onMainImageChange(event) {
        this.setState({mainImage: _.cloneDeep(event)});
    }

    onAdditionalImagesChange(event) {
        this.setState({additionalImages: _.cloneDeep(event)});
    }

    save() {
        if (
            this.state.year === ''||
            this.state.doors===''||
            this.state.mainImage===''||
            this.state.additionalImages===[]||
            this.state.seats===''
        ) {
            alert('Fill all records');
        } else {
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

            AjaxService.post('/vehicle/addVehicle', data, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then((res) => {
                this.props.history.push(`/vehicle/${res.data.id}`);
            }).catch((err) => {
                console.log(err, ' add vehicle save error');
            });
        }
    }

    render() {
        return (
            <div className={"AddVehicleContainer"}>
                <div className="AddVehicleDetailsContainer">
                    <Picker id={"maker"} text={"Maker"} valueChanged={this.onMakeChange} list={MAKER}/>
                    <Picker id={"model"} text={"Model"} list={this.state.modelsList} valueChanged={this.onModelChange}/>
                    <TextInput id={"year"} text={"Year"} type={"number"} onChange={this.onYearChange}
                               value={this.state.year} min={2000} max={2020}/>
                    <TextInput id={"color"} text={"Color"} type={"color"} onChange={this.onColorChange}
                               value={this.state.color}/>
                    <TextInput id={"doors"} text={"Doors"} type={"number"} onChange={this.onDoorsChange}
                               value={this.state.doors}/>
                    <Picker id={"transmission"} text={"Transmission"} list={TRANSMISSION}
                            valueChanged={this.onTransmissionChange}/>
                    <TextInput id={"seats"} text={"Seats"} type={"number"} onChange={this.onSeatsChange}
                               value={this.state.seats}/>

                </div>
                <div className="AddVehicleUploadImagesContainer">
                    <ImageUpload onValueChanged={this.onMainImageChange} buttonText={"Upload Main Image"}
                                 singleImage={true}/>
                    <ImageUpload onValueChanged={this.onAdditionalImagesChange} buttonText={"Upload Additional Images"}
                                 singleImage={false}/>
                </div>
                <div className="AddVehicleButton">
                    <div className="SaveBottonAddVehicle">
                        <Button css={"PrimaryButton"} title={"Save"} onClick={this.save}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddVehicle;