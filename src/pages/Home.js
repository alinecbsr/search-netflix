import React, { Component } from 'react';

import Hero from '../components/Hero';
import Popular from '../components/Popular';
import ModalDetail from '../components/ModalDetail';
// import Trending from '../components/Trending';
// import TopRated from '../components/TopRated';
//import Now from '../components/Now';
// import Coming from '../components/Coming';

import 'swiper/css/swiper.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <ModalDetail />
        <Hero />
        <Popular />
        {/* <TopRated /> */}
        {/*<Now />
        <Coming />
        <Trending />
        <Trending />
        <Trending />
        <Trending />
        <Trending /> */}
      </div>
    );
  }
}

export default Home;
