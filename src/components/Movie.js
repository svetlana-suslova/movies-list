import React from 'react';
import styled from 'styled-components';
import { EditButton, DeleteButton } from './common/Buttons';

const MovieRow = styled.div`
    font-size: 15px;
    padding: 10px 0;
    margin-left: 0;
    margin-right: 0;
    border-bottom: 1px solid #cacaca;
    position: relative;
    display: table;
    clear: both;
    width: 100%;
`;
const MovieImage = styled.div`
    float: left;
    position: relative;
    background-color: #eee;
    border: 1px solid rgba(0,0,0,0.1);
    img {
        width: 96px;
        height: 142px;
    } 
`;
const MovieInfo = styled.div`
    font-size: 12px;
    margin-left: 114px;
    margin-right: 0;
    text-align: left;
    font-family: Verdana, Arial, sans-serif;
    color: #333;
    p span::before {
        content: " | ";
        color: #ddd;
    }
`;
const MovieTitle = styled.h3`
    font-size: 17px;
    margin: 0;
    color: #337ab7;
    a {
        cursor: pointer;
    }
`;
const MovieDetails = styled.p`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
const MovieActors = styled.p`
    margin-top: 8px;
    color: #337ab7;
`;
const MoviePlot = styled.p`
    overflow: hidden;
    position: relative;
    line-height: 1.4em;
    max-height: 4.2em;
    text-align: justify;
    padding-right: 1.2em;
    font-size: 14px;
`;

const Movie = ( {movie, updateMovie, setMovieToDelete} ) => {
    const imgUrl = movie.posterUrl;
    return (   
        <MovieRow key={movie.id}>
            <MovieImage>
                <img src={imgUrl} title={movie.title}/>
            </MovieImage>
            <MovieInfo>
                <MovieTitle className="row">
                    <div className="col-10">
                        <a onClick={() => updateMovie(movie)}>{movie.title}</a>
                    </div>
                    <div className="col-2">
                        <EditButton onClickMethod={() => updateMovie(movie)}/>
                        <DeleteButton onClickMethod={() => setMovieToDelete(movie)}/>
                    </div>
                </MovieTitle>
                <MovieDetails>
                    {movie.year}
                    <span>{movie.runtime + ' min.'}</span>
                    <span>{movie.genres.join(', ')}</span>
                </MovieDetails>
                <MovieActors>
                    {movie.director}
                    <span>{movie.actors}</span>
                </MovieActors>
                <MoviePlot>{movie.plot}</MoviePlot>
            </MovieInfo>
        </MovieRow>
    );
}

export default Movie;