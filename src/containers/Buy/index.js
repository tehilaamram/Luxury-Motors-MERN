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
        }
        autoBind(this);
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
      renderStep() {
          console.log('in stepper', this.props.location.state)
        switch (this.state.activeStep) {
            case 0:
                return this.renderVehicles();
            //   return 'Select campaign settings...';
            case 1:
              return this.renderPayment();
            case 2:
              return this.renderComplete();
            default:
                return this.renderComplete();          }
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
export default withStyles(useStyles)(Buy);
