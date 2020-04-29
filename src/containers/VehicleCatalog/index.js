import React from 'react';
import './style.css';
import {CircularProgress } from '@material-ui/core'
import {MANUFACTURER, AREA, GEARBOX, ENGINE_TYPE} from '../../consts/vehicle'
import plus from '../../images/plus.png'
import minus from '../../images/minus.png'
import axios from "axios";
import * as localForage from "localforage";
// import backImage from "../../images/back.png";
import heardImage from "../../images/heard.jpg";
import cartImage from "../../images/cart.png";

class VehicleCatalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            manufacturerSearchValues: {
                'Acura': false,
                'Alfa_Romeo':false,'Audi':false,'BMW':false,'Bentley':false,'Buick':false,'Cadillac':false,'Chevrolet':false,'Chrysler':false,'Dodge':false,'Fiat':false,'Ford':false,
                'GMC':false,'Genesis':false,'Honda':false,'Hyundai':false,'Infiniti':false,'Jaguar':false,'Jeep':false,'Kia':false,'Land':false,'Lexus':false,
                'Lincoln':false,'Lotus':false,'Maserati':false,'Mazda':false,'Mercedes':false,'Mercury':false,'Mini':false,'Mitsubishi':false,'Nissan':false,
                'Polestar':false,'Pontiac':false, 'Porsche':false,'Ram':false,'Rivian':false,'Rolls-Royce':false,'Saab':false,'Saturn':false,
                'Scion':false,'Smart':false,'Subaru':false,'Suzuki':false, 'Tesla':false,'Toyota':false,'Volkswagen':false,'Volvo':false,
            },
            areaSearchValues: {'center': false,'north': false,'south':false},
            gearboxSearchValues: {'Manual':false,
                'automaton':false,
                'Tifronic':false,
                'Robotic':false},
            engineTypeSearchValues: {'diesel':false,
                'Turbo diesel':false,
                'Electric hybrid / gasoline':false,
                'Electric / Diesel Hybrid':false,
                'electric':false,
                'LPG / gasoline':false,
                'GDN':false},
            manufacturerSearchOpen: false,
            areaSearchOpen: false,
            gearboxSearchOpen: false,
            engineTypeSearchOpen: false,
            data: [],
            originalData: [],
            id: 0,
            message: null,
            intervalIsSet: false,
            idToDelete: null,
            idToUpdate: null,
            objectToUpdate: null,
            searchBar:false,
        };
        this.renderManufacturerSearch = this.renderManufacturerSearch.bind(this);
        this.openManufacturerDropDown = this.openManufacturerDropDown.bind(this);
        this.renderAreaSearch = this.renderAreaSearch.bind(this);
        this.openAreaDropDown = this.openAreaDropDown.bind(this);
        this.renderGearboxSearch = this.renderGearboxSearch.bind(this);
        this.openGearBoxDropDown = this.openGearBoxDropDown.bind(this);
        this.renderEngineTypeSearch = this.renderEngineTypeSearch.bind(this);
        this.openEngineTypeDropDown = this.openEngineTypeDropDown.bind(this);
        this.onManufacturerChange = this.onManufacturerChange.bind(this);
        this.onAreaChange = this.onAreaChange.bind(this);
        this.onGearboxChange = this.onGearboxChange.bind(this);
        this.onEngineTypeChange = this.onEngineTypeChange.bind(this);
        this.updateData = this.updateData.bind(this);
        this.addToCart = this.addToCart.bind(this);
        this.wishList = this.wishList.bind(this);
    }

    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 6000);
            this.setState({ intervalIsSet: interval });
        }
    }
    // componentWillUnmount() {
    //     console.log('===========');
    //     if (this.state.intervalIsSet) {
    //         clearInterval(this.state.intervalIsSet);
    //         this.setState({ intervalIsSet: null });
    //     }
    // }
    getDataFromDb = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/vehicle/getVehicle`)
            .then((data) => data.json())
            .then((res) => {
                let temp = []
                res.data.forEach((item)=>{
                    if(item.status)
                        temp.push(item);
                });
                this.setState({data: temp, originalData: temp})
                this.updateData();
            });
    };
    renderItem(){
        return(
            this.state.data.map((vehicle,index)=>{
                return(
                    <view key={index} className='catalogItem'>
                        <view className='catalogItemLeftSide'>
                            <div className='CatalogText'>Number: {vehicle.number}</div>
                            <div className='CatalogText'>Area: {vehicle.area}</div>
                            <div className='CatalogText'>Manufacturer: {vehicle.manufacturer}</div>
                            <div className='CatalogText'>Model: {vehicle.model}</div>
                            <div className='CatalogText'>Color: {vehicle.color}</div>
                            <div className='CatalogText'>Engine capacity: {vehicle.engineCapacity}</div>
                            <div className='CatalogText'>Number of seats: {vehicle.seats}</div>
                            <div className='CatalogText'>Engine type: {vehicle.engineType}</div>
                            <div className='CatalogText'>Gearbox: {vehicle.gearbox}</div>
                        </view>
                        <view style={{flexDirection: 'column', display: 'flex'}}>
                            <img src={vehicle.image} className='vehicleCatalogImage' id='outImage' alt=''/>
                            <view style={{flexDirection: 'row', display: 'flex', justifyContent: 'center'}}>
                                {/*<button className='wishListButton' variant="contained" onClick={this.addToCart.bind(this,vehicle)}>Add to cart</button>*/}
                                <div className='wishListButton' style={{margin:'10px'}} onClick={this.addToCart.bind(this,vehicle)}>
                                    <img style={{width: '29px', height: '30px', backgroundColor:`rgba(255,255,255, 0)`}} alt='' src={cartImage}/>
                                    <div style={{paddingTop: '8px'}} variant="contained" >
                                        Add to cart</div>
                                </div>
                                <div className='wishListButton' style={{margin:'10px'}} onClick={this.wishList.bind(this,vehicle)}>
                                    <img style={{width: '29px', height: '30px', backgroundColor:`rgba(255,255,255, 0)`}} alt='' src={heardImage}/>
                                    <div style={{paddingTop: '8px'}} variant="contained" >
                                        Wish list</div>
                                </div>
                        </view>
                        </view>
                    </view>
                )
            })
        );
    }
    updateVehicleStatus(id){
        axios.post(`${process.env.REACT_APP_SERVER_URL}/vehicle/updateVehicle`, {
            id:id,
            update: { status: false },
        });
    }
    wishList(vehicle){
        localForage.getItem('user').then((user) => {
            var wishList1=user.wishList;
            wishList1.push(vehicle.number);
            axios.post(`${process.env.REACT_APP_SERVER_URL}/user/updateUser`, {
            id:user._id,
            update: { wishList: wishList1 },
        })
            .then((res)=>{
                let str=vehicle.number+'added successfully'
                alert(str);
                // user.wishList.push(vehicle.number);
                localForage.setItem('user',user);
            });
        });
    }
    addToCart(vehicle){
        this.updateVehicleStatus(vehicle._id);
        localForage.getItem('user').then((user) => {
            var cart1=user.cart
            cart1.push(vehicle.number);
            axios.post(`${process.env.REACT_APP_SERVER_URL}/user/updateUser`, {
                id: user._id,
                update: {cart: cart1},
            })
                .then((res) => {
                    alert('added');
                    // user.cart.push(vehicle.number);
                    localForage.setItem('user',user);
                });
        });
    }
    onManufacturerChange(event ){
        let temp=this.state.manufacturerSearchValues;
        temp[event]=!this.state.manufacturerSearchValues[event];
        this.setState({manufacturerSearchValues:temp})
    }
    onAreaChange(event ){
        let temp=this.state.areaSearchValues;
        temp[event]=!this.state.areaSearchValues[event];
        this.setState({areaSearchValues:temp})
    }
    onGearboxChange(event ){
        let temp=this.state.gearboxSearchValues;
        temp[event]=!this.state.gearboxSearchValues[event];
        this.setState({gearboxSearchValues:temp})
    }
    onEngineTypeChange(event ){
        let temp=this.state.engineTypeSearchValues;
        temp[event]=!this.state.engineTypeSearchValues[event];
        this.setState({engineTypeSearchValues:temp})
    }
    renderManufacturerSearch(){
        return(MANUFACTURER.map((item,index)=>{
            return(
                <view key={index}>
                    <input checked={this.state.manufacturerSearchValues[item]} onChange={this.onManufacturerChange.bind(this, item)}  type='checkbox'/>
                    <text className='searchItemText'>{item}</text>
                </view>
            )
        }));
    }
    renderAreaSearch(){
        return(
                AREA.map((item,index)=>{
                return(
                    <view key={index}>
                        <input checked={this.state.areaSearchValues[item]} onChange={this.onAreaChange.bind(this, item)} type='checkbox'/>
                        <text className='searchItemText'>{item}</text>
                    </view>
                )}));
    }
    renderGearboxSearch(){
        return(GEARBOX.map((item,index)=>{
            return(
                <view key={index}>
                    <input checked={this.state.gearboxSearchValues[item]} onChange={this.onGearboxChange.bind(this, item)} type='checkbox'/>
                    <text className='searchItemText'>{item}</text>
                </view>
            )
        }));
    }
    renderEngineTypeSearch(){
        return(ENGINE_TYPE.map((item,index)=>{
            return(
                <view key={index}>
                    <input checked={this.state.engineTypeSearchValues[item]} onChange={this.onEngineTypeChange.bind(this, item)} type='checkbox'/>
                    <text className='searchItemText'>{item}</text>
                </view>
            )
        }));
    }
    openManufacturerDropDown(){
        this.setState({manufacturerSearchOpen: !this.state.manufacturerSearchOpen});
    }
    openAreaDropDown(){
        this.setState({areaSearchOpen: !this.state.areaSearchOpen});
    }
    openGearBoxDropDown(){
        this.setState({gearboxSearchOpen: !this.state.gearboxSearchOpen});
    }
    openEngineTypeDropDown(){
        this.setState({engineTypeSearchOpen: !this.state.engineTypeSearchOpen});
    }
    updateData(){
        // console.log(this.state.data);
        // console.log(this.state.originalData);
        let tempData=[];
        let validManufacturer=[];
        MANUFACTURER.forEach((item)=>{
            if(this.state.manufacturerSearchValues[item]){
                validManufacturer.push(item);
            }
        });
        let validArea=[];
        AREA.forEach((item)=>{
            if(this.state.areaSearchValues[item]){
                validArea.push(item);
            }
        });
        let validGearbox=[];
        GEARBOX.forEach((item)=>{
            if(this.state.gearboxSearchValues[item]){
                validGearbox.push(item);
            }
        });
        let validEngineType=[];
        ENGINE_TYPE.forEach((item)=>{
            if(this.state.engineTypeSearchValues[item]){
                validEngineType.push(item);
            }
        });
        if(validManufacturer.length!==0) {
            let i;
            for (i = 0; i < this.state.originalData.length; i++) {
                if (validManufacturer.includes(this.state.originalData[i].manufacturer))
                    tempData.push(this.state.originalData[i]);
            }
        }else{
            tempData=this.state.originalData;
        }
        let temp1=[];
        if(validArea.length!==0) {
            let i;
            for (i = 0; i < tempData.length; i++) {
                if (validArea.includes(tempData[i].area))
                    temp1.push(tempData[i]);
            }
        }else{
            temp1=tempData;
        }
        let temp2=[];
        if(validGearbox.length!==0) {
            let i;
            for (i = 0; i < temp1.length; i++) {
                if (validGearbox.includes(temp1[i].gearbox))
                    temp2.push(temp1[i]);
            }
        }else{
            temp2=temp1;
        }
        let temp3=[];
        if(validEngineType.length!==0) {
            let i;
            for (i = 0; i < temp2.length; i++) {
                if (validEngineType.includes(temp2[i].engineType))
                    temp3.push(temp2[i]);
            }
        }else {
            temp3=temp2;
        }
        if(temp3.length===0){
            this.setState({data: temp3,searchBar: true});
        }
        this.setState({data: temp3,searchBar: false});
        // this.setState({data: temp3});
    }
    render() {
        return (
            <view className='catalogContainer'>
                <view className='vehicleCatalogBarImage'>
                    <h1 className='addVehicleHeaderText' style={{display: 'block'}}>   Vehicles catalog</h1>
                </view>
                <view className='mainContent'>
                <view className='CatalogList'>
                    {this.state.data.length !== 0 && this.renderItem()}
                    {this.state.data.length === 0 &&this.state.searchBar &&<view className='circularProgress'><CircularProgress color="secondary"/></view>}
                    {this.state.data.length === 0 &&!this.state.searchBar &&<div className='PaidBar'>
                        No order found
                    </div>}                    </view>
                        <view className='searchBox'>
                            <view>
                                <img onClick={this.openManufacturerDropDown} className='plusMinusIcons' alt='' src={this.state.manufacturerSearchOpen? minus:plus}/>
                                <text className='searchItemTextHeader'>Manufacturer</text>
                                <view className='searchList'>
                                  { this.state.manufacturerSearchOpen&&this.renderManufacturerSearch()}
                                </view>
                                <img onClick={this.openAreaDropDown} className='plusMinusIcons' alt='' src={this.state.areaSearchOpen? minus:plus}/>
                                <text className='searchItemTextHeader'>Area</text>
                                <view className='searchList'>
                                    {this.state.areaSearchOpen&&this.renderAreaSearch()}
                                </view>
                                <img onClick={this.openGearBoxDropDown} className='plusMinusIcons' alt='' src={this.state.gearboxSearchOpen? minus:plus}/>
                                <text className='searchItemTextHeader'>Gearbox</text>
                                <view className='searchList'>
                                    { this.state.gearboxSearchOpen&&this.renderGearboxSearch()}
                                </view>
                                <img onClick={this.openEngineTypeDropDown} className='plusMinusIcons' alt='' src={this.state.engineTypeSearchOpen? minus:plus}/>
                                <text className='searchItemTextHeader'>Engine type</text>
                                <view className='searchList'>
                                    { this.state.engineTypeSearchOpen&&this.renderEngineTypeSearch()}
                                </view>
                            </view>
                            <button className='UpdateListButton' variant="contained" onClick={this.updateData}>Update list</button>
                        </view>
                </view>

            </view>
        );
    }
}

export default VehicleCatalog;
