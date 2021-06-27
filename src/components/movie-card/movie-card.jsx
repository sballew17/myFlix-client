import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '.movie-card.scss';

export class MovieCard extends React.Component {

    render() {
        const { movie, onMovieClick } = this.props;

        return (
            <Card>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                    <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
                </Card.Body>
            </Card>
        );
    }
}

return (
    <div className="main-view">
        {selectedMovie
            ? (
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    </Col>
                </Row>
            )
            : (
                <Row className="justify-content-md-center">
                    {movies.map(movie => (
                        <Col md={3}>
                            <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                        </Col>
                    ))}
                </Row>
            )
        }
    </div>
);

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