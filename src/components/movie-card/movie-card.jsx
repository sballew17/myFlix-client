import React from 'react';
import PropTypes from 'prop-types';

import { Card, Button, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";

import './movie-card.scss';

export class MovieCard extends React.Component {

    render() {
        const { movie } = this.props;

        return (
            <Card>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title className="movie-title">{movie.Name}</Card.Title>
                    <Card.Text className="movie-text">{movie.Description}</Card.Text>
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant="link">Open</Button>
                    </Link>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Name: PropTypes.string.isRequired,
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
};