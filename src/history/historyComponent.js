import React from 'react';
import { connect } from 'react-redux';
import { STEPS } from '../redux/actions';

class HistoryComponent extends React.Component {
	constructor(props) {
		super(props);
		this.props = props;
		this.data = [];
	}

	loadDataFromLocalStorage() {
		if(this.data.length === window.localStorage.length) {
			return;
		} else {
			this.data = [];
			for (let i = 0; i < window.localStorage.length; ++i ) {
				this.data.push(JSON.parse(window.localStorage.getItem(window.localStorage.key(i))));
			}
		}
	}

	render() {
		this.loadDataFromLocalStorage();
		return(
			<div>
				<h4>History</h4>
				<ul>
					{this.data.map((entry, index) => {
						if(entry === undefined || entry === null){
							return;
						}
						let listString = entry.address + ' - $' + entry.rent;
						return(
							<li key={index}>{listString}</li>
						); 
					})}
				</ul>
			</div>
		);
	}
}

const mapStateToProps = (steps) => ({ currentStep: steps.currentStep });

export default connect(mapStateToProps)(HistoryComponent);