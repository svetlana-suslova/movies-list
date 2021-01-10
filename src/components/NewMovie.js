import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styled from 'styled-components';

const PlusButton = styled(Button)`
    &:focus {
        box-shadow: 0 0 0 0 rgba(0,123,255,0)!important;
    }
`;

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

const closeBtn = <button className="close" onClick={cancelModal}>&times;</button>;

return (
    <div>
        <PlusButton color="success"  onClick={openModal}>+</PlusButton>
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
                <Button color="primary" >Save</Button>
                <Button color="secondary" onClick={cancelModal}>Cancel</Button>
            </ModalFooter>
        </Modal>
    </div>
    );   
}
export default NewMovie;