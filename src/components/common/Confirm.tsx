import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { MyButton, CloseBtn } from './Buttons';
import {MovieType} from '../../types/types';

type PropsType = {
    movie: MovieType | null, 
    confirm: boolean,
    cancelDeleteMovie: () => void,
    deleteMovie: () => void
}
const Confirm: React.FC<PropsType> = ({ cancelDeleteMovie, deleteMovie, movie, confirm }) => {

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