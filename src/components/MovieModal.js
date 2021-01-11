import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MyButton, CloseBtn } from './common/Buttons';
import {TextInput, TextAreaInput, NumberInput} from './common/Inputs';

const MovieModal = ({createNewMovie, cancelEditMovie, onChangeMovie, movie, saveMovie}) => {

const [modal, setModal] = useState(false);

const openModal = () => {
    setModal(!modal);
    createNewMovie();
}

const cancelModal = () => {
    setModal(!modal);
    cancelEditMovie();
}

const save = () =>  {
    setModal(!modal);
    saveMovie();
}

const closeBtn = <CloseBtn onClickMethod={cancelModal}/>

return (
    <div>
        <MyButton color="success" 
        onClickMethod={openModal} 
        title="+"/>
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
                    onChangeMovie={onChangeMovie}/>
                    <NumberInput
                    name="year"
                    label="Year"
                    placeholder="2020"
                    onChangeMovie={onChangeMovie}
                    min="1950"/>
                    <NumberInput
                    name="runtime"
                    label="Runtime"
                    placeholder="120"
                    onChangeMovie={onChangeMovie}
                    min="1"/>
                    <input type="select"/>
                    <TextInput
                    name="director"
                    label="Director"
                    placeholder="Director"
                    onChangeMovie={onChangeMovie}/>
                    <TextAreaInput
                    name="actors"
                    rows={2}
                    label="Actors comma separated"
                    onChangeMovie={onChangeMovie}
                    placeholder="Actors"/>
                    <TextAreaInput
                    name="plot"
                    rows={4}
                    label="Plot"
                    onChangeMovie={onChangeMovie}
                    placeholder="Plot"/>
                </ModalBody>
                <ModalFooter>
                    <MyButton size="sm" color="primary" 
                    title="Save" onClickMethod={save}/>
                    <MyButton size="sm" color="secondary" 
                    title="Cancel"onClickMethod={cancelModal}/>
                </ModalFooter>
            </Modal>
            : null
        }
    </div>
    );   
}
export default MovieModal;