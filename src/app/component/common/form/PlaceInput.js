import React, {Component} from 'react'
import {Form, Label} from 'semantic-ui-react'
import Script from 'react-load-script'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'
import Flatpickr from './DateInput'

const styles = {
  autocompleteContainer: {
    zIndex: 1000
  }
}

class PlaceInput extends Component {
  state = {
    scriptLoaded: false
  }

  handleScriptLoaded = () => this.setState({scriptLoaded: true})

  render() {
    const {
      input,
      width,
      onSelect,
      placeholder,
      options,
      meta: {touched, error}
    } = this.props
    return (
      <Form.Field error={touched && !!error} width={width}>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAYVHNqmifVNgbn_Rzm1SLViGST1YOlfFg&libraries=places&language=en"
          onLoad={this.handleScriptLoaded}
        />
        {this.state.scriptLoaded &&
        <PlacesAutocomplete
          value={input.value}
          inputProps={{...input, placeholder}}
          options={options}
          onSelect={onSelect}
          styles={styles}
          onChange={(address) => {
            input.onChange(address)
          }}
        >
          {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item'
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? {backgroundColor: '#fafafa', cursor: 'pointer'}
                    : {backgroundColor: '#ffffff', cursor: 'pointer'}
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        }
        {touched &&
        error && (
          <Label basic color="red">
            {error}
          </Label>
        )}
      </Form.Field>
    )
  }
}

export default PlaceInput