import moviesData from './db.json';

export function getMovies(sortBy) {
    const movies = moviesData.movies;
    
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