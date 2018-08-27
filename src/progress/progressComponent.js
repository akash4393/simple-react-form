import React from 'react';
import { connect } from 'react-redux';
import { STEPS } from '../redux/actions';

class ProgressComponent extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
	}

	render() {
		switch(this.props.currentStep){
			case STEPS.BASIC_INFO:
				return(
					<div className="progress-container">
						<h1>Step 1 of 4</h1>
					</div>
				);
			case STEPS.GOOGLE_ADDRESS:
				return(
					<div className="progress-container">
						<h1>Step 2 of 4</h1>
					</div>
				);
			case STEPS.ZILLOW_RESPONSE:
				return(
					<div className="progress-container">
						<h1>Step 3 of 4</h1>
					</div>
				);
			case STEPS.COMPLETE:
				return(
					<div className="progress-container">
						<h1>Step 4 of 4</h1>
					</div>
				);
		}
	}
}

const mapStateToProps = (steps) => ({ currentStep: steps.currentStep });

export default connect(mapStateToProps)(ProgressComponent);