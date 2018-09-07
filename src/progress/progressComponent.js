import React from 'react';
import { connect } from 'react-redux';
import { STEPS } from '../redux/actions';
import nextStep from '../redux/actions';
import './progressComponent.css'

class ProgressComponent extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.backEnabled = false;
		this.currentStepStringToDisplay = null;
	}

	previousClicked() {
		console.log('in previousClicked');
		console.log(this.props);
		switch(this.props.steps.currentStep){
			case STEPS.GOOGLE_ADDRESS:
				this.props.propogateAction(STEPS.BASIC_INFO, this.props.steps.formData)
				break;
			case STEPS.ZILLOW_RESPONSE:
				this.props.propogateAction(STEPS.GOOGLE_ADDRESS, this.props.steps.formData)
				break;
			case STEPS.COMPLETE:
				break;
		}
	}

	render() {
		switch(this.props.steps.currentStep){
			case STEPS.BASIC_INFO:
				this.currentStepStringToDisplay = 'Sign Up';
				this.backEnabled = false;
				break;
			case STEPS.GOOGLE_ADDRESS:
				this.currentStepStringToDisplay = 'Home Address';
				this.backEnabled = true;
				break;
			case STEPS.ZILLOW_RESPONSE:
				this.currentStepStringToDisplay = 'Success';
				this.backEnabled = true;
				break;
			case STEPS.COMPLETE:
				break;
		}

		return(
			<div className="nav-wrapper">
				<nav>
					<div onClick={this.previousClicked.bind(this)} className={`back-button ${this.backEnabled ? 'show' : 'hidden'}`}>
						<img src="images/ic_close@2x.png" />
					</div>
					<h1>{this.currentStepStringToDisplay}</h1>
					<div className="twenty-four-seven-image-wrapper">
						<img src="images/ic_support@2x.png" />
					</div>
				</nav>
			</div>
		);
	}
}

const mapStateToProps = (steps) => ({ steps });
const bindActionsToDispatch = dispatch => 
(
  {
    propogateAction: (next, data) => dispatch(nextStep(next, data))
  }
);

export default connect(mapStateToProps, bindActionsToDispatch)(ProgressComponent);