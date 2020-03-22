import React, { Component } from 'react';
import MovieContext, { MovieConsumer } from '../services/context';
import SearchIcon from '../assets/image/research-icon.svg';

class Research extends Component {
  render() {
    return (
      <MovieConsumer>
        {value => {
          return (
            <form inline className="search" /* onSubmit={value.handleSubmit} */>
              <img
                src={SearchIcon}
                className="search__icon"
                alt="search icon"
              />
              <input
                /* onChange={value.handleChange} */
                type="text"
                placeholder="Titles, people, genres"
                className="search__input"
                /* onClick={value.openModal} */
              />
            </form>
          );
        }}
      </MovieConsumer>
    );
  }
}
Research.contextType = MovieContext;
export default Research;
