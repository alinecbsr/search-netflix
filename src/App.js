import React, { Component } from 'react';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';

import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
