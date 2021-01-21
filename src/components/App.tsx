import React, {useState, useEffect} from 'react';
import {getMovies, getGenres, saveMovie, deleteMovie} from '../services/movieServiceStubs';
import {MovieType} from '../types/types';
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

    type State = {
        movies: Array<MovieType>,
        genres: Array<string>,
        pages: Array<number>,
        sortingMethod: string,
        filterMethod: string,
        searchStr: string,
        activePage: number,
        portionCount: number | null,
        portionNumber: number,
        movieToEdit: MovieType | null,
        movieToDelete: MovieType | null,
        modal: boolean,
        confirm: boolean
    }

    const [state, setState] = useState<State>({
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
            console.log("pages"+ pages)
    }, [sortingMethod, filterMethod, searchStr, activePage, portionNumber]);

    const loadData = () => {
        getMovies(sortingMethod, filterMethod, searchStr, activePage, portionNumber)
        .then((data: any) => {
            setState(state => ({
                ...state,
                movies: data.movieItems,
                pages: data.pages,
                portionCount: data.portionCount
              }));
        });
    }

    const sortBy = (key: string) => {
        setState(state => ({
            ...state,
            sortingMethod: key,
            activePage: 1,
            portionNumber: 1
        }));
    }

    const filterBy = (key: string) => {
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

    const search = (key: string) => {
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

    const selectPage = (key: number) =>  {
        setState(state => ({
            ...state,
            activePage: key
        }));
    }

    const setPortionNumber = (key: number) => {
        setState(state => ({
            ...state,
            portionNumber: key
        }));
    }

    const createNewMovie = () => {
        // @ts-ignore
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

    const updateMovieToEditOnChange = (field: string, value: string) => {
        let movie = movieToEdit;
        // @ts-ignore
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
        if (movie) saveMovie(movie)
            .then(() => {
                toastr.success('Movie was saved!');
                loadData();
            });
    }

    const updateMovie = (movie: MovieType) => {
        setState(state => ({
            ...state,
            movieToEdit: Object.assign({}, movie),
            modal: !modal
        }));
    }

    const setMovieToDelete = (key: MovieType) => {
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
        if (movieToDelete) deleteMovie(movieToDelete.id)
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