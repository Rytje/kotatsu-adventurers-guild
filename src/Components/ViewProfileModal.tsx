import React, { useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { Modal, Button, Row, Col, Image, Container } from 'react-bootstrap';
import charactersJson from '../character-avatar-urls.json';
import artifactsJson from '../artifacts-data.json';
import ConfirmModal from './ConfirmModal';

type Props = {
    showModal: boolean;
    toggleModal: () => void;
    avatar: string, name: string, ign: string, lvl: number, uid: number, server: string, msg: string, favChar: string, wantedChar: string, pinCode: string, updOn: number, docId: string, husbando: string, waifu: string, kiddo: string, artifact: string, setAlert: React.Dispatch<React.SetStateAction<{type: string, content: string}>>, setShowAlert: (value: boolean) => void, GetAllProfiles: ()=> void
}

export default function ViewProfileModal({ showModal, toggleModal, avatar, name, ign, lvl, uid, server, msg, favChar, wantedChar, pinCode, updOn, docId, husbando, waifu, kiddo, artifact, setAlert, setShowAlert, GetAllProfiles }: Props) {

    const [updating, setUpdating] = useState(false);

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    function toggleConfirmModal(){
        setShowConfirmModal(!showConfirmModal);
    }

    let charactersArray = Object.entries(charactersJson);
    charactersArray.sort();
    // let charactersSelect = Array.from(charactersArray);
    // charactersSelect.unshift(["", { "name": "", "url": "", "sex": "", "size": "" }]);

    // let avatarTag = avatar;
    // avatarTag = avatarTag.replace(" ", "");
    // avatarTag = avatarTag.toLowerCase();

    // let characterIndex;
    // characterIndex = charactersArray.findIndex(e => e[0] === avatarTag);

    let artifactsArray = Object.entries(artifactsJson);

    // let artifactTag = artifact;
    // artifactTag = artifactTag.replace(" ", "");
    // artifactTag = artifactTag.toLowerCase();

    // let artifactIndex;
    // artifactIndex = artifactsArray.findIndex(e => e[0] === artifactTag);


    let updatedOnText = Timestamp.fromMillis(updOn * 1000).toDate().toDateString();

    function toggleUpdating() {
        setUpdating(!updating);
    }

    function ConvertTagToCharacterImageSrc(tag: string) {
        if (tag === "") {
            return "";
        }
        let targetTag = tag;
        targetTag = targetTag.replace(" ", "");
        targetTag = targetTag.toLowerCase();

        let targetIndex = charactersArray.findIndex(e => e[0] === targetTag);

        return charactersArray[targetIndex][1].url;
    }

    function ConvertTagToArtifactImageSrc(tag: string) {
        if (tag === "") {
            return "";
        }
        let targetTag = tag;
        targetTag = targetTag.replaceAll(" ", "");
        targetTag = targetTag.toLowerCase();

        let targetIndex = artifactsArray.findIndex(e => e[0] === targetTag);

        return artifactsArray[targetIndex][1].url;
    }


    return (
        <Modal show={showModal} onHide={toggleModal} size={"xl"} className='view-profile-modal'>
            <Modal.Header closeButton>
                <Modal.Title>{ign}'s profile</Modal.Title>
            </Modal.Header>
            <Modal.Body className='profile-view'>
                <Container fluid>
                    <div className='text-center'>
                        <Image roundedCircle src={ConvertTagToCharacterImageSrc(avatar)} className='avatar' />
                    </div>
                    <Row>
                        <Col className='text-center'>{msg}</Col>
                    </Row>
                    <Row>
                        <Col className='ms-lg-5'>
                            <p><b>Name:</b> {name}</p>
                            <p><b>Lvl.</b>{lvl}</p>
                        </Col>
                        <Col className='text-end me-lg-5'>
                            <p><b>UID:</b>{uid}</p>
                            <p><b>Server:</b> {server}</p>
                        </Col>
                    </Row>
                    <Row xs={1} sm={2} lg={3} className='mb-3 justify-content-around'>
                        {favChar ? <Col className='text-center mb-5 mb-sm-0'>
                            <Image roundedCircle src={ConvertTagToCharacterImageSrc(favChar)} className='small-avatar' />
                            <span className='d-block' ><b>Main</b></span>
                        </Col> : null}

                        {wantedChar ? <Col className='text-center mb-5 mb-sm-0'>
                            <Image roundedCircle src={ConvertTagToCharacterImageSrc(wantedChar)} className='small-avatar' />
                            <span className='d-block' ><b>Wanter</b></span>
                        </Col> : null}
                        {artifact ? <Col className='text-center mb-5 mb-sm-0'>
                            <Image roundedCircle src={ConvertTagToArtifactImageSrc(artifact)} className='small-avatar' />
                            <span className='d-block' ><b>Collector</b></span>
                        </Col> : null}
                    </Row>
                    <Row xs={1} sm={2} lg={3} className='mb-5 justify-content-around'>
                        {husbando ? <Col className='text-center mb-5 mb-sm-0'>
                            <Image roundedCircle src={ConvertTagToCharacterImageSrc(husbando)} className='small-avatar' />
                            <span className='d-block' ><b>Best Husbando</b></span>
                        </Col> : null}
                        {waifu ? <Col className='text-center mb-5 mb-sm-0'>
                            <Image roundedCircle src={ConvertTagToCharacterImageSrc(waifu)} className='small-avatar' />
                            <span className='d-block' ><b>Best Waifu</b></span>
                        </Col> : null}
                        {kiddo ? <Col className='text-center'>
                            <Image roundedCircle src={ConvertTagToCharacterImageSrc(kiddo)} className='small-avatar' />
                            <span className='d-block' ><b>Best Chibi</b></span>
                        </Col> : null}
                    </Row>
                    <Row>
                        <Col className='text-center'><p><b>Updated on:</b> {updatedOnText}</p></Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer className='d-flex justify-content-between'>
                <Button variant="danger" onClick={toggleConfirmModal}>Delete</Button>
                <ConfirmModal showConfirmModal={showConfirmModal} toggleConfirmModal={toggleConfirmModal} toggleViewModal={toggleModal} pinCode={pinCode} docId={docId} setAlert={setAlert} setShowAlert={setShowAlert} GetAllProfiles={GetAllProfiles} />
                <div>
                    <Button variant="secondary" onClick={toggleModal} className='me-3'>Close</Button>
                    <Button variant="primary" onClick={toggleUpdating} disabled>Update</Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}