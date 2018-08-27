import React, { Component } from 'react';
import logo from './logo.svg';
import FormComponent from './form/formComponent';
import ProgressComponent from './progress/progressComponent';
import HistoryComponent from './history/historyComponent';
import InstructionsComponent from './instructions/instructionsComponent';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      	<div className="progress-wrapper">
      		<ProgressComponent />
      	</div>
        <div className="form-wrapper">
        	<FormComponent />
        </div>
        <div className="history-wrapper">
        	<HistoryComponent />
        </div>
        <div className="instructions-wrapper">
        	{InstructionsComponent()}
        </div>
      </div>
    );
  }
}

export default App;
