import React, { ChangeEventHandler, useState } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { doc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../firebase-config';

type Props = { showConfirmModal: boolean, toggleConfirmModal: () => void, toggleViewModal: ()=> void, pinCode: string, docId: string, setAlert: React.Dispatch<React.SetStateAction<{type: string, content: string}>>, setShowAlert: (value: boolean) => void, GetAllProfiles: ()=> void }

export default function ConfirmModal({ showConfirmModal, toggleConfirmModal, toggleViewModal, pinCode, docId, setAlert, setShowAlert, GetAllProfiles }: Props) {

    const [value, setValue] = useState("");
    const [attempts, setAttempts] = useState(0);

    async function DeleteDocument(){
        await deleteDoc(doc(firestore, "users", docId));
        setAlert({
            type: "success",
            content: "User data deleted!"
        });
        setShowAlert(true);
        GetAllProfiles();
        toggleConfirmModal();
        toggleViewModal();
    }

    function HandleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    function AttemptDelete() {
        value === pinCode ? DeleteDocument() : setAttempts(attempts + 1);
    }

    return (
        <Modal show={showConfirmModal} onHide={toggleConfirmModal} className='add-profile-modal'>
            <Modal.Header closeButton>
                <Modal.Title>Delete profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel label="Pin code" controlId='pinCode'>
                    <Form.Control type='password' placeholder='1234' onChange={HandleChange} value={value}></Form.Control>
                </FloatingLabel>
                {attempts > 0 && <span className='text-danger'>The pincode you entered is wrong! Attempt #{attempts}</span>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary text-black" onClick={toggleConfirmModal}>
                    Close
                </Button>
                <Button variant="danger" onClick={AttemptDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}