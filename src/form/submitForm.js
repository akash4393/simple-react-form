import React from 'react';
import Button from '@material-ui/core/Button';

const baseUrl = window.location.href;

class SubmitForm extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	storeInLocalStorage() {
		window.localStorage.setItem(this.props.data.emailValue, JSON.stringify(this.props.data));
	}

	sendRequestToServer() {
		let url = baseUrl + 'sendEmail'
		fetch(url, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
            	'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.props.data)
		})
		.then(res => {
			alert('email sent successfully');
		})
	}

	nextOnClick() {
		this.storeInLocalStorage();
		this.sendRequestToServer();
		this.props.onNext();
	}

	render() {
		return(
			<div>
				<h4>Confirm</h4>
				<p>
					<strong>Name:&nbsp;</strong>
					<span>{this.props.data.firstName + ' ' + this.props.data.lastName}</span>
				</p>
				<p>
					<strong>Email:&nbsp;</strong>
					<span>{this.props.data.emailValue}</span>
				</p>
				<p>
					<strong>Contact:&nbsp;</strong>
					<span>{this.props.data.contactValue}</span>
				</p>
				<p>
					<strong>Address:&nbsp;</strong>
					<span>{this.props.data.address + ' - ' + this.props.data.zip}</span>
				</p>
				<p>
					<strong>Rent:&nbsp;</strong>
					<span>{this.props.data.rent}</span>
				</p>
				<Button 
					variant="contained" 
					color="primary" 
					className='' 
					onClick={() => {this.nextOnClick()}}
				>
					Submit!
				</Button>
			</div>
		);
	}
}

export default SubmitForm;