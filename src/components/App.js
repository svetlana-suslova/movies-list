import React, {useState, useEffect} from 'react';
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
   padding: 5px;
   margin-top: 20px;
`;

const MovieList = styled.div`
    padding-top: 10px;
    margin-top: 20px;
    background-color: #F8F8F8;
`;
const App = () =>  {

    const [state, setState] = useState({
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
      });

    const { movies, genres, pages, sortingMethod, filterMethod, searchStr, activePage, portionCount, 
        portionNumber, movieToEdit, movieToDelete, modal, confirm } = state;

    useEffect(() => {
        getGenres()
        .then(genres => {
            setState(state => ({
                ...state,
                genres
                }));
            });
            loadData();
    }, [sortingMethod, filterMethod, searchStr, activePage, portionNumber]);

    const loadData = () => {
        getMovies(sortingMethod, filterMethod, searchStr, activePage, portionNumber)
        .then((data) => {
            setState(state => ({
                ...state,
                movies: data.movieItems,
                pages: data.pages,
                portionCount: data.portionCount
              }));
        });
    }

    const sortBy = (key) => {
        setState(state => ({
            ...state,
            sortingMethod: key,
            activePage: 1,
            portionNumber: 1
        }));
    }

    const filterBy = (key) => {
        if (key !== 'ALL') {
            setState((state) => ({
                ...state,
                filterMethod: key,
                activePage: 1,
                portionNumber: 1
            }));
        } else {
            setState(state => ({
                ...state,
                filterMethod: '',
                activePage: 1,
                portionNumber: 1
            }));
        }
    }

    const search = (key) => {
        if ( !(key.trim() === '') ) {
            setState(state => ({
                ...state,
                searchStr: key,
                activePage: 1,
                portionNumber: 1
            })); 
        }  
    }

    const clearSearch = () => {
        setState(state => ({
            ...state,
            searchStr: '',
            activePage: 1,
            portionNumber: 1
        }));
    }

    const selectPage = (key) =>  {
        setState(state => ({
            ...state,
            activePage: key
        }));
    }

    const setPortionNumber = (key) => {
        setState(state => ({
            ...state,
            portionNumber: key
        }));
    }

    const createNewMovie = () => {
        setState(state => ({
            ...state,
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
            modal: !modal
        }));
    }

    const cancelEditMovie = () => {
        setState(state => ({
            ...state,
            movieToEdit: null,
            modal: !modal
        }));
    }

    const updateMovieToEditOnChange = (field, value) => {
        let movie = movieToEdit;
        movie[field] = value;
        return setState(state => ({
            ...state,
            movieToEdit: movie
        }));
    }

    const onSaveMovie = () => {
        const movie = movieToEdit;
        setState(state => ({
            ...state,
            movieToEdit: null,
            modal: !modal
        }));
        saveMovie(movie)
            .then(() => {
                toastr.success('Movie was saved!');
                loadData();
        });
    }

    const updateMovie = (movie) => {
        setState(state => ({
            ...state,
            movieToEdit: Object.assign({}, movie),
            modal: !modal
        }));
    }

    const setMovieToDelete = (key) => {
        setState(state => ({
            ...state,
            movieToDelete: key,
            confirm: !confirm
        }));
    }

    const cancelDeleteMovie = () => {
        setState(state => ({
            ...state,
            movieToDelete: null,
            confirm: !confirm
        }));
    }

    const onDeleteMovie = () => {
        deleteMovie(movieToDelete.id)
            .then(() => {
                toastr.error('Movie was deleted!');
                setState(state => ({
                    ...state,
                    movieToDelete: null,
                    confirm: !confirm
                }));
                loadData();
            });
    }
        
    return (
            <AppWrapper>
                { movies
                ? <>
                    <div className="container">
                        <div className="row justify-content-between">
                            <SortingBar className="col-2" 
                            sortingMethod={sortingMethod}
                            sortBy={sortBy}/>
                            <Paginator className="col-10" 
                            activePage={activePage}
                            portionCount={portionCount}
                            selectPage={selectPage}
                            pages={pages} 
                            portionNumber={portionNumber} 
                            setPortionNumber={setPortionNumber}/>
                        </div>
                        <div className="row justify-content-between">
                            <SearchBar className="col-6"
                            search={search}
                            clearSearch={clearSearch}/>
                            <FilterBar className="col-4"
                            genres={genres}
                            filterMethod={filterMethod}
                            filterBy={filterBy}/>
                            <PlusButton className="col-2"
                            color="success" 
                            onClickMethod={createNewMovie}
                            title="+"/>
                        </div> 
                    </div>
                    <MovieList className="container">
                        {
                            movies.map(m => <Movie key={m.id}
                            movie={m} 
                            updateMovie={updateMovie}
                            setMovieToDelete={setMovieToDelete}/> )
                        }
                    </MovieList>
                    <MovieModal
                    modal={modal}
                    movie={movieToEdit} 
                    cancelEditMovie={cancelEditMovie}
                    onChangeMovie={updateMovieToEditOnChange}
                    saveMovie={onSaveMovie}
                    genres={genres}/>
                    <Confirm
                    confirm={confirm}
                    cancelDeleteMovie={cancelDeleteMovie}
                    deleteMovie={onDeleteMovie}
                    movie={movieToDelete}/>
                </>
            : <NoMovie /> }
        </AppWrapper>
    );
}

export default App;