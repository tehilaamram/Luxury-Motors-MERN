import React from 'react';
// import { Cookies } from 'react-cookie';
// import autoBind from 'react-autobind';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import './style.css';

class OrderCompleted extends React.Component {
    render() {
        return (
            <div className="order-completed-main">
                <CheckCircleRoundedIcon id="received-icon"/>
                <div className="order-completed-title">
                    <span>Your order has been received</span>
                   </div>
                   <div className="order-completed-body">
                       <span>Thank you for shopping with us online!</span>
                       </div>
                </div>
        );
    }
}

// const mapStateToProps = (state) => ({
//     cart: state.cart,
//     catalogFilter: state.catalogFilter,
// });

// const mapDispatchToProps = {
//     onAdd: add,
//     onAddTransmission: addTransmission,
// };

export default OrderCompleted;
