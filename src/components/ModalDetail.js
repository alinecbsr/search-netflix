import React, { Component } from 'react';
import MovieContext, { MovieConsumer } from '../services/context';

class ModalDetail extends Component {
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
        <h1 className="modal__detail-title">{modalContent.original_title}</h1>
      );
    }

    //Conteudo Busca
    if (moviesResult.length !== 0 && modalContentType === 'search') {
      modalDetailContent = moviesResult.map(item => (
        <h1 className="modal__detail-title">{item.original_title}</h1>
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
