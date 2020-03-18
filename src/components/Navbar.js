import React, { Component } from 'react';
import MovieContext, { MovieConsumer } from '../services/context';
import Netflix from '../assets/image/netflix-logo.svg';
import Gift from '../assets/image/gift-icon.svg';
import Bell from '../assets/image/bell-icon.svg';
import User from '../assets/image/user-icon.svg';

class Navbar extends Component {
  componentDidMount() {
    console.log('scrollTop', this.context);
  }
  render() {
    return (
      <MovieConsumer>
        {value => {
          const { scrollTop } = value;
          const navClassName = scrollTop > 0 ? 'black' : '';
          return (
            <div className={`main__header ${navClassName}`}>
              <div className="navbar">
                <nav className="navbar__left">
                  <img
                    className="navbar__left--logo"
                    src={Netflix}
                    alt="Logo Netglix"
                  />
                  <ul className="navbar__left--list">
                    <li className="navbar__left--item">Trending</li>
                    <li className="navbar__left--item">Popular</li>
                    <li className="navbar__left--item">Top Rated</li>
                    <li className="navbar__left--item">Now</li>
                    <li className="navbar__left--item">Coming</li>
                  </ul>
                </nav>
                <div className="navbar__right">
                  <ul className="navbar__right--list">
                    <li className="navbar__right--item">KIDS</li>
                  </ul>
                  <img
                    className="navbar__right--icon"
                    src={Gift}
                    alt="Gift icon"
                  />
                  <img
                    className="navbar__right--icon"
                    src={Bell}
                    alt="Bell icon"
                  />
                  <img
                    className="navbar__right--icon"
                    src={User}
                    alt="User icon"
                  />
                </div>
              </div>
            </div>
          );
        }}
      </MovieConsumer>
    );
  }
}

Navbar.contextType = MovieContext;
export default Navbar;
