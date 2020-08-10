import 'date-fns';
import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import autoBind from 'react-autobind';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import './style.css';
import ChatGroups from '../ChatGroups';
var defaultImg = require("../../images/defaultprofile.jpeg");
const useStyles = ((theme) => ({
  root: {
    width: '100%',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      // flex: '50%',
      minWidth: '120px',
      // maxWidth: 900,
      width: '25vw',
    },
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 120,
    width: '25vw',
  },
  selectEmpty: {
    // marginTop: theme.spacing(2),
  },
}));

class CustomStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      file: defaultImg,
      img: null,
      gender: '',
      // date: new Date(),
      date: new Date('2014-08-18T21:11:54'),
    }
    autoBind(this);
  }
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Select campaign settings...';
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'Unknown stepIndex';
    }
  }
  handleNext() {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  }
  handleReset() {
    this.setState({
      activeStep: 0,
    });
  }
  handleBack() {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  }
  handleImgChange(event) {
    this.setState({
      img: event.target.files[0],
      file: URL.createObjectURL(event.target.files[0])
    });
  }
  handleGenderChange(event) {
    this.setState({
      gender: event.target.value,
    });
  }
  handleDateChange(date) {
    this.setState(date);
  }
  render() {
    console.log(DateFnsUtils, ' try');
    const { classes, steps } = this.props;
    const { activeStep, gender } = this.state;
    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>All steps completed</Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
              <div className="StepContainer">
                {activeStep === 0 && <div className="FirstStep">
                  <div className="ImagePreview">
                    <img alt="Profile" className="StepperImage" src={this.state.file} />
                  </div>
                  <div className="UploadImageButton">
                    <input onChange={this.handleImgChange} style={{ display: 'none' }} accept="image/*" id="icon-button-file" type="file" />
                    <label htmlFor="icon-button-file">
                      <IconButton color="primary" aria-label="upload picture" component="span">
                        <AddAPhotoIcon style={{ color: 'black', fontSize: 40 }} />
                      </IconButton>
                    </label>
                  </div>
                </div>}
                {activeStep === 1 && <div className="SecondStep">
                  <TextField id="standard-basic" label="Full Name" />
                  <TextField id="standard-basic" label="Phone Number" />
                  <TextField id="standard-basic" label="Address" />
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={gender}
                      onChange={this.handleGenderChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={'Male'}>Male</MenuItem>
                      <MenuItem value={'Female'}>Female</MenuItem>
                      <MenuItem value={'Other'}>Other</MenuItem>
                    </Select>
                  </FormControl>
                  {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      // format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Date picker inline"
                      value={date}
                      onChange={this.handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider> */}

                </div>}
                { activeStep === 2 && <ChatGroups/>}
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.backButton}
                  >
                    Back
                </Button>
                  <Button variant="contained" color="primary" onClick={this.handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(CustomStepper);