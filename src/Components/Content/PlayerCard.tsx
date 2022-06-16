import React from 'react';
import { Col, Row } from 'react-bootstrap';
import charactersJson from '../../character-avatar-urls.json';
import ViewProfileButton from '../ViewProfileButton';

type Props = {
    avatar: string;
    name: string;
    ign: string;
    lvl: number;
    uid: number;
    server: string;
    msg: string;
    favChar: string;
    wantedChar: string;
    pinCode: string;
    updOn: number;
    docId: string;
    husbando: string;
    waifu: string;
    kiddo: string;
    artifact: string;
    setAlert: React.Dispatch<React.SetStateAction<{ type: string, content: string }>>;
    setShowAlert: (value: boolean) => void;
    GetAllProfiles: () => void;
};

export default function PlayerCard({ avatar, name, ign, lvl, uid, server, msg, favChar, wantedChar, pinCode, updOn, docId, husbando, waifu, kiddo, artifact, setAlert, setShowAlert, GetAllProfiles }: Props) {

    let charactersArray = Object.entries(charactersJson);
    charactersArray.sort();
    // let charactersSelect = Array.from(charactersArray);
    // charactersSelect.unshift(["", { "name": "", "url": "", "sex": "", "size": "" }]);

    let characterTag = avatar;
    characterTag = characterTag.replace(" ", "");
    characterTag = characterTag.toLowerCase();

    let characterIndex;
    characterIndex = charactersArray.findIndex(e => e[0] === characterTag);



    return (
        <Row className='player-card mb-1'>
            <Col className='d-flex' xs={4} md={3} lg={2}><img className='img-fluid rounded-circle align-self-center' src={charactersArray[characterIndex][1].url} /></Col>
            <Col xs={6} md={4} className='d-flex flex-column justify-content-center' >
                <h3>{ign}</h3>
                <h4 className='text-muted'>{name}</h4>
                <span>Lv. {lvl}</span>
                <span className='d-block'>UID: {uid} <span className='text-muted'>({server})</span></span>
            </Col>
            <Col md={4} className='d-none d-md-block align-self-center'><p>{msg}</p></Col>
            {/* <Col className='d-flex' xs={2} md={1}><Button variant='outline-primary' className='align-self-center'><BsSearch /></Button></Col> */}
            <ViewProfileButton avatar={avatar} name={name} ign={ign} lvl={lvl} uid={uid} server={server} msg={msg} favChar={favChar} wantedChar={wantedChar} pinCode={pinCode} updOn={updOn} docId={docId} husbando={husbando} waifu={waifu} kiddo={kiddo} artifact={artifact} setAlert={setAlert} setShowAlert={setShowAlert} GetAllProfiles={GetAllProfiles} />
        </Row>
    )
}