import React from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom'


import './profile-view.scss';
import {
    Button,
    Container,
    Card,
    Tab,
    Tabs
} from 'react-bootstrap'

export class ProfileView extends React.Component {
    constructor() {
        super();
        (this.Username = null), (this.Password = null), (this.Email = null), (this.Birthday = null);
        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavoriteMovies: [],
            validated: null,
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.getUser(accessToken);
        }
    }


    getUser(token) {
        const username = localStorage.getItem('user');
        axios
            .get(`https://sam-superhero-movie-project.herokuapp.com/users/${username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                    FavoriteMovies: response.data.FavoriteMovies,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleRemoveFavorite(e, movie) {
        e.preventDefault();
        const username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios
            .delete(`https://sam-superhero-movie-project.herokuapp.com/users/${username}/Movies/${movie}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                alert('Movie was removed from your Favorites List.');
                this.componentDidMount();
            })
            .catch(function (error) {
                console.log(error);
            }).then(() => window.location.reload());
    }

    render() {
        const { FavoriteMovies, validated } = this.state;
        const username = localStorage.getItem('user');
        const { movies } = this.props;

        return (
            <Container className='profile-view'>
                <Tabs defaultActiveKey='profile' transition={false} className='profile-tabs'>


                    <Tab className='tab-item' eventKey='profile' title='Profile'>
                        <Card className='profile-card' border='info'>
                            <Card.Title className='profile-title'>{username}'s Favorite Movies</Card.Title>
                            {FavoriteMovies.length === 0 && <div className='card-content'>You don't have any favorite movies yet!</div>}

                            <div className='favorites-container'>
                                {FavoriteMovies.length > 0 &&
                                    movies.map((movie) => {
                                        if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
                                            return (
                                                <div key={movie._id}>
                                                    <Card className='favorites-item card-content' style={{ width: '16rem', flex: 1 }}>
                                                        <Link to={`/movies/${movie._id}`}>
                                                            <Card.Img className='movie-card' variant="top" src={movie.ImagePath} />
                                                        </Link>
                                                        <Card.Title className='movie-card-title'>{movie.Title}</Card.Title>
                                                        <Card.Body className='movie-card-body'>
                                                            <Button size='sm' className='profile-button remove-favorite' variant='danger' onClick={(e) => this.handleRemoveFavorite(e, movie._id)}>
                                                                Remove
                                                            </Button>
                                                        </Card.Body>
                                                    </Card>
                                                </div>
                                            );
                                        }
                                    })}
                            </div>
                        </Card>
                    </Tab>

                </Tabs>
            </Container>
        );
    }
}

ProfileView.propTypes = {
    user: propTypes.shape({
        FavoriteMovies: propTypes.arrayOf(
            propTypes.shape({
                _id: propTypes.string.isRequired
            })
        ),
        Username: propTypes.string.isRequired,
        Email: propTypes.string.isRequired,
        Birthday: propTypes.instanceOf(Date),
    })
};