import React, {Component} from 'react';
import {getMovies} from '../services/movieServiceStubs';
import './App.sass';
import Movie from './Movie';
import NoMovie from './common/noMovie/NoMovie';

class App extends Component {
    
    state = {
        movies: []
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        getMovies()
        .then((data) => {
            this.setState({
                movies: data.movieItems
            })
        });
    }

    render() {
        const {movies} = this.state;
        return (
            <div className="app">
                <div className="container">
                    { movies
                    ? <div className="row">
                        <div>
                            {
                                movies.map(m => <Movie key={m.id}
                                                movie={m} /> )
                            }
                        </div>
                    </div>
                    : <NoMovie /> } 
                </div>
            </div>
        );
    }
}

export default App;