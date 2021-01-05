import React, {Component} from 'react';
import {getMovies} from '../services/movieServiceStubs';
import Movie from './Movie';
import NoMovie from './common/noMovie/NoMovie';
import SortingBar from './common/bars/SortingBar';
import FilterBar from './common/bars/FilterBar';
import SearchBar from './common/bars/SearchBar';
import styled from 'styled-components';

const AppWraper = styled.div`
    margin-top: 40px;
    text-align: center;
`;
const Header = styled.div`
`;
const MovieList = styled.div`
    padding: 20px;
    background-color: #F8F8F8;
`;
class App extends Component {
    
    state = {
        movies: [],
        sortingMethod: 'title'
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        getMovies(this.state.sortingMethod)
        .then((data) => {
            this.setState({
                movies: data.movieItems
            })
        });
    }

    sortBy = (key) => {
        this.setState({
            sortingMethod: key
        }, () => {
            this.loadData();
        });
    }

    render() {
        const {movies, sortingMethod} = this.state;
        return (
            <AppWraper>
                <div className="container">
                    { movies
                    ? <div className="row">
                        <Header className="row">
                            <SortingBar sortingMethod={sortingMethod}
                            sortBy={this.sortBy}/>
                            <FilterBar></FilterBar>
                            <SearchBar></SearchBar>
                        </Header>
                        <MovieList>
                            {
                                movies.map(m => <Movie key={m.id}
                                                movie={m} /> )
                            }
                        </MovieList>
                    </div>
                    : <NoMovie /> } 
                </div>
            </AppWraper>
        );
    }
}

export default App;