import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import AddProfileModal from './AddProfileModal';

type Props = {};

export default function AddProfileButton({ }: Props) {

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

            <AddProfileModal showModal={showModal} toggleModal={toggleModal} />
        </>
    )
}