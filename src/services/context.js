import React, { Component } from 'react';
import TMDB_KEY from './config';
import axios from 'axios';

const MovieContext = React.createContext();

class MovieProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trending: [],
      popular: [],
      now: [],
      coming: [],
      top: [],
      details: '',
      genres: [],
      cast: [],
      id: '',
      companies: [],
      countries: [],
      similar: [],
      videos: [],
      movies: [] /* buscar */,
      moviesResult: [] /* pesquisar e ver resultados */,
      modalOpen: false /* modal é fechado no início, depois que o estado for verdadeiro, o componente mostrará */,
      visible: 10 /* número de filmes que serão visíveis primeiro na página inicial */,
      pageRefreshed: false /* estado para entender se a página é atualizada */
    };
  }

  cleanState = () => {
    this.setState({
      popular: [],
      now: [],
      coming: [],
      top: []
    });
  };

  getTrending = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_KEY}`
      )
      .then(response => {
        const apiResponse = response.data;
        this.setState({
          trending: apiResponse.results
        });
        console.log(apiResponse.results);
      })
      .catch(error => {
        /* console.log(error); */
      });
  };

  getPopular = () => {
    this.cleanState();
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&language=en-US&page=1`
      )
      .then(response => {
        const apiResponse = response.data;
        this.setState({
          popular: apiResponse.results
        });
        /* console.log(apiResponse.results); */
      })
      .catch(error => {
        console.log(error);
      });
  };

  getNow = () => {
    this.cleanState();
    axios
      .get(
        `
https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_KEY}&language=en-US&page=1`
      )
      .then(response => {
        const apiResponse = response.data;
        this.setState({
          now: apiResponse.results
        });
        /* console.log(apiResponse.results); */
      })
      .catch(error => {
        console.log(error);
      });
    /* console.log("worked"); */
  };

  getComing = () => {
    this.cleanState();
    axios
      .get(
        `
https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_KEY}&language=en-US&page=1`
      )
      .then(response => {
        const apiResponse = response.data;
        this.setState({
          coming: apiResponse.results
        });
        /* console.log(apiResponse.results); */
      })
      .catch(error => {
        console.log(error);
      });
  };

  getTop = () => {
    this.cleanState();
    axios
      .get(
        `
https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_KEY}&language=en-US&page=1`
      )
      .then(response => {
        const apiResponse = response.data;
        this.setState({
          top: apiResponse.results
        });
        /* console.log(apiResponse.results); */
      })
      .catch(error => {
        console.log(error);
      });
  };

  getDetails = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.state.id}?api_key=${TMDB_KEY}&language=en-US`
      )
      .then(response => {
        const apiResponse = response.data;
        /* console.log(this.state.id); */
        this.setState(
          {
            details: apiResponse,
            genres: apiResponse.genres,
            companies: apiResponse.production_companies,
            countries: apiResponse.production_countries
          },
          () => console.log(apiResponse)
        );
      })
      .catch(error => {
        console.log(error);
      });
  };

  getCast = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.state.id}/credits?api_key=${TMDB_KEY}&language=en-US`
      )
      .then(response => {
        const apiResponse = response.data;
        this.setState({
          cast: apiResponse.cast
        });
        /* console.log(apiResponse.cast); */
      })
      .catch(error => {
        console.log(error);
      });
  };

  getSimilar = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.state.id}/similar?api_key=${TMDB_KEY}&language=en-US&page=1`
      )
      .then(response => {
        const apiResponse = response.data;
        this.setState({
          similar: apiResponse.results
        });
        /* console.log(apiResponse.results); */
      })
      .catch(error => {
        console.log(error);
      });
  };

  getVideos = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${this.state.id}/videos?api_key=${TMDB_KEY}&language=en-US&page=1`
      )
      .then(response => {
        const apiResponse = response.data;
        this.setState({
          videos: apiResponse.results
        });
        /* console.log(apiResponse.results); */
      })
      .catch(error => {
        console.log(error);
      });
  };

  /* pesquisa do estado de filmes, armazenar no estado de filmesResult */
  searchMovie = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${this.state.movies}&language=en-US&page=1&include_adult=false`
      )
      .then(response => {
        const apiResponse = response.data;
        this.setState({
          moviesResult: apiResponse.results
        });
        /* console.log(apiResponse.results); */
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleClick = id => {
    this.setState(
      {
        id: id
      },
      /* como colocar duas funções de retorno de chamada no setState */
      /* https://stackoverflow.com/questions/53788156/passing-multiple-functions-as-callback-in-setstate */
      () => {
        this.getDetails();
        this.getCast();
        this.getSimilar();
        this.getVideos();
      }
    );
  };
  /* obtém o valor das entradas */
  handleChange = e => {
    this.setState(
      {
        movies: e.target.value
      },
      () => {
        this.searchMovie();
      }
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    this.searchMovie();
    /* .reset() to reset searchbar */
    e.target.reset();
  };

  openModal = () => {
    this.setState({
      modalOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false
    });
  };

  clearSearch = () => {
    this.setState({
      movies: [],
      moviesResult: []
    });
  };

  /* limpa o estado de visível para voltar ao estado inicial de 10 filmes */
  clearVisible = () => {
    this.setState({
      visible: 10,
      now: [],
      coming: [],
      top: []
    });
  };

  /* https://codepen.io/grantdotlocal/pen/zReNgE */
  loadMore = () => {
    this.setState(prev => {
      return { visible: prev.visible + 5 };
    });
  };

  /*   usando !this.state.pageRefreshed portanto, pageRefreshed seria sempre o oposto, a cada clique */
  refreshPage = () => {
    this.setState({
      pageRefreshed: !this.state.pageRefreshed
    });
  };

  render() {
    return (
      <MovieContext.Provider
        //esses métodos poderão ser usados pelo usuário depois de colocá-los aqui
        value={{
          ...this.state,
          getTrending: this.getTrending,
          getPopular: this.getPopular,
          getNow: this.getNow,
          getComing: this.getComing,
          getTop: this.getTop,
          handleClick: this.handleClick,
          handleSubmit: this.handleSubmit,
          handleChange: this.handleChange,
          searchMovie: this.searchMovie,
          openModal: this.openModal,
          closeModal: this.closeModal,
          clearSearch: this.clearSearch,
          loadMore: this.loadMore,
          cleanState: this.cleanState,
          clearVisible: this.clearVisible,
          refreshPage: this.refreshPage
        }}
      >
        {this.props.children}
      </MovieContext.Provider>
    );
  }
}

const MovieConsumer = MovieContext.Consumer;

export { MovieProvider, MovieConsumer };
