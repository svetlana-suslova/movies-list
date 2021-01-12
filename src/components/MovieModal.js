import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MyButton, CloseBtn } from './common/Buttons';
import {TextInput, TextAreaInput, NumberInput, SelectInput} from './common/Inputs';

const MovieModal = ({cancelEditMovie, onChangeMovie, movie, saveMovie, genres, modal}) => {

    const genresOptions = genres.filter(g => g !== "ALL").map(g => ({value: g, label: g}));
 
    const selectedGenres = genresOptions.filter(go => {
        if (!movie) return false;
        return movie.genres.indexOf(go.value) >= 0;
    });

    const closeBtn = <CloseBtn onClickMethod={cancelEditMovie}/>

    return (
        <div>
            {
                movie
                ? <Modal isOpen={modal} >
                    <ModalHeader close={closeBtn}>
                        Edit movie
                    </ModalHeader>
                    <ModalBody>
                        <TextInput
                        name="title"
                        label="Title"
                        placeholder="Title"
                        onChangeMovie={onChangeMovie}
                        value={movie.title}/>
                        <NumberInput
                        name="year"
                        label="Year"
                        placeholder="2020"
                        onChangeMovie={onChangeMovie}
                        min="1950"
                        value={movie.year}/>
                        <NumberInput
                        name="runtime"
                        label="Runtime"
                        placeholder="120"
                        onChangeMovie={onChangeMovie}
                        min="1"
                        value={movie.runtime}/>
                        <SelectInput
                        name="genres"
                        label="Genres"
                        options={genresOptions}
                        onChangeMovie={onChangeMovie}
                        value={selectedGenres}/>
                        <TextInput
                        name="director"
                        label="Director"
                        placeholder="Director"
                        onChangeMovie={onChangeMovie}
                        value={movie.director}/>
                        <TextAreaInput
                        name="actors"
                        rows={2}
                        label="Actors comma separated"
                        onChangeMovie={onChangeMovie}
                        placeholder="Actors"
                        value={movie.actors}/>
                        <TextAreaInput
                        name="plot"
                        rows={4}
                        label="Plot"
                        onChangeMovie={onChangeMovie}
                        placeholder="Plot"
                        value={movie.plot}/>
                    </ModalBody>
                    <ModalFooter>
                        <MyButton size="sm" color="primary" 
                        title="Save" onClickMethod={saveMovie}/>
                        <MyButton size="sm" color="secondary" 
                        title="Cancel"onClickMethod={cancelEditMovie}/>
                    </ModalFooter>
                </Modal>
                : null
            }
        </div>
    );   
}
export default MovieModal;