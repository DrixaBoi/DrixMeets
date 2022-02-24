import React, { Component } from 'react';


class NumberOfEvents extends Component {

    render() {
        return(
            <div className="NumberOfEvents">
                <input type="number" className="numberOfEvents"
                value={this.props.numberOfEvents} 
                onChange={event=>this.props.updateNumberOfEvents(event.target.value)} />
            </div>
        )
    }
};

export default NumberOfEvents;