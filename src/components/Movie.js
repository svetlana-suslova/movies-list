import React from 'react';

const Movie = ( {movie} ) => {
    const imgUrl = movie.posterUrl;
    return (   
        <div key={movie.id}>
            <div>
                <img src={imgUrl} title={movie.title} alt={movie.title}/>
            </div>
            <div>
                <h3>{movie.title}</h3>
                <p>
                    <span>{movie.year}</span>
                    <span>{movie.runtime + ' min.'}</span>
                    <span>{movie.genres.join(', ')}</span>
                </p>
                <p>
                    <span>{movie.director}</span>
                    <span>{movie.actors}</span>
                </p>
                <p>{movie.plot}</p>
            </div>
        </div>
    );
}
export default Movie;