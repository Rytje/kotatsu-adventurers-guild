import React, { useState } from 'react';
import { Col, Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import ViewProfileModal from './ViewProfileModal';

type Props = {
    avatar: string, name: string, ign: string, lvl: number, uid: number, server: string, msg: string, favChar: string, wantedChar: string, pinCode: string, updOn: number, docId: string, husbando: string, waifu: string, kiddo: string, artifact: string, setAlert: React.Dispatch<React.SetStateAction<{type: string, content: string}>>, setShowAlert: (value: boolean) => void, GetAllProfiles: ()=> void
}

export default function ViewProfileButton({ avatar, name, ign, lvl, uid, server, msg, favChar, wantedChar, pinCode, updOn, docId, husbando, waifu, kiddo, artifact, setAlert, setShowAlert, GetAllProfiles }: Props) {

    const [showModal, setShowModal] = useState(false);

    function toggleModal() {
        setShowModal(!showModal);
    }


    return (
        <>
            <Col className='d-flex' xs={2} md={1}><Button variant='outline-primary' className='align-self-center' onClick={toggleModal}><BsSearch /></Button></Col>

            <ViewProfileModal showModal={showModal} toggleModal={toggleModal} avatar={avatar} name={name} ign={ign} lvl={lvl} uid={uid} server={server} msg={msg} favChar={favChar} wantedChar={wantedChar} pinCode={pinCode} updOn={updOn} docId={docId} husbando={husbando} waifu={waifu} kiddo={kiddo} artifact={artifact}  setAlert={setAlert} setShowAlert={setShowAlert} GetAllProfiles={GetAllProfiles} />
        </>
    )
}