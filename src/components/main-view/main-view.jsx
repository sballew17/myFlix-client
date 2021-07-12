import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegisterView } from '../registration-view/registration-view'
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import {
    Navbar,
    Nav,
    Form,
    Button

} from 'react-bootstrap';

import './main-view.scss';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: "",
            user: null
        }
    }


    getMovies(token) {
        axios.get('https://sam-superhero-movie-project.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onRegister(register) {
        this.setState({
            register
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLogout() {
        this.setState(state => ({
            user: null
        }));

        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    onBackClick() {
        this.setState({
            selectedMovie: null
        });
    }

    render() {
        const { movies, user, register } = this.state;


        if (!movies) return <div className="main-view" />;


        return (
            <Router>
                <div className="main-view">
                    {/* Navbar */}
                    <header>
                        <Navbar bg="dark" expand="lg" fixed="top" variant='dark'>
                            <Navbar.Brand className='home' as={Link} to={`/`} target='_self'>myFlix</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link className='home' as={Link} to={`/`} target='_self'>Home</Nav.Link>
                                    {user &&
                                        <Nav.Link className='profile' as={Link} to={`/users/${user}`} target='_self'>Profile</Nav.Link>
                                    }
                                </Nav>
                                <Form inline>
                                    {user &&
                                        <Link to={`/`}>
                                            <Button variant="dark" className='logout-button' onClick={() => this.onLogout()}>Logout</Button>
                                        </Link>
                                    }
                                </Form>
                            </Navbar.Collapse>
                        </Navbar>
                    </header>
                    {/* HomeView - working on the styling of this page, will be login page for now */}
                    <Route exact path="/" render={() => {
                        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                        return movies.map(m => <MovieCard key={m._id} movie={m} />)
                    }
                    } />
                    <Route exact path="/login" render={() => {
                        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                        return movies.map(m => <MovieCard key={m._id} movie={m} />)
                    }
                    } />

                    <Route path="/register" render={() => {
                        if (!register) return <RegisterView onRegister={(register) => this.onRegister(register)} />
                    }} />
                    {/* you keep the rest routes here */}
                    <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
                    <Route path="/directors/:name" render={({ match }) => {
                        if (!movies.length) return <div className='main-view' />;
                        return <DirectorView director={movies.find((m) => m.Director.Name === match.params.name)} movies={movies} />
                    }
                    } />
                    <Route path="/genres/:name" render={({ match }) => {
                        if (!movies.length) return <div className='main-view' />;
                        return <GenreView genre={movies.find((m) => m.Genre.Name === match.params.name)} movies={movies} />
                    }
                    } />
                    <Route exact path='/users/:username' render={({ history }) => {
                        if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />;
                        if (movies.length === 0) return;
                        return <ProfileView history={history} movies={movies} />
                    }} />
                </div>
            </Router>
        );
    }

}