import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

<<<<<<< Updated upstream
import { LoginView } from '../login-view/login-view';
=======
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { Link } from "react-router-dom";

>>>>>>> Stashed changes
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
<<<<<<< Updated upstream
            movies: [],
            selectedMovie: null
=======
            user: null
>>>>>>> Stashed changes
        }
    }

    componentDidMount() {
        axios.get('https://sam-superhero-movie-project.herokuapp.com/movies')
            .then(response => {
<<<<<<< Updated upstream
                this.setState({
=======
                // Assign the result to the state
                this.props.setMovies({
>>>>>>> Stashed changes
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

<<<<<<< Updated upstream
        if (movies.length === 0) return <div class="main-view" />;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
                    ))
                }
            </div>
        );
    }
}
export default MainView;
=======
    render() {
        let { movies } = this.props;
        let { user } = this.state;

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
                        return (<MoviesList movies={movies} />);
                    }
                    } />
                    <Route exact path="/login" render={() => {
                        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                        return (<MoviesList movies={movies} />);
                    }
                    } />

                    <Route path="/register" render={() => {
                        if (!register) return <RegisterView onRegister={(register) => this.onRegister(register)} />
                    }} />
                    {/* you keep the rest routes here */}
                    <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
                    <Route path="/director/:name" render={({ match }) => {
                        if (!movies.length) return <div className='main-view' />;
                        return <DirectorView director={movies.find((m) => m.Director.Name === match.params.name)} movies={movies} />
                    }
                    } />
                    <Route path="/genre/:name" render={({ match }) => {
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

let mapStateToProps = (state) => {
    return { movies: state.movies, users: state.users }
}

export default connect(mapStateToProps, { setMovies, setUsers })(MainView);
>>>>>>> Stashed changes
