import React, {Component} from 'react';
import {getMovies} from '../services/movieServiceStubs';
import Movie from './Movie';
import NoMovie from './common/noMovie/NoMovie';
import styled from 'styled-components';

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
        const App = styled.div`
            margin-top: 40px;
            text-align: center;
        `;
        const MovieList = styled.div`
            padding: 20px;
            background-color: #F8F8F8;
        `;

        const {movies} = this.state;
        return (
            <App>
                <div className="container">
                    { movies
                    ? <div className="row">
                        <MovieList>
                            {
                                movies.map(m => <Movie key={m.id}
                                                movie={m} /> )
                            }
                        </MovieList>
                    </div>
                    : <NoMovie /> } 
                </div>
            </App>
        );
    }
}

export default App;