import React, { Component } from 'react';
import logo from './logo.svg';
import FormComponent from './form/formComponent';
import ProgressComponent from './progress/progressComponent';
import HistoryComponent from './history/historyComponent';
import InstructionsComponent from './instructions/instructionsComponent';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
    light: '#008AEE',
    main: '#009BFF',
    dark: '#008AEE',
    contrastText: '#fff',
    },
  }
})

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
        	<div className="progress-wrapper">
        		<ProgressComponent />
        	</div>
          <div className="form-wrapper">
          	<FormComponent />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
