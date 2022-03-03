import React, { Component } from 'react';


class NumberOfEvents extends Component {

    render() {
        return(
            <div className="NumberOfEvents">
                <label className="inputLabel" name="numberOfEvents">Amount of viewable cities:</label>
                <input 
                    type="number" 
                    className="numberOfEvents"
                    value={this.props.numberOfEvents} 
                    onChange={event=>this.props.updateNumberOfEvents(event.target.value)} 
                />
            </div>
        )
    }
};

export default NumberOfEvents;