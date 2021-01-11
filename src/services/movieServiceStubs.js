import moviesData from './db.json';

const pageSize = 10;
const portionSize = 5;

export function getMovies(sortBy, genre, searchStr, page, portionNumber) {
    
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

function getActivePage (movies, page, perPage) {
    const start = (page - 1) * perPage;
    const end = page * perPage;
    return movies.slice(start, end);
}

function calculatePortionCount (movies) {
    const pagesCount = calculatePagesCount(movies);
    const portionCount = Math.ceil(pagesCount / portionSize);
    return portionCount;
}

function getPages (movies, portionNumber) {
    const pagesCount = calculatePagesCount(movies);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;
    pages = pages.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber);
    console.log(pages);
    
    return pages;
}

function calculatePagesCount (movies) {
    return Math.ceil(movies.length / pageSize);
}

export function saveMovie(movie) {
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