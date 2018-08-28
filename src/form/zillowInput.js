import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const baseUrl = window.location.href;

class ZillowInput extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			rent: 0,
			rentEstimateLow: 0,
			rentEstimateHigh: 0,
			formError: '',
			formValid: false,
			loading: true,
			messageCode: 999
		}
		this.sendRequest();
	}

	sendRequest() {
		let requestBody = {
			address: this.props.address,
			zip: this.props.zip
		};
		let url = baseUrl + 'getRent'
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
            	'Content-Type': 'application/json'
			},
			body: JSON.stringify(requestBody)
		})
		.then(resp => resp.text())
		.then(text => ((new window.DOMParser()).parseFromString(text, "text/xml")))
		.then(body => { this.parseResponse(body); });
	}

	parseResponse(xmlResponse) {
		this.setState({ loading: false });
		let rentEstimateLow = 0, rentEstimateHigh = 0, monthlyRent = 0;
		let messageCode = parseInt(xmlResponse.querySelectorAll('message > code')[0].innerHTML);
		if(messageCode === 508) {
			this.setState({
				formError: 'Address not found on Zillow. Please reload this page and try again with a different address.',
				formValid: false,
				messageCode: messageCode
			});
			return;
		} else if(messageCode === 0) {
			let searchResults = xmlResponse.getElementsByTagName('response')[0].childNodes[0];
			if(searchResults.getElementsByTagName('rentzestimate').length !== 0) {
				monthlyRent = parseInt(searchResults.querySelectorAll('rentzestimate > amount')[0].innerHTML);
				rentEstimateLow = parseInt(searchResults.querySelectorAll('rentzestimate > valuationRange > low')[0].innerHTML);
				rentEstimateHigh = parseInt(searchResults.querySelectorAll('rentzestimate > valuationRange > high')[0].innerHTML);
			} else {
				let propertyValue = parseInt(searchResults.querySelectorAll('zestimate > amount')[0].innerHTML);
				monthlyRent = Math.round(((5/100)*propertyValue)/12);
				rentEstimateLow = Math.round(monthlyRent - (monthlyRent/10));
				rentEstimateHigh = Math.round(monthlyRent + (monthlyRent/10));
			}
		} else {
			this.setState({
				formError: 'An error has occured. Please try again.',
				formValid: false,
				messageCode: messageCode
			});
			return;
		}
		this.setState({
			rentEstimateLow: rentEstimateLow,
			rentEstimateHigh: rentEstimateHigh,
			rent: monthlyRent,
			messageCode: messageCode
		}, this.validateForm)
	}

	validateForm() {
		let rentConditionsMet = this.state.rent !== 0 && (this.state.rent <= this.state.rentEstimateHigh && this.state.rent >= this.state.rentEstimateLow);
		let noErrors = this.state.formError === '';
		if(rentConditionsMet) {
			this.setState({
				formError: '',
				formValid: true
			})
		} else {
			this.setState({
				formError: 'Please enter a rent value within the displayed range.',
				formValid: false
			});
		}
	}

	nextOnClick() {
		this.props.onNext(this.state.rent);
	}

	updateRentValue(value) {
		let newRent = parseInt(value);
		if(isNaN(newRent)) {
			this.setState({
				formValid: false,
				formError: 'Please enter a valid rent amount.'
			})
		} else {
			this.setState({
				rent: newRent
			}, this.validateForm)
		}
	}

	render() {
		if(this.state.loading) {
			return (
				<div>
					Loading...
				</div>
			);
		} else if(!this.state.loading && this.state.messageCode === 0) {
			return (
				<div>
					<h4>Range</h4>
					<p>
						<span>{this.state.rentEstimateLow}</span>
						-
						<span>{this.state.rentEstimateHigh}</span>
					</p>
					<TextField
						error={!this.state.formValid}
						id="rent-input"
						label="Enter Rent"
						placeholder="Enter Rent"
						className={`text-input ${this.props.customClass}`}
						margin="normal"
						value={this.state.rent}
						onChange={(e) => {this.updateRentValue(e.target.value)}}
						helperText={this.state.formError}
					/>
					<Button 
					variant="contained" 
					color="primary" 
					className='' 
					onClick={() => {this.nextOnClick()}}
					disabled={!this.state.formValid}
					>
						Next
					</Button>
				</div>
			);
		} else if(!this.state.loading && this.state.messageCode !== 0) {
			return(
				<h4>{this.state.formError}</h4>
			);
		}
	}
}

export default ZillowInput;