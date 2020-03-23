import React, { Component } from 'react';
import MovieContext, { MovieConsumer } from '../services/context';
import Swiper from 'react-id-swiper';

class Popular extends Component {
  componentDidMount() {
    this.context.getPopular();
  }

  openDetail = movie => {
    this.context.openModal(movie);
  };

  render() {
    const params = {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      slidesPerView: 5,
      spaceBetween: 3,
      loop: true
    };

    /*  if (this.state.stateHandle)
      return <ModalDetail movie={this.state.stateHandle} />; */

    return (
      <div className="slider_image">
        <h1>Popular on Netflix</h1>
        <MovieConsumer>
          {value => {
            if (value.popular.length) {
              return (
                <>
                  <Swiper {...params}>
                    {value.popular.map(popular => {
                      return (
                        <img
                          key={popular.id}
                          className="slider_image__image"
                          src={`https://image.tmdb.org/t/p/w1280${popular.poster_path}`}
                          alt={popular.title}
                          onClick={() => this.openDetail(popular)}
                        />
                      );
                    })}
                  </Swiper>
                </>
              );
            }
          }}
        </MovieConsumer>
      </div>
    );
  }
}

Popular.contextType = MovieContext;
export default React.memo(Popular);
