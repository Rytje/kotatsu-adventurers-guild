import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import AddProfileModal from './AddProfileModal';

type Props = {
    setAlert: React.Dispatch<React.SetStateAction<{type: string, content: string}>>;
    setShowAlert: (value: boolean) => void;
    GetAllProfiles: () => void;
};

export default function AddProfileButton({ setAlert, setShowAlert, GetAllProfiles }: Props) {

    const [showModal, setShowModal] = useState(false);

    function toggleModal() {
        setShowModal(!showModal);
    }

    return (
        <>
            <Row className='mb-2' >
                <Col className='justify-content-center d-flex' >
                    <Button onClick={toggleModal} size='lg' className='text-white' >Add your profile</Button>
                </Col>
            </Row>

            <AddProfileModal showModal={showModal} toggleModal={toggleModal} setAlert={setAlert} setShowAlert={setShowAlert} GetAllProfiles={GetAllProfiles} />
        </>
    )
}