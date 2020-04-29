import React from 'react';
import './style.css';
import axios from 'axios';
import * as localForage from "localforage";
import {Link} from "react-router-dom";
import backImage from '../../images/back.png'
class AddVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            done:false,
            vehicle: [],
            userEmail: '',
            vehicleNumber: '',
            shippingAddress: '',
            creditCard:[],
            creditCardCVV:'',
            creditCardExpirationDate:'',
            creditCardNumber:'',
        };
        // this.onUserEmailChange = this.onUserEmailChange.bind(this);
        // this.onVehicleNumberChange = this.onVehicleNumberChange.bind(this);
        // this.onOrderDateChange = this.onOrderDateChange.bind(this);
        this.onShippingAddressChange = this.onShippingAddressChange.bind(this);
        this.onCreditCardChange = this.onCreditCardChange.bind(this);
        this.onCreditCardNumberChange = this.onCreditCardNumberChange.bind(this);
        this.onCreditCardExpirationDateChange = this.onCreditCardExpirationDateChange.bind(this);
        this.onCreditCardCVVChange = this.onCreditCardCVVChange.bind(this);
        this.updateCreditCard = this.updateCreditCard.bind(this);
        this.removeFromCart = this.removeFromCart.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        this.putDataToDB = this.putDataToDB.bind(this);
    }

    componentDidMount() {
        localForage.getItem('user').then((user) => {
            localForage.getItem('vehicle').then((vehicle) => {
                this.setState({userEmail:user.email, vehicleNumber:vehicle.number,vehicle:vehicle});
            });});

        }
    onShippingAddressChange(event){
        this.setState({shippingAddress: event.target.value});
    }
    onCreditCardChange(event){
        this.setState({creditCard: event.target.value});
    }
    onCreditCardNumberChange(event){
        this.setState({creditCardNumber: event.target.value});
    }
    onCreditCardExpirationDateChange(event){
        console.log(event.target.value);
        this.setState({creditCardExpirationDate: event.target.value});
    }
    onCreditCardCVVChange(event){
        this.setState({creditCardCVV: event.target.value});
    }
    updateCreditCard()
    {
        const temp=[this.state.creditCardNumber,this.state.creditCardExpirationDate, this.state.creditCardCVV];
        this.setState({creditCard:temp});
    }
    putDataToDB() {
        this.updateCreditCard();
        let date = new Date();
        let today = date.toISOString().substr(0, 10);
        if (
            this.state.userEmail === ''||
            this.state.vehicleNumber===''||
            this.state.shippingAddress===''||
            this.state.creditCardNumber===''||
            this.state.creditCardExpirationDate===''||
            this.state.creditCardCVV===''||
            this.state.creditCard===[]
        ) {
            alert('Fill all records');
        } else
            axios.post(`${process.env.REACT_APP_SERVER_URL}/order/putOrder`, {
                userEmail: this.state.userEmail,
                vehicleNumber: this.state.vehicleNumber,
                orderDate: today,
                shippingAddress:this.state.shippingAddress,
                creditCard:this.state.creditCard,
            })
                .then((res) =>{
                    if(res.data.success===true){
                        alert(this.state.vehicleNumber+ ': buy successfully');
                        this.removeFromCart(this.state.vehicle);
                        this.setState({done:true});
                    }else {
                        alert(res.data.error.errmsg);
                    }
                });
    };
    removeA(arr) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax= arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }
    removeFromCart(vehicle){
        localForage.getItem('user').then((user) => {
            var cart1=user.cart;
            this.removeA(cart1,vehicle.number);
            axios.post(`${process.env.REACT_APP_SERVER_URL}/user/updateUser`, {
                id: user._id,
                update: {cart: cart1},
            })
                .then((res) => {
                    // user.cart.push(vehicle.number);
                    localForage.setItem('user',user);
                });
        });
    }
    renderVehicleData()
    {
        const {vehicle}=this.state;
        return(
            <div >
                    <div className='orderTitle'>Vehicle details</div>
                    <div className='OrderText'>Number: {vehicle.number}</div>
                    <div className='OrderText'>Area: {vehicle.area}</div>
                    <div className='OrderText'>Manufacturer: {vehicle.manufacturer}</div>
                    <div className='OrderText'>Model: {vehicle.model}</div>
                    <div className='OrderText'>Color: {vehicle.color}</div>
                    <div className='OrderText'>Engine capacity: {vehicle.engineCapacity}</div>
                    <div className='OrderText'>Number of seats: {vehicle.seats}</div>
                    <div className='OrderText'>Engine type: {vehicle.engineType}</div>
                    <div className='OrderText'>Gearbox: {vehicle.gearbox}</div>
                    <img src={vehicle.image} className='vehicleOrderImage' id='outImage' alt=''/>
            </div>
        )
    }
    renderShippingDetails(){
        let date = new Date();
        let today = date.toISOString().substr(0, 10);
        return(
            <div>
                <div className='orderTitle'>Shipping details</div>
                <div className='vehicleItemBox'>
                    <div>User email: </div>
                    <input type='text' disabled={true} value={this.state.userEmail}/>
                </div>
                <div className='vehicleItemBox'>
                    <div>Vehicle number: </div>
                    <input type='text' disabled={true} value={this.state.vehicleNumber}/>
                </div>
                <div className='vehicleItemBox'>
                    <div>Order date: </div>
                    <input disabled={true} value={today} type='date' style={{width: '355px'}}/>
                </div>
                <div id='model' style={{disabled: 'disable'}} className='vehicleItemBox'>
                    <div>Shipping address: </div>
                    <input onChange={this.onShippingAddressChange} type='text' style={{width: '355px'}}/>
                </div>
            </div>

        )
    }

    renderCreditCardDetails(){
        return(
            <div>
                <div className='orderTitle'>credit card details</div>
                <div className='vehicleItemBox'>
                    <div>Card number: </div>
                    <input onChange={this.onCreditCardNumberChange} type='text'/>
                </div>
                <div className='vehicleItemBox'>
                    <div>Expiration date: </div>
                    <input onChange={this.onCreditCardExpirationDateChange} type='month' style={{width: '355px'}}/>
                </div>
                <div className='vehicleItemBox'>
                    <div>cvv security code: </div>
                    <input onChange={this.onCreditCardCVVChange} type='text'/>
                </div>
            </div>

        )
    }
    render() {
        return (
            <div className={'AddOrderContainer'}>
                <div className='addVehicleImage'>
                    <h1 className='addVehicleHeaderText' style={{display: 'block'}}>Add new order</h1>
                </div>
                {this.state.userEmail!==''&&this.state.done===false&&<div className='addVehicleBox'>
                    <div>
                        <div className='VehicleDataFromOrder'>
                            {this.renderVehicleData()}
                        </div>
                        <button className='actionButton' variant="contained" onClick={this.putDataToDB}>Buy</button>
                    </div>
                    <div>
                        <div className='VehicleDataFromOrder'>
                            {this.renderShippingDetails()}
                        </div>
                        <div className='VehicleDataFromOrder'>
                            {this.renderCreditCardDetails()}
                        </div>
                    </div>
                </div>}
                {this.state.userEmail!==''&&this.state.done!==false&&
                    <div>
                        <div className='PaidBar'>
                            Thanks for your purchase
                        </div>
                        <Link to={'/'} style={{ textDecoration: 'none' }}>
                            <div style={{display:' flex', flexDirection:'row', margin:'40px'}}>
                            <img style={{width: '29px', height: '30px'}} alt='' src={backImage}/>
                            <div style={{ color: 'black', fontSize: 20}}>Back to home</div>
                            </div>
                        </Link>
                    </div>}
                <div/>
            </div>
        );
    }
}

export default AddVehicle;
