import React, { Component } from 'react';
import { ErrorAlert } from './Alert';


class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32
    };

    handleInputChanged = (event) => {
        const number = event.target.value;
        if (number <= 0 || number > 32) {
            this.setState({
                numberOfEvents: number,
                infoText: 'Number must be between 1 and 32'
            });
        } else {
             this.setState({
                numberOfEvents: number,
                infoText: ''
            });
            this.props.updateNumberOfEvents(number);
        }
    };


    render() {
        return(
            <div className="NumberOfEvents">
                <ErrorAlert text={this.state.infoText} />
                <label className="inputLabel" name="numberOfEvents">Amount of viewable cities:</label>
                <input 
                    type="number" 
                    className="numberOfEvents"
                    value={this.props.numberOfEvents} 
                    onChange={this.handleInputChanged} 
                />
            </div>
        )
    }
};

export default NumberOfEvents;