import moviesData from './db.json';

export function getMovies() {

    return Promise.resolve({
        movieItems: moviesData.movies 
    });
}