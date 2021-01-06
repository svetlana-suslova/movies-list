import moviesData from './db.json';

export function getMovies(sortBy, genre, searchStr) {
    let movies = filterGenres(moviesData.movies, genre);
    movies = searchInMovies(movies, searchStr);
    sortMovies(movies, sortBy);
    
    return Promise.resolve({
        movieItems: movies 
    });
}

function sortMovies(movies, sortBy) {
    if (sortBy === 'title') {
        movies.sort((x, y) => x.title.localeCompare(y.title));
    }

    if (sortBy === 'year') {
        movies.sort((x, y) => x.year - y.year);
    }

    if (sortBy === 'runtime') {
        movies.sort((x, y) => x.runtime - y.runtime);
    }
}

function filterGenres(movies, selectGenre) {
    if (!selectGenre) return movies;
    return movies.filter(movie => {
        for (const genre of movie.genres) {
            if (containsString(genre, selectGenre)) return true;
        }
        return false;
    });
}

function searchInMovies(movies, searchStr) {
    if (!searchStr) return movies;
    
    const textSearchFields = ['title', 'year', 'actors', 'director', 'plot'];
    return movies.filter(movie => {
        for (const field of textSearchFields) {
            if (containsString(movie[field], searchStr)) return true;
        }
        return false;
    });
}

function containsString(obj, searchStr) {
    return obj.toString().toLowerCase().indexOf(searchStr.toLowerCase()) !== -1
}

export function getGenres() {
    return Promise.resolve(moviesData.genres);
}