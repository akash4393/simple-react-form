import { STEPS } from './actions';

const DEFAULT_STATE = {
	currentStep: STEPS.ZILLOW_RESPONSE,//STEPS.BASIC_INFO,
	formData: {}
}

export default function steps(state = DEFAULT_STATE, action) {
	console.log('reducer');
	console.log(action);
	switch(action.type) {
		case 'NEXT_STEP':
			let currentStep = action.next;
			let formData = Object.assign({}, action.formData);
			return Object.assign({}, {currentStep, formData});
		default:
			return state;
	}
}