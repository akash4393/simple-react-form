import React from 'react';
import BasicContact from './basicContact';
import AddressInput from './addressInput';
import ZillowInput from './zillowInput';
import SubmitForm from './submitForm';
import { STEPS } from '../redux/actions';
import { connect } from 'react-redux';
import nextStep from '../redux/actions';

const baseUrl = window.location.href;

class FormComponent extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.formData = this.props.steps.formData;
	}

	basicNext(basicFormInfo) {
		this.formData = {...this.formData, ...basicFormInfo};
		this.props.propogateAction(STEPS.GOOGLE_ADDRESS, this.formData);
	}

	addressNext(googleAddressInfo) {
		this.formData = {...this.formData, ...googleAddressInfo};
		this.props.propogateAction(STEPS.ZILLOW_RESPONSE, this.formData);
	}

	zillowNext(rentAmount) {
		let rent = { rent: rentAmount };
		this.formData = {...this.formData, ...rent};
		this.sendRequestToServer();
		this.props.propogateAction(STEPS.BASIC_INFO, {});
	}

	sendRequestToServer() {
		let url = baseUrl + 'sendEmail'
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
            	'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.props.steps.formData)
		})
		.then(res => {
			alert('email sent successfully');
		})
	}

	render() {
		switch(this.props.steps.currentStep){
			case STEPS.BASIC_INFO:
				return(
					<BasicContact data={this.props.steps.formData} onNext={(resp) => {this.basicNext(resp)}} />
				);
			case STEPS.GOOGLE_ADDRESS:
				return(
					<AddressInput data={this.props.steps.formData} onNext={(googleAddressInfo) => {this.addressNext(googleAddressInfo)}} onPrevious={this.addressPrevious} />
				);
			case STEPS.ZILLOW_RESPONSE:
				return(
					<ZillowInput data={this.props.steps.formData} onNext={(rentAmount) => {this.zillowNext(rentAmount)}} address={this.props.steps.formData.address} zip={this.props.steps.formData.zip} onPrevious={this.zillowPrevious} />
				);
			case STEPS.COMPLETE:
				return(
					<SubmitForm data={this.props.steps.formData} onNext={() => {this.submitNext()}} />
				);
		}
	}
}

const mapStateToProps = (steps) => ({ steps });

const bindActionsToDispatch = dispatch => 
(
  {
    propogateAction: (next, data) => dispatch(nextStep(next, data))
  }
);

export default connect(mapStateToProps, bindActionsToDispatch)(FormComponent);