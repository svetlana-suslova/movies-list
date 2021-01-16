import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { MyButton, CloseBtn } from './common/Buttons';
import {TextInput, TextAreaInput, NumberInput, SelectInput} from './common/Inputs';
import { useForm } from "react-hook-form";
import styled from 'styled-components';

const ErrorMessage = styled.p`
    color: #bf1650;
    ::before {
        display: inline;
        content: "⚠ ";
    }
`;

const MovieModal = ({cancelEditMovie, onChangeMovie, movie, saveMovie, genres, modal }) => {

    const genresOptions = genres.filter(g => g !== "ALL").map(g => ({value: g, label: g}));

    const selectedGenres = genresOptions.filter(go => {
        if (!movie) return false;
        return movie.genres.indexOf(go.value) >= 0;
    });

    const { register, handleSubmit, errors, control } = useForm();
    const onSubmit = () => saveMovie();

    const closeBtn = <CloseBtn onClickMethod={cancelEditMovie}/>
    const errorMessage = 'This field is required.';

    return (
        <div>
            {
                movie
                ? <Modal isOpen={modal} >
                    <ModalHeader close={closeBtn}>
                        Edit movie
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <TextInput
                            name="title"
                            label="Title"
                            placeholder="Title"
                            register={register}
                            required
                            onChangeMovie={onChangeMovie}
                            defaultValue={movie.title} />
                            {errors.title && <ErrorMessage>{errorMessage}</ErrorMessage>}
                            <SelectInput
                            name="genres"
                            label="Genres"
                            options={genresOptions}
                            onChangeMovie={onChangeMovie}
                            defaultValue={selectedGenres}
                            control={control} />
                            {errors.genres && <ErrorMessage>{errorMessage}</ErrorMessage>}
                            <NumberInput
                            name="year"
                            label="Year"
                            placeholder="2020"
                            onChangeMovie={onChangeMovie}
                            min="1950"
                            defaultValue={movie.year}
                            register={register}
                            required />
                            {errors.year && <ErrorMessage>{errorMessage}</ErrorMessage>}
                            <NumberInput
                            name="runtime"
                            label="Runtime"
                            placeholder="120"
                            onChangeMovie={onChangeMovie}
                            min="1"
                            defaultValue={movie.runtime}
                            register={register}
                            required />
                            {errors.runtime && <ErrorMessage>{errorMessage}</ErrorMessage>}
                            <TextInput
                            name="director"
                            label="Director"
                            placeholder="Director"
                            onChangeMovie={onChangeMovie}
                            defaultValue={movie.director}
                            register={register}
                            required />
                            {errors.director && <ErrorMessage>{errorMessage}</ErrorMessage>}
                            <TextAreaInput
                            name="actors"
                            rows="2"
                            label="Actors comma separated"
                            onChangeMovie={onChangeMovie}
                            placeholder="Actors"
                            defaultValue={movie.actors}
                            register={register}
                            required />
                            {errors.actors && <ErrorMessage>{errorMessage}</ErrorMessage>}
                            <TextAreaInput
                            name="plot"
                            rows="4"
                            label="Plot"
                            onChangeMovie={onChangeMovie}
                            placeholder="Plot"
                            defaultValue={movie.plot}
                            register={register} />
                            <button type="submit">Save</button>
                            <MyButton size="sm" color="secondary" 
                            title="Cancel"onClickMethod={cancelEditMovie}/>
                        </form>
                    </ModalBody>
                </Modal>
                : null
            }
        </div>
    );   
}
export default MovieModal;