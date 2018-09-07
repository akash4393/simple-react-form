import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './zillowInput.css';

const baseUrl = window.location.href;

class ZillowInput extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			rent: this.props.data.rent || '',
			rentEstimateLow: 0,
			rentEstimateHigh: 0,
			formError: '',
			formValid: this.props.data.rent ? true : false,
			loading: this.props.data.rent ? false : true,
			messageCode: 999,
			zillowRent: this.props.data.rent || 0
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
			zillowRent: monthlyRent,
			messageCode: messageCode
		}, this.validateForm)
	}

	validateForm() {
		let rentConditionsMet;
		if(this.state.rent === undefined || this.state.rent === '') {
			rentConditionsMet = true;
		} else {
			rentConditionsMet = this.state.rent !== 0 && (this.state.rent <= this.state.rentEstimateHigh && this.state.rent >= this.state.rentEstimateLow);
		}
		let noErrors = this.state.formError === '';
		if(rentConditionsMet) {
			this.setState({
				formError: '',
				formValid: true
			})
		} else {
			this.setState({
				formError: 'Please enter a rent value within range.',
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
					<h1>Loading...</h1>
				</div>
			);
		} else if(!this.state.loading && this.state.messageCode === 0) {
			return (
				<div className="zillow-input-wrapper">
					<img src="images/green_bird.svg" />
					<h2>Found your place!</h2>
					<p className="market-text">
						Based on market data,<br />
						we estimate you can change this much monthly:
					</p>
					<div className="zillow-rent-response">
						${this.state.zillowRent}
					</div>
					<p className="did-you-expect-text">
						Did you expect a different amount?<br />
						We'll try to make it happen!
					</p>
					<TextField
						error={!this.state.formValid}
						id="rent-input"
						label="Preferred Rent ($)"
						placeholder="Preferred Rent ($)"
						className={`preferred-rent-text-input ${this.props.customClass}`}
						margin="normal"
						value={this.state.rent}
						onChange={(e) => {this.updateRentValue(e.target.value)}}
						helperText={this.state.formError}
					/>
					<div className="done-button-wrapper">
						<Button 
						variant="contained" 
						color="primary" 
						className='' 
						onClick={() => {this.nextOnClick()}}
						disabled={!this.state.formValid}
						>
							Done
						</Button>
					</div>
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