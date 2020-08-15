import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import autoBind from 'react-autobind';
import { withStyles } from "@material-ui/core/styles";
import DataGrid, { Column, Scrolling ,Summary, TotalItem } from 'devextreme-react/data-grid';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import paymentImg from '../../images/payment.png';
import AjaxService from '../../services/AjaxService';
import { Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import { restart } from '../../redux/Cart/actions';



import './style.css';

const useStyles = ((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const steps =['Order Summary', 'Payment', 'Order Completed'];
class Buy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            isEnoughQuantity: false,
        }
        autoBind(this);
        console.log(this.props.location.state);
    }
    componentDidMount() {
      var vehicleArray = this.props.location.state.vehicles.map((element, index) => {
        if (element.quantity < this.props.location.state.list[element._id].length) {
          this.setState({
            isEnoughQuantity: true,
          });
        }
        return {
            id: element._id,
            price: element.price,
            quantity: this.props.location.state.list[element._id].length,
            oldQuantity: element.quantity,
        };
    });
    }
    handleNext() {
        if (this.state.activeStep === 1) {
            this.setState({
                activeStep: this.state.activeStep + 2,
            });
        } else {
            this.setState({
                activeStep: this.state.activeStep + 1,
            });
        }
       
    }
    handleBack() {


        this.setState({
            activeStep: this.state.activeStep - 1,
        });
    }
     cellRender(data) {
         console.log(data,  'data')
        return <img alt="vehicle" className="buy-vehicle-image" src={`data:image/jpeg;base64,${data.data.mainImg.image}`} />;
      }
      cellQuantityRender(data) {
        //   return
      }
      quantityCellValue(data) {
        //   console.log(data, ' quantity')
          return this.props.location.state.list[data._id].length;
      }
      priceCellValue(data) {
        // console.log(data, ' quantity')
        return Number(this.props.location.state.list[data._id].length * data.price);
        // .toLocaleString();
    }
      renderVehicles() {
        return (
            <DataGrid id="gridContainer"
            dataSource={this.props.location.state.vehicles}
            showBorders={true}
            columnAutoWidth={true}
            columnMinWidth={100}
            columnResizingMode={'nextColumn'}
            // scrolling={true}
          >
            <Column dataField="mainImg"
            caption=""
            //   width={150}
              allowSorting={false}
              cellRender={this.cellRender}
            />
            <Column dataField="maker"
            //   width={70}
              caption="Maker"
            />
            <Column dataField="model" caption="Model"/>
            <Column dataField="year" caption="Year"/>
            <Column dataField="quantity1" calculateCellValue={this.quantityCellValue} caption="Quantity" />
            <Column dataField="price" calculateCellValue={this.priceCellValue} caption="Price" format="currency" />
            <Summary>
            <TotalItem
              column="price"
              summaryType="sum"
              valueFormat="currency" />
          </Summary>
            <Scrolling columnRenderingMode="virtual" />
          </DataGrid>
        );
      }
      renderPayment() {
          return (
              <div className="payment-main">
              <img alt="vehicle" src={paymentImg} width={'100%'}/>
              </div>
          );
      }
      renderComplete() {
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
      commitOrder() {

          var vehicleArray = this.props.location.state.vehicles.map((element, index) => {
              return {
                  id: element._id,
                  price: element.price,
                  quantity: this.props.location.state.list[element._id].length,
                  oldQuantity: element.quantity,
              };
          });
          console.log("vehicle array")
          console.log(vehicleArray)
          //   this
          AjaxService.post('/order/new', {
              vehicles: vehicleArray,
          }).then((res) => {
                      if (this.props.location.state.fromCart === true) {
                          this.cookies = new Cookies();
                          this.cookies.remove('vehicles');
                          // this.props.onRestart(0);
                      }
          }).catch((err) => {
              console.log(err, " order failed");
          });
      }
      renderStep() {
          console.log('in stepper', this.props.location.state)
        switch (this.state.activeStep) {
            case 0:
                return this.renderVehicles();
            case 1:
              return this.renderPayment();
            case 2:
                return;
              case 3:
                this.commitOrder();
                return this.renderComplete();
            default:
                return;
            }
      }
    render() {
        const { classes } = this.props;
        console.log(' current step ', this.state.activeStep)
        return (
            <div className="buy-main">
            <div className={classes.root}>
              <Stepper activeStep={this.state.activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              { this.state.activeStep !== 3 && <div className="buy-button-div">
                      <Button disabled={this.state.activeStep === 0} onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                      <Button
                      disabled={this.state.isEnoughQuantity}
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      >
                        {this.state.activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
              </div>}
            </div>
            {this.renderStep(this.state.activeStep)}
            </div>
          );
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart,
});

const mapDispatchToProps = {
    onRestart: restart,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Buy));
