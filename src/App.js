import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';
import WelcomeScreen from './WelcomeScreen';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import EventGenre from './EventGenre';

class App extends Component {
  
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    showWelcomeScreen: undefined
  }



  updateEvents = (location) => {
      getEvents().then((events) => {
        if (location) {
          const locationEvents = (location === 'all') ?
              events :
              events.filter((event) => event.location === location);
          if (this.mounted) {    
              this.setState({
                  events: locationEvents.slice(0, this.state.numberOfEvents),
                  currentLocation: location
              });
          }    
      } else {
        this.setState({
          events: this.state.events.slice(0, this.state.numberOfEvents),
        });
      }
    });  
  }

  updateNumberOfEvents = (eventCount) => {
    this.setState({
      numberOfEvents: eventCount,
    });
    this.updateEvents(this.state.currentLocation);
  };

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }  

  componentWillUnmount(){
    this.mounted = false;
  }  

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    const { locations, numberOfEvents, events} = this.state;
    
    return (
      <div className="App">
        <img className="banner" src="./images/banner.png" alt="Banner" class="center"/>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <NumberOfEvents numberOfEvents={numberOfEvents} updateNumberOfEvents={this.updateNumberOfEvents} />
        <div className="graph-div">
          <div className="pie-chart">
          <EventGenre events={events}/>
          </div>
          <ResponsiveContainer className="scatter-grid" height={400} >
            <ScatterChart
              margin={{ 
                top: 20, right: 20, bottom: 10, left: 10 
              }}
            >
            <CartesianGrid/>
            <XAxis type="category" dataKey="city" name="City" />
            <YAxis type="number" dataKey="number" name="Total Events" allowDecimals={false} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <h3 className="text-style">-Events in each city-</h3>
        <EventList events={events} /> 
      </div>
    );
  }
}

export default App;
