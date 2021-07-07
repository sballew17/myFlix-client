import React from 'react';
import PropTypes from 'prop-types';
<<<<<<< Updated upstream
=======
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './movie-card.scss';
>>>>>>> Stashed changes

export class MovieCard extends React.Component {

    render() {
        const { movie, onMovieClick } = this.props;

        return (
            <div onClick={() => onMovieClick(movie)} className="movie-card">{movie.Title}</div>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
            Director: PropTypes.shape({
                Name: PropTypes.string.isRequired,
                Bio: PropTypes.string.isRequired,
            })
        })
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};