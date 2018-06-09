import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import './UsersMovieList.css';

class UsersMovieList extends Component {
  componentDidMount = () => {
    this.props.loadMovieList();
    console.log(this.props.movieList.movieList);
  };

  deleteMovie = id => {
    console.log('delete clicked');
    console.log(id);
    this.props.deleteMovie(id);
    this.props.loadMovieList();
  };

  renderContent = () => {
    return this.props.movieList.reverse().map(movieItem => {
      let year = movieItem.releaseDate
        ? movieItem.releaseDate.toString().substr(0, 4)
        : null;

      return (
        <div className="container" key={movieItem._id}>
          <div className="description">
            <img src={movieItem.poster} alt={movieItem.title} />

            <h4>{movieItem.title}</h4>
            {/* <p>{year}</p> */}
            <p>Saved on: {new Date(movieItem.date).toLocaleDateString()}</p>
            {/* <p>{movieItem.summary}</p> */}
            <p onClick={() => this.deleteMovie(movieItem._id)}>
              <i className="fa fa-trash-o" aria-hidden="true" />
            </p>
          </div>
        </div>
      );
    });
  };

  render() {
    return <div className="UsersMovieList">{this.renderContent()}</div>;
  }
}

const mapStateToProps = state => {
  return { movieList: state.movieList.movieList };
};

const mapDispatchToProps = dispatch => {
  return {
    loadMovieList: () => dispatch(actions.onFetchList()),
    deleteMovie: id => dispatch(actions.onDeleteMovie(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersMovieList);
