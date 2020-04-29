import React from 'react';
import './style.css';
import {CircularProgress } from '@material-ui/core'
import axios from "axios";
import SelectField from "../../components/SelectField";
const STATUS=['paid','progress','done'];
class VehicleCatalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            StatusValues: {
                'paid':false,
                'progress':false,
                'done':false,
            },
            status:'progress',
            data: [],
            originalData: [],
            vehiclesList:[],
            id: 0,
            message: null,
            intervalIsSet: false,
            searchBar:false,
        };
        this.renderStatusSearch = this.renderStatusSearch.bind(this);
        this.onStatusValueChange = this.onStatusValueChange.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
        this.updateData = this.updateData.bind(this);
        this.renderStatusSearch = this.renderStatusSearch.bind(this);
    }

    componentDidMount() {
        this.getDataFromDb();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.getDataFromDb, 6000);
            this.setState({ intervalIsSet: interval });
        }
    }
    // componentWillUnmount() {
    //     if (this.state.intervalIsSet) {
    //         clearInterval(this.state.intervalIsSet);
    //         this.setState({ intervalIsSet: null });
    //     }
    // }
    onStatusValueChange(event){
        this.setState({status: event});
    }
    getDataFromDb = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/vehicle/getVehicle`)
            .then((data) => data.json())
            .then((res) => {
                let temp = []
                res.data.forEach((item)=>{
                        temp.push(item);
                });
                this.setState({vehiclesList: temp});
            });
        fetch(`${process.env.REACT_APP_SERVER_URL}/order/getOrder`)
            .then((data) => data.json())
            .then((res) => {
                let temp = []
                res.data.forEach((item)=>{
                    temp.push(item);
                });
                this.setState({data: temp,originalData:temp});
                this.updateData();
            });

    };
    vehicleByNumber(vehicleNumber){
        var vehicle=[];
        this.state.vehiclesList.forEach((item)=>{
            if(item.number===vehicleNumber)
                vehicle=item;
        })
        return vehicle;
    }
    renderOrderItem(order)
    {
        const vehicle=this.vehicleByNumber(order.vehicleNumber);
        return(
            <div className='ordersModalItem'>
                <div className='firstOrdersModalItem'>
                    <img src={vehicle.image} className='vehicleOrderUpdateImage' id='outImage' alt=''/>
                    <div>
                        <div className='OrderText'>Number: {vehicle.number}</div>
                        <div className='OrderText'>Area: {vehicle.area}</div>
                        <div className='OrderText'>Manufacturer: {vehicle.manufacturer}</div>
                        <div className='OrderText'>Model: {vehicle.model}</div>
                        <div className='OrderText'>Color: {vehicle.color}</div>
                        <div className='OrderText'>Engine capacity: {vehicle.engineCapacity}</div>
                        <div className='OrderText'>Number of seats: {vehicle.seats}</div>
                        <div className='OrderText'>Engine type: {vehicle.engineType}</div>
                        <div className='OrderText'>Gearbox: {vehicle.gearbox}</div>
                    </div>
                </div>
                <div className='secondOrdersModalItem'>
                    <div className='OrderText'>User email: {order.userEmail}</div>
                    <div className='OrderText'>Order date: {order.orderDate}</div>
                    <div className='OrderText'>Shipping address: {order.shippingAddress}</div>
                    <div className='OrderText'>Status: {order.status}</div>
                    <div style={{marginTop:'20px',fontSize:'large',fontWeight:'600' }}>Update order status</div>
                    <view className='StatusOrderBox'>
                        <div>Status: </div>
                        <SelectField list={STATUS} valueChanged={this.onStatusValueChange}/>
                    </view>
                    <button className='updateOrderButton' variant="contained" onClick={this.updateOrderStatus.bind(this,order._id)}>Update</button>
                </div>
                {/*<div className='thirdOrdersModalItem'>*/}
                {/*    */}
                {/*</div>*/}
            </div>
        )
    }
    renderOrdersList(){
        return(
            this.state.data.map((order,index)=>{
                return(
                    <div key={index}>{this.renderOrderItem(order)}</div>);
            })
        )
    }
    updateOrderStatus(id){
        axios.post(`${process.env.REACT_APP_SERVER_URL}/order/updateOrder`, {
            id:id,
            update: { status: this.state.status },
        });
    }

    onStatusChange(event ){
        let temp=this.state.StatusValues;
        temp[event]=!this.state.StatusValues[event];
        this.setState({StatusValues:temp})
    }

    renderStatusSearch(){
        return(STATUS.map((item,index)=>{
            return(
                <view key={index}>
                    <input checked={this.state.StatusValues[item]} onChange={this.onStatusChange.bind(this, item)}  type='checkbox'/>
                    <text className='searchItemText'>{item}</text>
                </view>
            )
        }));
    }

    updateData(){
        // console.log(this.state.data);
        // console.log(this.state.originalData);
        let tempData=[];
        let validStatus=[];
        STATUS.forEach((item)=>{
            if(this.state.StatusValues[item]){
                validStatus.push(item);
            }
        });
        if(validStatus.length!==0) {
            let i;
            for (i = 0; i < this.state.originalData.length; i++) {
                if (validStatus.includes(this.state.originalData[i].status))
                    tempData.push(this.state.originalData[i]);
            }
        }else {
            tempData=this.state.originalData;
        }
        if(tempData.length===0){
            this.setState({data: tempData,searchBar: true});
        }
        this.setState({data: tempData,searchBar: false});
    }
    render() {
        return (
            <view className='catalogContainer'>
                <view className='vehicleCatalogBarImage'>
                    <h1 className='addVehicleHeaderText' style={{display: 'block'}}>   Orders</h1>
                </view>
                <view className='mainContent'>
                    <view className='CatalogList'>
                        {this.state.data.length !== 0 && this.renderOrdersList()}
                        {this.state.data.length === 0 &&this.state.searchBar &&<view className='circularProgress'><CircularProgress color="secondary"/></view>}
                        {this.state.data.length === 0 &&!this.state.searchBar &&<div className='PaidBar'>
                            No order found
                        </div>}
                    </view>
                    <view className='searchBox'>
                        <view>
                            <text className='searchItemTextHeader'>Status</text>
                            <view className='searchList'>
                                {this.renderStatusSearch()}
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
