import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import './App.css';

import { addRoute, removeRoute, aeroBrakeToggle, changeMass, changeYears, changeRocket, changeIon } from './actions/routeaction';

import map from './map_exp';
import { juno, atlas, soyuz, proton, saturn } from './rockets';

class App extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { route: null };
  }
  addRoute = (event, lastroute) => {
    if (lastroute.length === 0 || this.state.route.to.find(element => element.id === lastroute[0].id)) {
      this.props.addRoute(this.state.route);
      return true;
    }

    console.info('NO');
    return false;
  }
  removeRoute = (i) => {
    this.props.removeRoute(i);
  }
  aeroBrakeToggle = (i) => {
    this.props.aeroBrakeToggle(i);
  }
  routes = (event) => {
    this.setState({ route: event.value })
  }
  changeMass = (mass, i) => {
    this.props.changeMass(mass, i);
  }
  changeRocket = (count, i, rocket) => {
    this.props.changeRocket(count, i, rocket);
  }
  changeIon = (count) => {
    this.props.changeIon(count);
  }
  yearValidator(years, maneuver) {
    if (maneuver.max === 0) {
      return false;
    }
    if (maneuver.min === 0 && years > 1) {
      return false;
    }
    if (years < 0) {
      return false;
    }
    if (years > maneuver.max + 1) {
      return false;
    }
    if (maneuver.min > 0 && years === 0) {
      return false;
    }
    return true;
  }
  changeYears = (years, i, maneuver) => {
    if (!this.yearValidator(years, maneuver)) {
      return false;
    }
    this.props.changeYears(years, i);
  }
  render() {
    const lastroute = this.props.route.slice(-1);
    return (
      <div className="App">

        <div style={{ marginTop: '10px', marginLeft: 'auto', marginRight: 'auto', width: '80%' }}>
          <Select onChange={this.routes} options={map.filter(region => lastroute.length === 0 || region.to.find(element => element.id === lastroute[0].id)).map(region => ({ value: region, label: region.name }))} />

          <button style={{ marginTop: '10px' }} className={"success"} onClick={event => this.addRoute(event, lastroute)}>Add Route</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Region</th>
              <th>Difficulty</th>
              <th>Years</th>
              <th>Mass</th>
              <th>Total Mass</th>
              <th>Thrust</th>
              <th colSpan="6">Rockets</th>
            </tr>
            <tr>
              <th colSpan="6"></th>
              <th>Juno</th>
              <th>Atlas</th>
              <th>Soyuz</th>
              <th>Proton</th>
              <th>Saturn</th>
              <th>Ion</th>
            </tr>
          </thead>
          <tbody>
            {this.props.route.map((region, i) => {
              const maneuver = region.maneuver ? (region.maneuver.aerobraking && region.aerobraking ? region.maneuver.aerobraking : region.maneuver) : null;
              return <tr key={i}>
                <td>
                  <button className={"danger rounded small"} onClick={() => window.confirm(`Remove ${region.name}?`) && this.removeRoute(i)}>X</button>
                  {region.name}
                  {maneuver && region.maneuver.aerobraking && <button className={"rounded small " + (region.aerobraking ? 'success' : 'danger strikethrough')} onClick={() => this.aeroBrakeToggle(i)}>Aero</button>}
                </td>
                <td>
                  {maneuver ? region.difficulty : '?'}
                </td>
                <td>
                  {maneuver ?
                    <div>
                      <button className={"rounded small" + (this.yearValidator(region.years - 1, maneuver) ? " danger" : '')} disabled={!this.yearValidator(region.years - 1, maneuver)} onClick={() => this.changeYears(region.years - 1, i, maneuver)}>-</button>
                      {region.years}
                      <button className={"rounded small" + (this.yearValidator(region.years + 1, maneuver) ? " success" : '')} disabled={!this.yearValidator(region.years + 1, maneuver)} onClick={() => this.changeYears(region.years + 1, i, maneuver)}>+</button>
                    </div> : '?'}
                </td>
                <td>
                  <button className={"danger rounded small"} onClick={() => this.changeMass(Math.max(0, region.extraMass - 1), i)}>-</button>
                  {region.extraMass}
                  <button className={"success rounded small"} onClick={() => this.changeMass(region.extraMass + 1, i)}>+</button>
                </td>
                <td style={{ color: (maneuver && region.mass * region.difficulty > region.thrust) ? 'red' : 'green' }}>
                  {region.mass} {maneuver && "(" + (region.mass * region.difficulty) + ")"}
                </td>
                <td>
                  {region.thrust}
                </td>
                <td>
                  <button className={"danger rounded small"} onClick={() => this.changeRocket(Math.max(0, region.juno - 1), i, juno)}>-</button>
                  {region.juno}
                  <button className={"success rounded small"} onClick={() => this.changeRocket(region.juno + 1, i, juno)}>+</button>
                </td>
                <td>
                  <button className={"danger rounded small"} onClick={() => this.changeRocket(Math.max(0, region.atlas - 1), i, atlas)}>-</button>
                  {region.atlas}
                  <button className={"success rounded small"} onClick={() => this.changeRocket(region.atlas + 1, i, atlas)}>+</button>
                </td>
                <td>
                  <button className={"danger rounded small"} onClick={() => this.changeRocket(Math.max(0, region.soyuz - 1), i, soyuz)}>-</button>
                  {region.soyuz}
                  <button className={"success rounded small"} onClick={() => this.changeRocket(region.soyuz + 1, i, soyuz)}>+</button>
                </td>
                <td>
                  <button className={"danger rounded small"} onClick={() => this.changeRocket(Math.max(0, region.proton - 1), i, proton)}>-</button>
                  {region.proton}
                  <button className={"success rounded small"} onClick={() => this.changeRocket(region.proton + 1, i, proton)}>+</button>
                </td>
                <td>
                  <button className={"danger rounded small"} onClick={() => this.changeRocket(Math.max(0, region.saturn - 1), i, saturn)}>-</button>
                  {region.saturn}
                  <button className={"success rounded small"} onClick={() => this.changeRocket(region.saturn + 1, i, saturn)}>+</button>
                </td>
                <td>
                  <button className={"danger rounded small"} onClick={() => this.changeIon(Math.max(0, this.props.ion - 1))}>-</button>
                  {this.props.ion}
                  <button className={"success rounded small"} onClick={() => this.changeIon(this.props.ion + 1)}>+</button>
                </td>

              </tr>
            })}
          </tbody>
        </table>




      </div>
    )
  };
}


export default connect((state) => ({
  route: state.routeReducer.route,
  ion: state.routeReducer.ion,
}), { addRoute, removeRoute, aeroBrakeToggle, changeMass, changeYears, changeRocket, changeIon })(App);
