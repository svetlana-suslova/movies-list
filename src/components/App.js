import React, {Component} from 'react';
import {getMovies, getGenres, saveMovie} from '../services/movieServiceStubs';
import Movie from './Movie';
import NoMovie from './common/NoMovie';
import SortingBar from './bars/SortingBar';
import FilterBar from './bars/FilterBar';
import SearchBar from './bars/SearchBar';
import Paginator from './bars/Paginator';
import styled from 'styled-components';
import MovieModal from './MovieModal';

const AppWrapper = styled.div`
    margin-top: 40px;
    text-align: center;
`;

const Header = styled.div`
    padding: 10px 20px;
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
            pages: [],
            sortingMethod: 'title',
            filterMethod: '',
            searchStr: '',
            activePage: 1,
            portionCount: null,
            portionNumber: 1,
            movieToEdit: null
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
        getMovies(this.state.sortingMethod, this.state.filterMethod, this.state.searchStr, this.state.activePage, this.state.portionNumber)
        .then((data) => {
            this.setState({
                movies: data.movieItems,
                pages: data.pages,
                portionCount: data.portionCount
            })
        });
    }

    sortBy = (key) => {
        this.setState({
            sortingMethod: key,
            activePage: 1,
            portionNumber: 1
        }, () => {
            this.loadData();
        });
    }

    filterBy = (key) => {
        if ( key !== 'ALL') {
            this.setState({
                filterMethod: key,
                activePage: 1,
                portionNumber: 1
            }, () => {
                this.loadData();
            });
        } else {
            this.setState({
                filterMethod: '',
                activePage: 1,
                portionNumber: 1
            }, () => {
                this.loadData();
            });
        }
    }

    search = (key) => {
        if ( !(key.trim() === '') ) {
            this.setState({
                searchStr: key,
                activePage: 1,
                portionNumber: 1
            }, () => {
                this.loadData();
            }); 
        }  
    }

    clearSearch = () => {
        this.setState({
            searchStr: '',
            activePage: 1,
            portionNumber: 1
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

    setPortionNumber = (key) => {
        this.setState({
            portionNumber: key
        }, () => {
            this.loadData();
        });
    }

    createNewMovie = () => {
        this.setState({
            movieToEdit: {
                title: '',
                year: 2021,
                runtime: 120,
                genres: [],
                director: '',
                actors: '',
                plot: ''
            }
        });
    }

    cancelEditMovie = () => {
        this.setState({
            movieToEdit: null
        });
    }

    updateMovieToEditOnChange = (field, value) => {
        let movie = this.state.movieToEdit;
        movie[field] = value;
        return this.setState({movieToEdit: movie});
    }

    onSaveMovie = () => {
        const movie = this.state.movieToEdit;
        this.setState({movieToEdit: null}, () => {
            saveMovie(movie)
                .then(() => {
                    this.loadData();
                })
        });
    }

    render() {
        const {movies, sortingMethod, genres, filterMethod, activePage, 
            portionCount, pages, portionNumber, movieToEdit} = this.state;
        return (
            <AppWrapper>
                <div className="container">
                    { movies
                    ? <div className="row flex-column">
                        <Header className="row justify-content-between">
                            <SortingBar className="col-1" 
                            sortingMethod={sortingMethod}
                            sortBy={this.sortBy}/>
                            <FilterBar className="col-2"
                            genres={genres}
                            filterMethod={filterMethod}
                            filterBy={this.filterBy}/>
                            <SearchBar className="col-4"
                            search={this.search}
                            clearSearch={this.clearSearch}/>
                            <Paginator className="col-4"
                            activePage={activePage}
                            portionCount={portionCount}
                            selectPage={this.selectPage}
                            pages={pages} 
                            portionNumber={portionNumber} 
                            setPortionNumber={this.setPortionNumber}/>
                            <MovieModal className="col-1"
                            movie={movieToEdit}
                            createNewMovie={this.createNewMovie}  
                            cancelEditMovie={this.cancelEditMovie}
                            onChangeMovie={this.updateMovieToEditOnChange}
                            saveMovie={this.onSaveMovie}
                            genres={genres}/>
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