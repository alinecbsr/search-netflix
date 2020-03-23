import React, { Component } from 'react';
import MovieContext, { MovieConsumer } from '../services/context';
import Swiper from 'react-id-swiper';
import LazyLoad from 'react-lazyload';

import 'swiper/swiper.scss';

class TopRated extends Component {
  componentDidMount() {
    this.context.getTop();
  }
  render() {
    const params = {
      slidesPerView: 20,
      spaceBetween: 30,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    };

    return (
      <div className="category">
        <h1 className="category__heading">Top Rated</h1>
        <MovieConsumer>
          {value => {
            if (value.top.length) {
              return (
                <Swiper {...params}>
                  {value.top.map(topRated => {
                    return (
                      <LazyLoad>
                        <img
                          key={topRated.id}
                          className="category__image"
                          src={`https://image.tmdb.org/t/p/w1280${topRated.poster_path}`}
                          alt={topRated.title}
                        />
                      </LazyLoad>
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

TopRated.contextType = MovieContext;
export default React.memo(TopRated);
