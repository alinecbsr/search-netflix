import React, { Component } from 'react';
import MovieContext, { MovieConsumer } from '../services/context';

class ModalDetail extends Component {
  openDetail = movie => {
    this.context.openModal(movie);
  };

  render() {
    const {
      modalOpen,
      modalContent,
      modalContentType,
      moviesResult
    } = this.context;
    const isModalOpen = modalOpen ? 'modal open' : 'modal close';
    let modalDetailContent;

    //Comnteu Filme/Serie
    if (modalContent !== undefined && modalContentType === 'movie') {
      modalDetailContent = (
        /* <h1 className="modal__detail-title">{modalContent.original_title}</h1> */
        <div className="modal__detail-container">
          <div>
            <img
              key={modalContent.id}
              className="modal__detail-image"
              src={`https://image.tmdb.org/t/p/w1280${modalContent.backdrop_path}`}
              alt={modalContent.original_title}
            />
          </div>
          <div className="modal__detail-info">
            <h1 className="modal__detail-title">
              {modalContent.original_title}
            </h1>
            <h2 className="modal__detail-rating">
              {modalContent.vote_average}
            </h2>
            <h3 className="modal__detail-release">
              {modalContent.release_date}
            </h3>
            <p className="modal__detail-overview">{modalContent.overview}</p>
          </div>
        </div>
      );
    }

    //Conteudo Busca
    if (moviesResult.length !== 0 && modalContentType === 'search') {
      modalDetailContent = moviesResult.map(item => (
        /* <h1 className="modal__search">{item.original_title}</h1> */
        <div className="modal__search">
          <img
            key={modalContent.id}
            className="modal__search-img"
            src={`https://image.tmdb.org/t/p/w1280${item.poster_path}`}
            alt={modalContent.title}
            onClick={() => this.openDetail(modalContent)}
          />
        </div>
      ));
    }

    return (
      <div className={isModalOpen} onClick={this.context.closeModal}>
        <div className="modal__detail">{modalDetailContent}</div>
      </div>
    );
  }
}

ModalDetail.contextType = MovieContext;
export default ModalDetail;
