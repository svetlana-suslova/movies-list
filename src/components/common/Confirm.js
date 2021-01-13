import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MyButton, CloseBtn } from './Buttons';

const Confirm = ({ cancelDeleteMovie, deleteMovie, movie, confirm }) => {

    const closeBtn = <CloseBtn onClickMethod={cancelDeleteMovie}/>

    return (
        <div>
            {
                movie
                ? <Modal isOpen={confirm} >
                    <ModalHeader close={closeBtn}>
                        Are you sure?
                    </ModalHeader>
                    <ModalBody>
                        <div>{`'${movie.title}' will be deleted from the list.`}</div>
                    </ModalBody>
                    <ModalFooter>
                        <MyButton size="sm" color="danger" 
                        title="Delete" onClickMethod={deleteMovie}/>
                        <MyButton size="sm" color="secondary" 
                        title="Cancel"onClickMethod={cancelDeleteMovie}/>
                    </ModalFooter>
                </Modal>
                : null
            }
        </div>
    );   
}
export default Confirm;