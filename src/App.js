import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (

      <div>
         <NavBar />
        <Router>
         
          <Routes />
          <Route exact path="/business" element={<News key="general" pageSize={6} country="in" category="business" />} />
          <Routes />
        </Router>
      </div>


    )
  }
}
