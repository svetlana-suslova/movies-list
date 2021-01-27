import React from 'react';
import styled from 'styled-components';
import { EditButton, DeleteButton } from './common/Buttons';
import noMovie from '../assets/no-movie.png';

const MovieRow = styled.div`
     font-size: 15px;
     border-bottom: 1px dotted #cacaca;
     clear: both;
     margin: 10px 0;
`;
const MovieImage = styled.div`
     float: left;
     position: relative;
     margin: 0 10px 0 0;
     background-color: #eee;
     border: 1px solid rgba(0, 0, 0, 0.1);
     img {
          width: 96px;
          height: 142px;
     }
`;
const MovieInfo = styled.div`
     font-size: 12px;
     text-align: left;
     font-family: Verdana, Arial, sans-serif;
     color: #333;
     p span::before {
          content: ' | ';
          color: #ddd;
     }
`;
const MovieTitle = styled.h3`
     font-size: 17px;
     margin: 10px 0 0 0;
     color: #337ab7;
     a {
          cursor: pointer;
     }
`;
const MovieDetails = styled.p``;
const MovieActors = styled.p`
     margin-top: 8px;
     color: #337ab7;
`;
const MoviePlot = styled.p`
     position: relative;
     line-height: 1.4em;
     min-height: 3.2em;
     text-align: justify;
     font-size: 14px;
`;

const Movie = ({ movie, updateMovie, setMovieToDelete }) => {
     const imgUrl = movie.posterUrl ? movie.posterUrl : noMovie;
     return (
          <MovieRow key={movie.id}>
               <MovieImage>
                    <img src={imgUrl} title={movie.title} />
               </MovieImage>
               <MovieInfo>
                    <MovieTitle className="row justify-content-around">
                         <div className="col-10">
                              <a onClick={() => updateMovie(movie)}>
                                   {movie.title}
                              </a>
                         </div>
                         <div className="col-2">
                              <EditButton
                                   onClickMethod={() => updateMovie(movie)}
                              />
                              <DeleteButton
                                   onClickMethod={() => setMovieToDelete(movie)}
                              />
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
};

export default Movie;
