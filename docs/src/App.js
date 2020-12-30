import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';

import './App.css';

import { addRoute, removeRoute, aeroBrakeToggle, changeMass, changeYears, changeRocket, changeIon } from './actions/routeaction';

import map from './map_exp';
import { juno, atlas, soyuz, proton, saturn, ion } from './rockets';

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
    if (maneuver.slingshot) {
      return false;
    }
    if (maneuver.max === 0) {
      return false;
    }
    // if (maneuver.min === 0 && years > 1) {
    //   return false;
    // }
    if (years < 0) {
      return false;
    }
    // if (years > maneuver.max + 1) {
    //   return false;
    // }
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
  changeSavedroute(route) {
    localStorage.setItem('currentroute', route);
    window.location.reload();
  }
  deleteSavedroute(route) {
    if (!window.confirm(`Delete ${route}?`)) {
      return false;
    }
    delete this.props.allroutes[route];
    localStorage.setItem('allroutes', JSON.stringify(this.props.allroutes));
    if (route === 'route ' + this.props.currentroute) {
      localStorage.removeItem('currentroute');
    }
    window.location.reload();
  }
  deleteAllSavedroutes() {
    if (!window.confirm(`Clear everything?`)) {
      return false;
    }

    localStorage.clear();

    window.location.reload();
  }
  render() {
    var lastsavedroutenumber = 0;

    const lastroute = this.props.route.slice(-1);
    return (
      <div className="App">

        <div style={{ margin: '20px 0' }}>
          {Object.keys(this.props.allroutes).map(route => {
            var savedroutenumber = parseInt(route.match(/\d+/g)[0], 10);
            lastsavedroutenumber = Math.max(savedroutenumber, lastsavedroutenumber);
            return <div key={route} style={{ width: "185px", display: 'inline-block' }}>
              <button onClick={() => this.changeSavedroute(savedroutenumber)} className={route === 'route ' + this.props.currentroute ? 'success' : 'default'} style={{ margin: '10px 0' }}>{route}</button>
              <button onClick={() => this.deleteSavedroute(route)} className={'danger small'} >X</button>
            </div>
          })}
        </div>

        <div >
          <button className={'success'} onClick={() => this.changeSavedroute(lastsavedroutenumber + 1)}>New</button>
          <button style={{ width: '55px' }} onClick={() => this.deleteAllSavedroutes()} className={'danger small'} >Clear</button>
        </div>


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
              <th>Payload</th>
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
                <td style={{ color: i === 0 && region.extraMass <= 0 ? 'red' : 'inherit' }}>
                  <button className={"danger rounded small"} onClick={() => this.changeMass(region.extraMass - 1, i)}>-</button>
                  {region.extraMass}
                  <button className={"success rounded small"} onClick={() => this.changeMass(region.extraMass + 1, i)}>+</button>
                </td>
                <td>
                  {region.mass}
                </td>
                <td style={{ color: (maneuver && region.mass * region.difficulty > region.thrust) ? 'red' : 'green' }}>
                  {region.thrust} {maneuver && "/ " + (region.mass * region.difficulty)}
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
        <table className="bordered">
          <thead>
            <tr>
              <th>MANEUVER</th>
              <th>DIFF</th>
              <th>PAYLOAD MASS</th>
              <th>ROCKETS</th>
            </tr>
          </thead>
          <tbody>
            {this.props.route.map((region, i) => {
              if (!region.maneuver) {
                return null;
              }
              var rockets = '';
              if (region.years > 0 && this.props.ion > 0) {
                rockets += this.props.ion + 'x Ion Thrusters, ';
              }
              if (region.juno > 0) {
                rockets += region.juno + 'x Juno, ';
              }
              if (region.atlas > 0) {
                rockets += region.atlas + 'x Atlas, ';
              }
              if (region.soyuz > 0) {
                rockets += region.soyuz + 'x Soyuz, ';
              }
              if (region.proton > 0) {
                rockets += region.proton + 'x Proton, ';
              }
              if (region.saturn > 0) {
                rockets += region.saturn + 'x Saturn, ';
              }
              return <tr key={i}>
                <td>{region.name}</td>
                <td>{region.difficulty}</td>
                <td>{region.mass - region.rocketMass - this.props.ion * ion.mass}</td>
                <td>{rockets.slice(0, -2)}</td>
              </tr>
            })}
          </tbody>
        </table>

      </div>
    )
  };
}


export default connect((state, ownProps) => ({
  currentroute: ownProps.currentroute,
  allroutes: ownProps.allroutes,
  route: state.routeReducer.route,
  ion: state.routeReducer.ion,
}), { addRoute, removeRoute, aeroBrakeToggle, changeMass, changeYears, changeRocket, changeIon })(App);
