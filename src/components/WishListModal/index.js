import React from 'react';
import './style.css';
import axios from "axios";
import * as localForage from "localforage";
import cartImage from "../../images/1.png";
import heardImage from "../../images/trash_recyclebin_empty_closed.png";

    class WishListModal extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            vehiclesList:[],
        };
               this.renderVehicleList=this.renderVehicleList.bind(this);
        this.addToCart=this.addToCart.bind(this);
        this.updateVehicleStatus=this.updateVehicleStatus.bind(this);
        this.updateVehiclesList=this.updateVehiclesList.bind(this);
        this.removeFromWishList=this.removeFromWishList.bind(this);
    }
    componentDidMount() {
        this.updateVehiclesList();
        if (!this.state.intervalIsSet) {
            let interval = setInterval(this.updateVehiclesList, 6000);
            this.setState({ intervalIsSet: interval });
        }
    }
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
    updateVehiclesList() {
        localForage.getItem('user').then((user) => {
            if(user.length!==0) {
                const vehiclesInWishList = user.wishList;
                fetch(`${process.env.REACT_APP_SERVER_URL}/vehicle/getVehicle`)
                    .then((data) => data.json())
                    .then((res) => {
                        let temp = []
                        res.data.forEach((item) => {
                            if (vehiclesInWishList.includes(item.number))
                                temp.push(item);
                        });
                        this.setState({vehiclesList: temp})
                    });
            }
        })
    }

    removeFromWishList(vehicle)
    {
        localForage.getItem('user').then((user) => {
            var wishList1=user.wishList;
            this.removeA(wishList1,vehicle.number);
            axios.post(`${process.env.REACT_APP_SERVER_URL}/user/updateUser`, {
                id:user._id,
                update: { wishList: wishList1 },
            })
                .then((res)=>{
                    let str=vehicle.number+'removed successfully'
                    alert(str);
                    // user.wishList.push(vehicle.number);
                    localForage.setItem('user',user);
                });
            this.updateVehiclesList();
        });
    }

    closeModal(){
        document.getElementById('WishListModal').style.display = 'none';
    }

    renderVehicleList(){
        const outOfStockImage='data:image/png;base64,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';
       return(
            this.state.vehiclesList.map((vehicle,index)=>{
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
                            <img src={vehicle.status?vehicle.image:outOfStockImage} className={vehicle.status?'vehicleWishListImage':'vehicleWishListImageSold'} id='outImage' alt=''/>
                            <view style={{flexDirection: 'row', display: 'flex', justifyContent: 'center'}}>
                                {/*<button className='wishListButton' variant="contained" onClick={this.addToCart.bind(this,vehicle)}>Add to cart</button>*/}
                                {vehicle.status&&<div className='wishListButton' style={{margin:'10px'}} onClick={this.addToCart.bind(this,vehicle)}>
                                    <img style={{width: '29px', height: '30px', backgroundColor:`rgba(255,255,255, 0)`}} alt='' src={cartImage}/>
                                    <div style={{paddingTop: '8px'}} variant="contained" >
                                        Add to cart</div>
                                </div>}
                                <div className='wishListButton' style={{margin:'10px'}} onClick={this.removeFromWishList.bind(this,vehicle)}>
                                    <img style={{width: '29px', height: '30px', backgroundColor:`rgba(255,255,255, 0)`}} alt='' src={heardImage}/>
                                    <div style={{paddingTop: '8px'}} variant="contained" >
                                        Remove from wish list</div>
                                </div>
                            </view>

                            {/*{vehicle.status&&<button className='actionButton' variant="contained" onClick={this.addToCart.bind(this,vehicle)}>Add to cart</button>}*/}
                            {/*<button className='actionButton' variant="contained" onClick={this.removeFromWishList.bind(this,vehicle)}>Remove from wish list</button>*/}
                        </view>
                    </view>
                )
            })
        );
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
    updateVehicleStatus(id){
        axios.post(`${process.env.REACT_APP_SERVER_URL}/vehicle/updateVehicle`, {
            id:id,
            update: { status: false },
        })
            .then((res)=>{
                this.updateVehiclesList();
            });
    }
    render() {
        return (
            <div id='WishListModal' className="WishListModal">
                <div id='cartModalContent' className="wish-list-modal-content">
                    <div style={{overflow: 'auto'}}>
                    {this.renderVehicleList()}
                    </div>
                    <img style={{width: '29px', height: '30px',alignSelf: 'center', padding:'20px'}} alt='' onClick={this.closeModal} src='data:image/png;base64,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'/>
                </div>
            </div>
        );
    }
}

export default WishListModal;