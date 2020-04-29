import React from 'react';
import './style.css';
import * as localForage from "localforage";

class WishListModal extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            ordersList:[],
            userEmail:'',
            vehiclesList:[],
        };
        this.updateOrdersList=this.updateOrdersList.bind(this);
        this.UpdateVehiclesList=this.UpdateVehiclesList.bind(this);
    }
    componentDidMount() {
        this.updateOrdersList();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.updateOrdersList, 6000);
            this.setState({ intervalIsSet: interval });
        }
    }

    updateOrdersList() {
        localForage.getItem('user').then((user) => {
            const email = user.email;
            fetch(`${process.env.REACT_APP_SERVER_URL}/order/getOrder`)
                .then((data) => data.json())
                .then((res) => {
                    let temp = []
                    res.data.forEach((item) => {
                        if (item.userEmail===email)
                            temp.push(item);
                    });
                    this.setState({ordersList: temp})
                    this.UpdateVehiclesList();
                });
        })
    }
    UpdateVehiclesList(){
        fetch(`${process.env.REACT_APP_SERVER_URL}/vehicle/getVehicle`)
            .then((data) => data.json())
            .then((res) => {
                let temp = []
                res.data.forEach((item)=>{
                        temp.push(item);
                });
                this.setState({vehiclesList: temp})
            });
    }

    closeModal(){
        document.getElementById('OrdersModal').style.display = 'none';
    }
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
                    <img src={vehicle.image} className='vehicleOrderModalImage' id='outImage' alt=''/>
                    <div>
                        <div className='OrderText'>Number: {vehicle.number}</div>
                        <div className='OrderText'>Manufacturer: {vehicle.manufacturer}</div>
                        <div className='OrderText'>Model: {vehicle.model}</div>
                        <div className='OrderText'>Color: {vehicle.color}</div>
                    </div>
                </div>
                <div className='secondOrdersModalItem'>
                    <div className='OrderText'>User email: {order.userEmail}</div>
                    <div className='OrderText'>Order date: {order.orderDate}</div>
                    <div className='OrderText'>Shipping address: {order.shippingAddress}</div>
                    <div className='OrderText'>Status: {order.status}</div>
                </div>
            </div>
        )
    }
    renderOrdersList(){
        return(
            this.state.ordersList.map((order,index)=>{
                return(
                    <div key={index}>{this.renderOrderItem(order)}</div>);
            })
        )
    }
    render() {
        return (
            <div id='OrdersModal' className="OrdersModal">
                <div id='cartModalContent' className="order-modal-content">
                    {this.state.vehiclesList.length!==0&&<div style={{overflow: 'auto'}}>
                        {this.renderOrdersList()}
                    </div>}
                    <img style={{width: '29px', height: '30px',alignSelf: 'center', padding:'20px'}} alt='' onClick={this.closeModal} src='data:image/png;base64,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'/>
                </div>
            </div>
        );
    }
}

export default WishListModal;