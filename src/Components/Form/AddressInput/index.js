import React from 'react'
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import './index.css'
// import { Close } from '@material-ui/icons';

export default function AddressInput({ value, addressPick, dark}) {

    const _suggestionSelect = (result) => {
        addressPick('address', result)
    }
    const theme = dark ? 'dark' : ""
    return (
        <div className={`address-input-main ${theme}`}>
            <MapboxAutocomplete
                publicKey={process.env.REACT_APP_MAPBOX_KEY}
                onSuggestionSelect={_suggestionSelect}
                country='za'
                placeholder="Address"
                query={value}
            />
            {/* <div className="cancel-button" onClick={() => _suggestionSelect("")}>
                <Close style={{ margin: '2px 0px 0px 2px', fontSize: 20, color:'#707070'}}/>
            </div> */}
        </div>

    )
}