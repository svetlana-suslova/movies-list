import React, {Component} from 'react';
import {getMovies, getGenres} from '../services/movieServiceStubs';
import Movie from './Movie';
import NoMovie from './common/noMovie/NoMovie';
import SortingBar from './common/bars/SortingBar';
import FilterBar from './common/bars/FilterBar';
import SearchBar from './common/bars/SearchBar';
import Paginator from './common/bars/Paginator';
import styled from 'styled-components';

const AppWrapper = styled.div`
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
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            genres: [],
            sortingMethod: 'title',
            filterMethod: '',
            searchStr: '',
            total: 0,
            activePage: 1
        }
    }

    componentDidMount() {
        getGenres()
            .then((genres) => {
                this.setState({
                    genres
                }, () => {
                    this.loadData();
                });
            });
    }

    loadData = () => {
        getMovies(this.state.sortingMethod, this.state.filterMethod, this.state.searchStr, this.state.activePage)
        .then((data) => {
            this.setState({
                movies: data.movieItems,
                total: data.total
            })
        });
    }

    sortBy = (key) => {
        this.setState({
            sortingMethod: key,
            activePage: 1
        }, () => {
            this.loadData();
        });
    }

    filterBy = (key) => {
        if ( key !== 'ALL') {
            this.setState({
                filterMethod: key,
                activePage: 1
            }, () => {
                this.loadData();
            });
        } else {
            this.setState({
                filterMethod: '',
                activePage: 1
            }, () => {
                this.loadData();
            });
        }
    }

    search = (key) => {
        if ( !(key.trim() === '') ) {
            this.setState({
                searchStr: key,
                activePage: 1
            }, () => {
                this.loadData();
            }); 
        }  
    }

    clearSearch = () => {
        this.setState({
            searchStr: '',
            activePage: 1
        }, () => {
            this.loadData();
        });
    }

    selectPage = (key) =>  {
        this.setState({
            activePage: key
        }, () => {
            this.loadData();
        });
    }

    render() {
        const {movies, sortingMethod, genres, filterMethod, activePage, total} = this.state;
        return (
            <AppWrapper>
                <div className="container">
                    { movies
                    ? <div className="row">
                        <Header className="row">
                            <SortingBar sortingMethod={sortingMethod}
                            sortBy={this.sortBy}/>
                            <FilterBar genres={genres}
                            filterMethod={filterMethod}
                            filterBy={this.filterBy}/>
                            <SearchBar search={this.search}
                            clearSearch={this.clearSearch}/>
                            <Paginator activePage={activePage}
                            selectPage={this.selectPage}
                            total={total}/>
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
            </AppWrapper>
        );
    }
}

export default App;