import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './basicContact.css';


class BasicContact extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.state = {
			firstNameValid: this.props.data.firstName ? true : false,
			firstNameValue: this.props.data.firstName || '',
			firstNameError: '',
			lastNameValid: this.props.data.lastName ? true : false,
			lastNameValue: this.props.data.lastName || '',
			lastNameError: '',
			contactValid: this.props.data.contactValue ? true : false,
			contactValue: this.props.data.contactValue || '',
			contactError: '',
			emailValid: this.props.data.emailValue ? true : false,
			emailValue: this.props.data.emailValue || '',
			emailError: '',
			formValid: this.props.data.firstName ? true : false
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
				emailError: 'Please enter a valid email'
			}, this.validateForm);
		}
	}

	validateForm() {
		const formValid = this.state.firstNameValid && this.state.lastNameValid 
			&& this.state.contactValid && this.state.emailValid;
		this.setState({formValid: formValid});
	}

	handleFirstNameChange(firstNameValue) {
		this.setState({ firstNameValue })
	}

	handleLastNameChange(lastNameValue) {
		this.setState({ lastNameValue })
	}

	handleContactChange(contactValue) {
		this.setState({ contactValue })
	}

	handleEmailChange(emailValue) {
		this.setState({ emailValue })
	}

	render() {
		return (
			<div className="basic-contact-wrapper">
				 <TextField
				 	error={!this.state.firstNameValid && this.state.firstNameError !== ''}
          			id="first-name"
          			label="First Name"
          			placeholder="First Name"
          			className={`first-name-text-input ${this.props.customClass}`}
          			margin="normal"
          			value={this.state.firstNameValue}
          			onChange={(e) => {this.handleFirstNameChange(e.target.value)}}
          			onBlur={(e) => {this.validateFirstLastName(e)}}
          			helperText={this.state.firstNameError}
        		/>
        		<TextField
        			error={!this.state.lastNameValid && this.state.lastNameError !== ''}
          			id="last-name"
          			label="Last Name"
          			placeholder="Last Name"
          			className={`last-name-text-input ${this.props.customClass}`}
          			margin="normal"
          			value={this.state.lastNameValue}
          			onChange={(e) => {this.handleLastNameChange(e.target.value)}}
          			onBlur={(e) => {this.validateFirstLastName(e)}}
          			helperText={this.state.lastNameError}
        		/>
        		<TextField
        			error={!this.state.contactValid && this.state.contactError !== ''}
          			id="contact-number"
          			label="Contact Number"
          			placeholder="555-555-5555"
          			className={`contact-text-input ${this.props.customClass}`}
          			margin="normal"
          			value={this.state.contactValue}
          			onChange={(e) => {this.handleContactChange(e.target.value)}}
          			onBlur={(e) => {this.validateContactNumber(e)}}
          			helperText={this.state.contactError}
        		/>
        		<TextField
        			error={!this.state.emailValid && this.state.emailError !== ''}
          			id="contact-email"
          			label="Email"
          			placeholder="email@example.com"
          			className={`email-text-input ${this.props.customClass}`}
          			margin="normal"
          			value={this.state.emailValue}
          			onChange={(e) => {this.handleEmailChange(e.target.value)}}
          			onBlur={(e) => {this.validateEmail(e)}}
          			helperText={this.state.emailError}
        		/>
        		<br />
        		<div className="privacy-agreement">
        			<p>By signing up, I agree to Belong’s
        			<br /><a href="#">Terms of Service</a> 
        			and <a href="#">Privacy Policy.</a></p>
        		</div>
        		<div className='submit-basic-contact-wrapper' >
        			<Button 
			      		variant="contained" 
			      		color="primary" 
			      		onClick={() => {this.nextOnClick()}}
			      		disabled={!this.state.formValid}
			      	>
			        	Enter Property
			      	</Button>
        		</div>
			</div>
		);
	}
}

export default BasicContact;