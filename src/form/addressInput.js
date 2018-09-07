import React from 'react';
import PlacesAutocomplete, { 
	geocodeByAddress
} from 'react-places-autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './addressInput.css'

class AddressInput extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { 
		address: this.props.data.address || '',
		zip: '',
		error: '',
		formValid: this.props.data.address ? true : false
    };
  }

  handleChange(address) {
    this.setState({ address });
  }

  handleSelect(address) {
  	geocodeByAddress(address).then((resp) => {
  		let zipCode = resp[0].address_components.filter(component => {
  			return component.types[0] === 'postal_code'
  		})[0].long_name;
  		let zillowCompatibleFormat = ''
  		resp[0].address_components.forEach(component => {
  			if(component.types[0] === 'street_number'){
  				zillowCompatibleFormat += component.short_name + ' ';
  			} else if(component.types[0] === 'route' || component.types[0] === 'locality') {
  				zillowCompatibleFormat += component.short_name + ', ';
  			} else if(component.types[0] === 'administrative_area_level_1') {
  				zillowCompatibleFormat += component.short_name;
  			}
  		})
  		this.setState({ address: zillowCompatibleFormat, zip: zipCode }, this.validateForm);
  	}).catch(err => {
  		this.setState({ formValid: false });
  	})
  }

  handleError(error) {
  	this.setState({
  		error: error
  	}, this.validateForm)
  }

  validateForm() {
  	if(this.state.address !== '' && this.state.error === '') {
  		this.setState({ formValid: true })
  	}
  }

  nextOnClick() {
  	this.props.onNext({ address: this.state.address, zip: this.state.zip })
  }

  render() {
    return (
		<div>
			<PlacesAutocomplete
				value={this.state.address}
				onChange={this.handleChange.bind(this)}
				onSelect={this.handleSelect.bind(this)}
				onError={this.handleError.bind(this)}
			>
			{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
				<div className="address-input-wrapper">
					<TextField
						{...getInputProps({
						placeholder: 'Search Places ...',
						className: 'location-search-input',
						})}
						id="address-input"
						label="Enter Address"
						placeholder="eg. 1 Important Road, Palo Alto, CA"
						className={`address-text-input ${this.props.customClass}`}
						margin="normal"
						value={this.state.address}
					/>
					<div className="autocomplete-dropdown-container">
						{loading && <div>Loading...</div>}
						{suggestions.map(suggestion => {
							const className = suggestion.active
							? 'suggestion-item--active'
							: 'suggestion-item';
							// inline style for demonstration purpose
							const style = suggestion.active
							? { cursor: 'pointer' }
							: { cursor: 'pointer' };
							document.querySelector('.submit-address-wrapper').style.paddingTop = '0%';
							return (
								<div
									{...getSuggestionItemProps(suggestion, {
									className,
									style,
									})}
								>
									<span>{suggestion.description}</span>
								</div>
							);
						})}
					</div>
				</div>
			)}
			</PlacesAutocomplete>
			<div className="submit-address-wrapper">
				<Button 
					variant="contained" 
					color="primary" 
					className='' 
					onClick={() => {this.nextOnClick()}}
					disabled={!this.state.formValid}
				>
					Estimate Rent
				</Button>
			</div>
		</div>
	);
  }
}

export default AddressInput;