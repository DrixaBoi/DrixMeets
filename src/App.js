import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { NumberOfEvents } from './NumberOfEvents';

class App extends Component {
  
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32
  }
  
  updateEvents = (location, eventCount = this.state.numberOfEvents) => {
    this.setState({ isOnline: navigator.onLine ? true: false });
    getEvents().then((events) => {
      const locationEvents = (location === 'all') 
      ? events
      : events.filter((event) => event.location === location);
      if(this.mounted) {
        this.setState({
        events: locationEvents.slice(0, eventCount),
        location: location,
        currentLocation: location
      });
      }
        });    
    };
  
    updateNumberOfEvents = async (e) => {
      const newNumber = e.target.value ? parseInt(e.target.value) : 100;
  
      if(newNumber < 1 || newNumber > 100){
          this.setState({ 
          numberOfEvents: newNumber,
          errorText: 'Please choose a number between 0 and 100' 
      });
      } else {
          this.setState({
          errorText:'',
          numberOfEvents: newNumber
        });
        this.updateEvents(this.state.currentLocation, this.state.numberOfEvents);
      } 
    };

  render() {
    return (
      <div className="App">
        <CitySearch />
        <EventList /> 
        <NumberOfEvents />
      </div>
    );
  }
}

export default App;
