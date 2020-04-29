import React from 'react';
import './style.css';
import SelectField from '../../components/SelectField'
import {AREA, MANUFACTURER, MODEL_TO_MANUFACTURER, ENGINE_TYPE, GEARBOX} from '../../consts/vehicle'
import axios from 'axios';
// import images from '../../images/vehicle-logo/acura.webp'

class AddVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: '',
            area: '',
            manufacturer: '',
            model: '',
            color:'#FFFFFF',
            engineCapacity:'',
            seats: '',
            engineType: '',
            image: '',
            isModelsDisabled: true,
            modelsList:[],
        };
        this.onAreaChange = this.onAreaChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onManufacturerChange = this.onManufacturerChange.bind(this);
        this.onModelChange = this.onModelChange.bind(this);
        this.onColorChange = this.onColorChange.bind(this);
        this.onEngineCapacityChange = this.onEngineCapacityChange.bind(this);
        this.onSeatsChange = this.onSeatsChange.bind(this);
        this.onEngineTypeChange = this.onEngineTypeChange.bind(this);
        this.onGearboxChange = this.onGearboxChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.putDataToDB = this.putDataToDB.bind(this);
    }
    onAreaChange(area1){
        this.setState({area: area1});
    }
    onTextChange(number1){
        this.setState({number: number1.target.value});
    }
    onManufacturerChange(manufacturer1){
        if(manufacturer1 !== 'Choose option')
        {
            var list=[];
            MODEL_TO_MANUFACTURER.forEach((item)=>{
                console.log(manufacturer1.toLowerCase());
                console.log(item.manufacturer);
                if(item.manufacturer === manufacturer1.toLowerCase())
                    list = item.models

            });
            this.setState({manufacturer: manufacturer1,
                modelsList: list, isModelsDisabled: false});
        } else{
            this.setState({manufacturer: manufacturer1, isModelsDisabled: true});
        }
    }
    onModelChange(model1){
        this.setState({model: model1});
    }
    onColorChange(color1){
        this.setState({color: color1.target.value});
    }
    onEngineCapacityChange(engineCapacity1){
        this.setState({engineCapacity: engineCapacity1.target.value});
    }
    onSeatsChange(seats1){
        this.setState({seats: seats1.target.value});
    }

    onEngineTypeChange(engineType1){
        this.setState({engineType: engineType1});
    }
    onGearboxChange(gearbox1){
        this.setState({gearbox: gearbox1});
    }
    handleChange(evt)
    {
        var tgt = evt.target || window.event.srcElement,
            files = tgt.files;
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('outImage').src = fr.result;
            }
            fr.readAsDataURL(files[0]);
        }
        else {
            // fallback -- perhaps submit the input to an iframe and temporarily store
            // them on the server until the user's session ends.
         }
        this.setState({image: evt.target.value})
    }
    putDataToDB() {
        if (
            this.state.nuber === ''||
            this.state.area===''||
            this.state.area==='Choose option'||
            this.state.manufacturer===''||
            this.state.manufacturer==='Choose option'||
            this.state.model===''||
            this.state.model==='Choose option'||
            this.state.color===''||
            this.state.image===''||
            this.state.engineCapacity===''||
            this.state.seats===''||
            this.state.engineType===''||
            this.state.engineType==='Choose option'||
            this.state.gearbox===''||
            this.state.gearbox==='Choose option'
        ) {
            alert('Fill all records');
        } else
        axios.post(`${process.env.REACT_APP_SERVER_URL}/vehicle/putVehicle`, {
            number: this.state.number,
            area: this.state.area,
            manufacturer: this.state.manufacturer,
            model:this.state.model,
            color:this.state.color,
            image:this.state.image,
            engineCapacity:this.state.engineCapacity,
            seats:this.state.seats,
            engineType:this.state.engineType,
            gearbox:this.state.gearbox,
        })
            .then((res) =>{
                    if(res.data.success===true){
                        alert(this.state.number+ ': added successfully');
                    }else {
                        alert(res.data.error.errmsg);
                    }
        });
    };
    render() {
        return (
            <view className={'catalogContainer'}>
                {/*<view style={{backgroundColor: 'white'}} >*/}
                <view className='addVehicleBarImage'>
                    <h1 className='addVehicleHeaderText' style={{display: 'block'}}>Add new vehicle</h1>
                </view>
                <view className='addVehicleBox'>
                    <view>
                        <view className='vehicleItemBox'>
                            <text>Number: </text>
                            <input type='text' onChange={this.onTextChange}/>
                        </view>
                        <view className='vehicleItemBox'>
                            <text>Area: </text>
                            <SelectField list={AREA} valueChanged={this.onAreaChange}/>
                        </view>
                        <view className='vehicleItemBox'>
                            <text>Manufacturer: </text>
                            <SelectField list={MANUFACTURER} valueChanged={this.onManufacturerChange}/>
                        </view>
                        <view id='model' style={{disabled: 'disable'}} className='vehicleItemBox'>
                            <text>Model: </text>
                            <SelectField disabled={this.state.isModelsDisabled} list={this.state.modelsList} valueChanged={this.onModelChange}/>
                        </view>
                        <view className='vehicleItemBox'>
                            <text>Color: </text>
                            <input onChange={this.onColorChange} type='color' style={{width: '355px'}}/>
                        </view>
                        <view className='vehicleItemBox'>
                            <text>Engine capacity: </text>
                            <input onChange={this.onEngineCapacityChange} type='number'/>
                        </view>
                        <view className='vehicleItemBox'>
                            <text>Number of seats: </text>
                            <input onChange={this.onSeatsChange} type='number'/>
                        </view>
                        <view className='vehicleItemBox'>
                            <text>Engine type: </text>
                            <SelectField list={ENGINE_TYPE} valueChanged={this.onEngineTypeChange}/>
                        </view>
                        <view className='vehicleItemBox'>
                            <text>Gearbox: </text>
                            <SelectField list={GEARBOX} valueChanged={this.onGearboxChange}/>
                        </view>
                    </view>
                    <view style={{paddingLeft: '100px', flexDirection: 'column' ,justifyContent: 'start'}} className='vehicleItemBox'>
                        <view>
                            <text>Image: </text>
                            <input style={{color: 'white'}} id='picField' type='file' onChange={this.handleChange } />
                        </view>
                        <img src='https://www.autolist.com/assets/listings/default_car.jpg' className='vehicleImage' id='outImage' alt=''/>
                        <button className='addVehicleButton' variant="contained" onClick={this.putDataToDB}>Add vehicle</button>
                    </view>
                </view>
                <view/>
            </view>
        );
    }
}

export default AddVehicle;
