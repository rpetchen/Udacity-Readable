import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap'
import { filters } from '../config/config.js'

class filterDropDown extends Component {
//renders the list of available filters in the filter drop down
    render() {

        return (

            <DropdownButton
                id={"filter"}
                onSelect={(e, evt) => this.props.filterSelect(e, evt)}
                title={this.props.text}
                style={{
                float: 'right'
            }}>
                <MenuItem>Sorty By</MenuItem>
                <hr/> {filters.map((filter) => {
                    return <MenuItem key={filter} eventKey={filter}>{filter}</MenuItem>
                })}
            </DropdownButton>
        );
    }
}

export default filterDropDown;