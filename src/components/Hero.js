import React, { Component } from 'react';
import MovieContext, { MovieConsumer } from '../services/context';
import Swiper from 'react-id-swiper';
import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import 'swiper/swiper.scss';

class Hero extends Component {
  componentDidMount() {
    this.context.getTrending();
  }

  render() {
    const params = {
      effect: 'slide',
      observer: true,
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      }
    };

    return (
      <div className=" Hero">
        <MovieConsumer>
          {value => {
            if (value.trending.length) {
              return (
                <Swiper {...params}>
                  {value.trending.map(movie => {
                    return (
                      <Link to={`${movie.id}`} key={movie.id}>
                        <LazyLoad>
                          <img
                            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                            alt={movie.title}
                          />
                        </LazyLoad>
                        <h1 className="carousel-caption">{movie.title}</h1>
                      </Link>
                    );
                  })}
                </Swiper>
              );
            }
          }}
        </MovieConsumer>
      </div>
    );
  }
}

Hero.contextType = MovieContext;
export default React.memo(Hero);
