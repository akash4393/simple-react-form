export const STEPS = {
	BASIC_INFO: 'BASIC_INFO',
	GOOGLE_ADDRESS: 'GOOGLE_ADDRESS',
	ZILLOW_RESPONSE: 'ZILLOW_RESPONSE',
	COMPLETE: 'COMPLETE'
}

const NEXT_STEP = 'NEXT_STEP';

function nextStep(next, formData) {
	return {
		type: NEXT_STEP,
		next,
		formData
	}
}

export default nextStep;