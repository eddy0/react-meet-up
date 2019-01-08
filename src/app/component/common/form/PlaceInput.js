import React, { Component } from 'react'
import { Form, Label } from 'semantic-ui-react'
import Script from 'react-load-script'
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete'

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
          value={input.value || ''}
          options={options}
          onSelect={onSelect}
          debounce={1000}
          searchOptions={options}
          onChange={(address) => {
            input.onChange(address)
          }}
        >
          {(props) => {
            const {getInputProps, suggestions, getSuggestionItemProps, loading} = props
            return (<div>
                <input
                  {...getInputProps({
                    placeholder: placeholder,
                    className: 'location-search-input',
                  })}
                />
                <div className="autocomplete-dropdown-container" style={{position: 'absolute', width: '100%', boxSizing: 'border-box',borderRadius: '2px', boxShadow: '0 3px 5px rgba(0,0,0,0.3) ' }}>
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item'
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? {backgroundColor: '#f3f3f3', cursor: 'pointer', boxShadow: '0 3px 5px rgba(0,0,0,0.3)'}
                      : {backgroundColor: '#ffffff', cursor: 'pointer'}
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                        })}
                        style={Object.assign(style,{padding: '0.5rem'})}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          }
          }
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