import React, { Component } from 'react';
import { connect } from "react-redux";
import { addUser, getUsers, removeUser } from "./redux" 
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import Chris from './components/UserList.jsx'
import MyChart from './components/MyChart.jsx'
import { Calculator } from './components/Calculator.jsx'

import MyGrid from './components/MyGrid.jsx'

import './App.css';

import openSocket from 'socket.io-client'
const socket = openSocket('http:\/\/localhost:8081')

class App extends Component {

  subscribeToTimer = (cb) => {
    socket.on('timer', timestamp => {
      cb(null, timestamp)
    });
    socket.emit('subscribeToTimer');
  }

  constructor(props){
    super(props)

    this.subscribeToTimer((err, timestamp) => this.setState({ timestamp }));

    this.state = { 
      timestamp: 'no timestamp yet'
    }
  }

  componentWillMount(){
    //alert('componentWillMount: Executed just before rendering takes place both on the client as well as server-side. ')
  }

  componentDidMount(){
    //alert('componentDidMount: Executed on the client side only after the first render')
    this.props.getUsers()
  }

  componentWillReceiveProps(){
    //alert('componentWillReceiveProps: Invoked as soon as the props are received from the parent class and before another render is called')
  }

  componentWillUpdate(){
    //alert('componentWillUpdate: Called just before rendering takes place in the DOM')
  }

  componentDidUpdate(){
    //alert('componentDidUpdate: Called immediately after rendering takes place')
  }

  componentWillUnmount(){
    //alert('fasdf')
  }

  render() {
    const { chartOptions, hoverData } = this.state;

    return (
      <div>
        <div>
          <h2>My Collage</h2> 
        </div>
        <Calculator />
        <div>
          <Chris  />
        </div>
       
        <div>
          <span>Real Time update using web sockets</span><br/>
          <span>Time: {this.state.timestamp}</span>
        </div>
        
        <div>
         <MyChart />
        </div>

        <MyGrid />

      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
})

const mapDispatchToProps = {
  getUsers,
  removeUser,
  addUser
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
