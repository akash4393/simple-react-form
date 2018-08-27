import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class BasicContact extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			firstNameValid: false,
			firstNameValue: '',
			firstNameError: '',
			lastNameValid: false,
			lastNameValue: '',
			lastNameError: '',
			contactValid: false,
			contactValue: '',
			contactError: '',
			emailValid: false,
			emailValue: '',
			emailError: '',
			formValid: false
		};
	}

	nextOnClick() {
		this.props.onNext({
			firstName: this.state.firstNameValue,
			lastName: this.state.lastNameValue,
			contactValue: this.state.contactValue,
			emailValue: this.state.emailValue
		});
	}

	validateFirstLastName(event) {
		const value = event.target.value;
		const id = event.target.id;

		const nameExp = /^[a-zA-Z]{2,15}$/;

		if(id === 'first-name') {
			if(nameExp.test(value)) {
				this.setState({
					firstNameValid: true,
					firstNameValue: value,
					firstNameError: ''
				}, this.validateForm);
			} else {
				this.setState({
					firstNameValid: false,
					firstNameValue: '',
					firstNameError: 'Please enter a valid first name'
				}, this.validateForm);
			}
		} else if(id === 'last-name') {
			if(nameExp.test(value)) {
				this.setState({
					lastNameValid: true,
					lastNameValue: value,
					lastNameError: ''
				}, this.validateForm);	
			} else {
				this.setState({
					lastNameValid: false,
					lastNameValue: '',
					lastNameError: 'Please enter a valid last name'
				}, this.validateForm);
			}
		}
	}

	validateContactNumber(event) {
		const value = event.target.value;

		const contactExp = /^[0-9]{3}[/-][0-9]{3}[/-][0-9]{4}$/;

		if(contactExp.test(value)) {
			this.setState({
				contactValid: true,
				contactValue: value,
				contactError: ''
			}, this.validateForm);
		} else {
			this.setState({
				contactValid: false,
				contactValue: '',
				contactError: 'Please enter the number in 555-555-5555 format'
			}, this.validateForm);
		}
	}

	validateEmail(event) {
		const value = event.target.value;

		const emailExp = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

		if(emailExp.test(value)) {
			this.setState({
				emailValid: true,
				emailValue: value,
				emailError: ''
			}, this.validateForm);
		} else {
			this.setState({
				emailValid: false,
				emailValue: value,
				emailError: 'Please enter a valid email'
			}, this.validateForm);
		}
	}

	validateForm() {
		const formValid = this.state.firstNameValid && this.state.lastNameValid 
			&& this.state.contactValid && this.state.emailValid;
		this.setState({formValid: formValid});
	}

	render() {
		return (
			<div>
				<h4>Basic Contact information</h4>
				 <TextField
				 	error={!this.state.firstNameValid && this.state.firstNameError !== ''}
          			id="first-name"
          			label="First Name"
          			placeholder="First Name"
          			className={`text-input ${this.props.customClass}`}
          			margin="normal"
          			onChange={(e) => {this.validateFirstLastName(e)}}
          			helperText={this.state.firstNameError}
        		/>
        		<TextField
        			error={!this.state.lastNameValid && this.state.lastNameError !== ''}
          			id="last-name"
          			label="Last Name"
          			placeholder="Last Name"
          			className={`text-input ${this.props.customClass}`}
          			margin="normal"
          			onChange={(e) => {this.validateFirstLastName(e)}}
          			helperText={this.state.lastNameError}
        		/>
        		<br />
        		<TextField
        			error={!this.state.contactValid && this.state.contactError !== ''}
          			id="contact-number"
          			label="Contact Number"
          			placeholder="555-555-5555"
          			className={`text-input ${this.props.customClass}`}
          			margin="normal"
          			onChange={(e) => {this.validateContactNumber(e)}}
          			helperText={this.state.contactError}
        		/>
        		<TextField
        			error={!this.state.emailValid && this.state.emailError !== ''}
          			id="contact-email"
          			label="Email"
          			placeholder="email@example.com"
          			className={`text-input ${this.props.customClass}`}
          			margin="normal"
          			onChange={(e) => {this.validateEmail(e)}}
          			helperText={this.state.emailError}
        		/>
        		<br />
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
	}
}

export default BasicContact;