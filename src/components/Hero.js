import React, { Component } from 'react';
import MovieContext, { MovieConsumer } from '../services/context';
import Swiper from 'react-id-swiper';
//import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import Play from '../assets/image/play-icon.svg';
import Add from '../assets/image/plus-icon.svg';

import 'swiper/swiper.scss';

class Hero extends Component {
  componentDidMount() {
    this.context.getNow();
  }

  render() {
    const params = {
      effect: 'slide',
      observer: true,
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 1500,
        disableOnInteraction: false
      }
    };

    return (
      <div className=" Hero">
        <MovieConsumer>
          {value => {
            if (value.now.length) {
              return (
                <Swiper {...params}>
                  {value.now.map(tvTopRated => {
                    return (
                      <div key={tvTopRated.id}>
                        <LazyLoad>
                          <img
                            className="swiper-image"
                            src={`https://image.tmdb.org/t/p/w1280${tvTopRated.backdrop_path}`}
                            alt={tvTopRated.title}
                          />
                        </LazyLoad>
                        <div className="backdrop">
                          <h1 className="backdrop__title">
                            {tvTopRated.title}
                          </h1>
                          <p className="backdrop__overview">
                            {tvTopRated.overview}
                          </p>
                          <span>
                            <button className="backdrop__btnPlay">
                              <img
                                src={Play}
                                className="backdrop__btnPlay-play"
                                alt="Play"
                              />
                              Play
                            </button>
                            <button className="backdrop__btnMyList">
                              <img
                                src={Add}
                                className="backdrop__btnMyList-add"
                                alt="Add"
                              />
                              More info
                            </button>
                          </span>
                        </div>
                      </div>
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
