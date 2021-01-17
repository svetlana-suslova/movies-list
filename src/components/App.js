import React, {Component} from 'react';
import {getMovies, getGenres, saveMovie, deleteMovie} from '../services/movieServiceStubs';
import Movie from './Movie';
import NoMovie from './common/NoMovie';
import SortingBar from './bars/SortingBar';
import FilterBar from './bars/FilterBar';
import SearchBar from './bars/SearchBar';
import Paginator from './bars/Paginator';
import styled from 'styled-components';
import MovieModal from './MovieModal';
import { PlusButton } from './common/Buttons';
import Confirm from './common/Confirm';
import toastr from 'toastr';

const AppWrapper = styled.div`
    margin-top: 20px;
    text-align: center;
`;

const Header = styled.div`
    padding: 10px 10px;
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
            movieToEdit: null,
            movieToDelete: null,
            modal: false,
            confirm: false
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
                plot: '',
                posterUrl: 'https://images5.fanpop.com/image/photos/24600000/The-Mask-the-mask-24621712-336-475.jpg'
            },
            modal: !this.state.modal
        });
    }

    cancelEditMovie = () => {
        this.setState({
            movieToEdit: null,
            modal: !this.state.modal
        });
    }

    updateMovieToEditOnChange = (field, value) => {
        let movie = this.state.movieToEdit;
        movie[field] = value;
        return this.setState({movieToEdit: movie});
    }

    onSaveMovie = () => {
        const movie = this.state.movieToEdit;
        this.setState({
            movieToEdit: null,
            modal: !this.state.modal
        }, () => {
            saveMovie(movie)
                .then(() => {
                    toastr.success('Movie was saved!');
                    this.loadData();
                })
        });
    }

    updateMovie = (movie) => {
        this.setState({
            movieToEdit: Object.assign({}, movie),
            modal: !this.state.modal
        });
    }

    setMovieToDelete = (key) => {
        this.setState({
            movieToDelete: key,
            confirm: !this.state.confirm
        });
    }

    cancelDeleteMovie = () => {
        this.setState({
            movieToDelete: null,
            confirm: !this.state.confirm
        });
    }

    onDeleteMovie = () => {
        deleteMovie(this.state.movieToDelete.id)
            .then(() => {
                toastr.error('Movie was deleted!');
                this.setState({
                    movieToDelete: null,
                    confirm: !this.state.confirm
                });
                this.loadData();
            });
    }

    render() {
        const {movies, sortingMethod, genres, filterMethod, activePage, portionCount, pages, portionNumber, 
               movieToEdit, movieToDelete, modal, confirm} = this.state;
        return (
                <AppWrapper className="container">
                    { movies
                    ? <div className="row flex-column">
                        <Header>
                            <div className="row justify-content-between">
                                <SortingBar className="col-2" 
                                sortingMethod={sortingMethod}
                                sortBy={this.sortBy}/>
                                <Paginator className="col-10" 
                                activePage={activePage}
                                portionCount={portionCount}
                                selectPage={this.selectPage}
                                pages={pages} 
                                portionNumber={portionNumber} 
                                setPortionNumber={this.setPortionNumber}/>
                            </div>
                            <div className="row justify-content-between">
                                <SearchBar className="col-6"
                                search={this.search}
                                clearSearch={this.clearSearch}/>
                                <FilterBar className="col-4"
                                genres={genres}
                                filterMethod={filterMethod}
                                filterBy={this.filterBy}/>
                                <PlusButton className="col-2"
                                color="success" 
                                onClickMethod={this.createNewMovie}
                                title="+"/>
                            </div> 
                        </Header>
                        <MovieList>
                            {
                                movies.map(m => <Movie key={m.id}
                                movie={m} 
                                updateMovie={this.updateMovie}
                                setMovieToDelete={this.setMovieToDelete}/> )
                            }
                        </MovieList>
                        <MovieModal
                        modal={modal}
                        movie={movieToEdit} 
                        cancelEditMovie={this.cancelEditMovie}
                        onChangeMovie={this.updateMovieToEditOnChange}
                        saveMovie={this.onSaveMovie}
                        genres={genres}/>
                        <Confirm
                        confirm={confirm}
                        cancelDeleteMovie={this.cancelDeleteMovie}
                        deleteMovie={this.onDeleteMovie}
                        movie={movieToDelete}/>
                    </div>
                : <NoMovie /> } 
            </AppWrapper>
        );
    }
}

export default App;