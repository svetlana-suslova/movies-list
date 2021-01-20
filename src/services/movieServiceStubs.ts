import moviesData from './db.json';

const pageSize = 10;
const portionSize = 5;

type Movie = {
    id: number,
    title: string,
    year: string,
    runtime: string,
    genres: Array<string>,
    director: string,
    actors: string,
    plot: string,
    posterUrl: string
}

export function getMovies(sortBy: string, genre: string, searchStr: string, page: number, portionNumber: number) {
    
    let movies = filterGenres(moviesData.movies, genre);
    movies = searchInMovies(movies, searchStr);
    sortMovies(movies, sortBy);

    const activePage = getActivePage(movies, page, pageSize);
    const portionCount = calculatePortionCount(movies);
    const pages = getPages(movies, portionNumber);
    
    return Promise.resolve({
        portionCount,
        pages,
        movieItems: activePage
    });
}



function sortMovies(movies: Array<Movie>, sortBy: string) {
    if (sortBy === 'title') {
        movies.sort((x, y) => x.title.localeCompare(y.title));
    }

    if (sortBy === 'year') {
        movies.sort((x, y) => Number(x.year) - Number(y.year));
    }

    if (sortBy === 'runtime') {
        movies.sort((x, y) => Number(x.runtime) - Number(y.runtime));
    }
}

function filterGenres(movies: Array<Movie>, selectGenre: string) {
    if (!selectGenre) return movies;
    return movies.filter(movie => {
        for (const genre of movie.genres) {
            if (containsString(genre, selectGenre)) return true;
        }
        return false;
    });
}

function searchInMovies(movies: Array<Movie>, searchStr: string) {
    if (!searchStr) return movies;
    
    const textSearchFields = ['title', 'year', 'actors', 'director', 'plot'];
    return movies.filter(movie => {
        for (const field of textSearchFields) {
            // @ts-ignore
            if (containsString(movie[field], searchStr)) return true;
        }
        return false;
    });
}

function containsString(obj: Object, searchStr: string) {
    return obj.toString().toLowerCase().indexOf(searchStr.toLowerCase()) !== -1
}

export function getGenres() {
    return Promise.resolve(moviesData.genres);
}

function getActivePage (movies: Array<Movie>, page: number, perPage: number) {
    const start = (page - 1) * perPage;
    const end = page * perPage;
    return movies.slice(start, end);
}

function calculatePortionCount (movies: Array<Movie>) {
    const pagesCount = calculatePagesCount(movies);
    const portionCount = Math.ceil(pagesCount / portionSize);
    return portionCount;
}

function getPages (movies: Array<Movie>, portionNumber: number) {
    const pagesCount = calculatePagesCount(movies);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;
    pages = pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber);
    
    return pages;
}

function calculatePagesCount (movies: Array<Movie>) {
    return Math.ceil(movies.length / pageSize);
}

export function saveMovie(movie: Movie) {
    if (movie.id) return updateMovie(movie);
    return addMovie(movie);
}

function addMovie(movie: Movie) {
    const movies = moviesData.movies;
    let maxId = 0;
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].id > maxId) {
            maxId = movies[i].id;
        }
    }
    movie.id = maxId + 1;
    movies.push(movie);

    return Promise.resolve(null);
}

function updateMovie(movie: Movie) {
    const movies = moviesData.movies;
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].id === movie.id) {
            movies[i] = movie;
        }
    }
    return Promise.resolve(null);
}

export function deleteMovie(id: number) {
    const movies = moviesData.movies;
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].id === id) {
            movies.splice(i, 1);
        }
    }
    return Promise.resolve(null);
}