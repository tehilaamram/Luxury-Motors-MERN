import React from 'react';
import { Cookies } from 'react-cookie';
import autoBind from 'react-autobind';
import './style.css';
import { add } from '../../redux/Cart/actions';
import { connect } from 'react-redux';
import Card from '../../components/VehicleCard';
import Filter from '../../components/Filter';
import AjaxService from '../../services/AjaxService';
import { addTransmission } from '../../redux/catalogFilter/actions';

class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.cookies = new Cookies();
        let oldVehicleCart = this.cookies.get('vehicles');
        if (oldVehicleCart) {
            this.state = {
                vehicleList: [],
                count_total: 0,
                vehicleCart: oldVehicleCart,
                next_id: 0,
                new_vehicle_value: '',
                transmissionFilter: [],
            };
        } else {
            this.state = {
                vehicleCart: [],
                vehicleList: [],
                count_total: 0,
                next_id: 0,
                new_vehicle_value: '',
                transmissionFilter: [],
            };
        }
        autoBind(this);
    }
    componentDidMount() {
        AjaxService.get('/vehicle/getAll').then((res) => {
            console.log(res, ' res get all vehicles');
            const temp =[];
            res.data.forEach((item)=>{
                if(item.status && item.quantity !== 0)
                    temp.push(item);
            });
            this.setState({
                vehicleList: temp,
            });
        }).catch((err) => {
            console.log('err get all vehicles', err);
        });
    }
    setStateCallback() {
        console.log(this.state.vehicleCart, ' vehicle cart update cookie');
        let date = new Date();
        date.setTime(date.getTime() + (99 * 365 * 24 * 60 * 60 * 1000));
        console.log('in cookie');
        this.cookies.set('vehicles', this.state.vehicleCart, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    }


    addToCart(event) {
        console.log(event, ' event');
        this.setState(function (state, props) {
            console.log(state, ' state');
            if (event === undefined) {
                return { new_vehicle_value: '' };
            }
            else {
                const isInCart = this.state.vehicleCart.filter(element => element.vehicle === event._id)
                if (isInCart.length > 0) {
                    return;
                }
            }
            state.vehicleCart[state.next_id] = { id: state.next_id, vehicle: event._id };
            this.props.onAdd();
            console.log(state.vehicleCart, ' vehicle cart');
            return {
                new_vehicle_value: '',
                vehicleCart: state.vehicleCart,
                count_total: state.count_total + 1,
                next_id: state.next_id + 1
            };
        }, this.setStateCallback);
    }
    renderVehicle() {
        // const { transmissionFilter} = this.state;
        return (
            this.state.vehicleList.map((option, index) => {
                // console.log(this.state.transmissionFilter.length)
                // if (this.state.transmissionFilter.length > 0 && 
                //     !this.state.transmissionFilter.includes(option.transmission)) {
                //         // return;
                //     }
                console.log('in trans')
                // { this.state.transmissionFilter.length > 0 && 
                // this.state.transmissionFilter.includes(option.transmission)}
                return (
                    <Card
                        vehicle={option}
                        key={index}
                        addToCart={this.addToCart.bind(this, option)}
                        // visible={false}
                        // visible= {this.props.catalogFilter.transmission.length > 0 && this.props.catalogFilter.transmission.includes(option.transmission) }
                    />);
            })
        );
    }
    filterChanged(h) {
        console.log (h,  ' j');
        console.log(this.state.transmissionFilter);
    }
    transmissionFilterChange(option) {
        // if (this.props.catalogFilter.transmission.includes(option)) {
        //     console.log('already ibcludes');
        // } else {
            console.log('in changdsgggggggggggggggggggggggggggggse', option)
            this.props.onAddTransmission(option);
        // }
        // this.setState({
        //     transmissionFilter: [this.state.transmissionFilter, option],
        // });
    }
    renderFilter() {
        return (
            <div>
            < Filter subject={"Transmission"} list={['Automatic', 'Manual']} onFilterClick={this.transmissionFilterChange} filter={"transmission"} />
            < Filter subject={"Maker"} list={['Ferrari', 'Porsche']} onFilterClick={this.filterChanged} filter={"maker"} />
            < Filter subject={"Year"} list={['2020', '2019', '2018', '2017', '2016']} onFilterClick={this.filterChanged} filter={"year"} />
            < Filter subject={"Doors"} list={['2', '4']} onFilterClick={this.filterChanged} filter={"doors"} />
            < Filter subject={"Seats"} list={['2', '3', '4', '5', '6']} onFilterClick={this.filterChanged} filter={"seats"}/>
            </div>
        );
    }

    render() {
        return (
            <div className={"CatalogContainer"}>
                <div className="CatalogFilterDiv">
                {this.renderFilter()}
                </div>
                <div className="CatalogCardsDiv">
                {/* {this.state.vehicleList.map((option, index) => {
                console.log(this.state.transmissionFilter.length)
                if (this.state.transmissionFilter.length > 0 && 
                    !this.state.transmissionFilter.includes(option.transmission)) {
                        console.log('in return')
                        return;
                    }
                // { this.state.transmissionFilter.length > 0 && 
                // this.state.transmissionFilter.includes(option.transmission)}
                return (
                    <Card
                        vehicle={option}
                        key={index}
                        addToCart={this.addToCart.bind(this, option)}
                    />);
            })} */}
                    {/* {this.renderVehicle()} */}
                    { this.state.vehicleList.map((option, index) => {
                // console.log(this.state.transmissionFilter.length)
                // if (this.state.transmissionFilter.length > 0 && 
                //     !this.state.transmissionFilter.includes(option.transmission)) {
                //         // return;
                //     }
                console.log('in trans')
                // { this.state.transmissionFilter.length > 0 && 
                // this.state.transmissionFilter.includes(option.transmission)}
                return (
                    <Card
                        vehicle={option}
                        key={index}
                        addToCart={this.addToCart.bind(this, option)}
                        visible= {this.state.transmissionFilter.length > 0 && this.state.transmissionFilter.includes(option.transmission) }
                    />);
            })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
    catalogFilter: state.catalogFilter,
});

const mapDispatchToProps = {
    onAdd: add,
    onAddTransmission: addTransmission,
};

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
