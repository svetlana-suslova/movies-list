import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MyButton, CloseBtn } from './common/Buttons';
import {
     TextInput,
     TextAreaInput,
     NumberInput,
     SelectInput
} from './common/Inputs';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const ErrorMessage = styled.p`
     color: #bf1650;
     ::before {
          display: inline;
          content: '⚠ ';
     }
`;

const SaveBtn = styled.button`
     color: #fff;
     background-color: #007bff;
     height: 31px;
     padding: 5px 12px;
     font-size: 14px;
     line-height: 1.42857143;
     background-image: none;
     border: 1px solid #007bff;
     border-radius: 4px;
     margin: 5px 0;
     &:hover {
          background-color: #0069d9;
     }
     &:focus {
          outline: none;
     }
`;

const MovieModal = ({
     cancelEditMovie,
     onChangeMovie,
     movie,
     saveMovie,
     genres,
     modal
}) => {
     const { register, handleSubmit, errors } = useForm();
     const onSubmit = () => saveMovie();

     const closeBtn = <CloseBtn onClickMethod={cancelEditMovie} />;
     const errorMessage = 'This field is required.';

     return (
          <div>
               {movie ? (
                    <Modal isOpen={modal}>
                         <ModalHeader close={closeBtn}>Edit movie</ModalHeader>
                         <ModalBody>
                              <form onSubmit={handleSubmit(onSubmit)}>
                                   <TextInput
                                        name="title"
                                        label="Title"
                                        placeholder="Title"
                                        register={register}
                                        required
                                        onChangeMovie={onChangeMovie}
                                        defaultValue={movie.title}
                                   />
                                   {errors.title && (
                                        <ErrorMessage>
                                             {errorMessage}
                                        </ErrorMessage>
                                   )}
                                   <SelectInput
                                        name="genres"
                                        label="Genres"
                                        placeholder="Genres"
                                        genres={genres}
                                        movie={movie}
                                        onChangeMovie={onChangeMovie}
                                   />
                                   <NumberInput
                                        name="year"
                                        label="Year"
                                        placeholder="2020"
                                        onChangeMovie={onChangeMovie}
                                        min="1950"
                                        max="2050"
                                        defaultValue={movie.year}
                                        register={register}
                                        required
                                   />
                                   {errors.year && (
                                        <ErrorMessage>
                                             {errorMessage}
                                        </ErrorMessage>
                                   )}
                                   <NumberInput
                                        name="runtime"
                                        label="Runtime"
                                        placeholder="120"
                                        onChangeMovie={onChangeMovie}
                                        min="1"
                                        max="180"
                                        defaultValue={movie.runtime}
                                        register={register}
                                        required
                                   />
                                   {errors.runtime && (
                                        <ErrorMessage>
                                             {errorMessage}
                                        </ErrorMessage>
                                   )}
                                   <TextInput
                                        name="posterUrl"
                                        label="Image"
                                        placeholder="Image URL"
                                        onChangeMovie={onChangeMovie}
                                        defaultValue={movie.posterUrl}
                                        register={register}
                                   />
                                   <TextInput
                                        name="director"
                                        label="Director"
                                        placeholder="Director"
                                        onChangeMovie={onChangeMovie}
                                        defaultValue={movie.director}
                                        register={register}
                                        required
                                   />
                                   {errors.director && (
                                        <ErrorMessage>
                                             {errorMessage}
                                        </ErrorMessage>
                                   )}
                                   <TextAreaInput
                                        name="actors"
                                        rows="2"
                                        label="Actors"
                                        onChangeMovie={onChangeMovie}
                                        placeholder="Actor, Actor, ..."
                                        defaultValue={movie.actors}
                                        register={register}
                                        required
                                   />
                                   {errors.actors && (
                                        <ErrorMessage>
                                             {errorMessage}
                                        </ErrorMessage>
                                   )}
                                   <TextAreaInput
                                        name="plot"
                                        rows="4"
                                        label="Plot"
                                        onChangeMovie={onChangeMovie}
                                        placeholder="Plot"
                                        defaultValue={movie.plot}
                                        register={register}
                                   />
                                   <ModalFooter>
                                        <SaveBtn type="submit">Save</SaveBtn>
                                        <MyButton
                                             size="sm"
                                             color="secondary"
                                             title="Cancel"
                                             onClickMethod={cancelEditMovie}
                                        />
                                   </ModalFooter>
                              </form>
                         </ModalBody>
                    </Modal>
               ) : null}
          </div>
     );
};
export default MovieModal;
