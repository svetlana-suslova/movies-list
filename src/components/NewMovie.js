import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MyButton, CloseBtn } from './common/Buttons';

const NewMovie = ({addMovie, cancelEditMovie}) => {

const [modal, setModal] = useState(false);

const openModal = () => {
    setModal(!modal);
    addMovie();
}

const cancelModal = () => {
    setModal(!modal);
    cancelEditMovie();
}

const closeBtn = <CloseBtn onClickMethod={cancelModal}/>;

return (
    <div>
        <MyButton color="success" 
        onClickMethod={openModal} 
        title="+"/>
        <Modal isOpen={modal} >
            <ModalHeader close={closeBtn}>
                Edit movie
            </ModalHeader>
            <ModalBody>
                <input type="text"/>
                <input type="number"/>
                <input type="number"/>
                <input type="select"/>
                <input type="text"/>
                <textarea name="" cols="30" rows="10"></textarea>
                <textarea name="" cols="30" rows="10"></textarea>
            </ModalBody>
            <ModalFooter>
                <MyButton size="sm" color="primary" 
                title="Save"/>
                <MyButton size="sm" color="secondary" 
                onClickMethod={cancelModal} 
                title="Cancel"/>
            </ModalFooter>
        </Modal>
    </div>
    );   
}
export default NewMovie;