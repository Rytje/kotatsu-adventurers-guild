import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';

type Props = {
    avatarURL: string;
};

export default function PlayerCard({ avatarURL }: Props) {
    return (
        <Row className='player-card mb-1'>
            <Col className='d-flex' xs={4} md={3} lg={2}><img className='img-fluid rounded-circle align-self-center' src={avatarURL} /></Col>
            <Col xs={6} md={4} className='d-flex flex-column justify-content-center' >
            <h3> Kana</h3>
            <h4 className='text-muted'>Ryno</h4>
            <span>Lv. 58</span>
            <span className='d-block'>UID: 703704060</span>
            </Col>
            <Col md={4} className='d-none d-md-block align-self-center'><p>Random text Random text Random text Random text Random text Random text Random text Random text Random text Random text Random text Random text Random text Random text Random text Random text </p></Col>
            <Col className='d-flex' xs={2} md={1}><Button variant='outline-primary' className='align-self-center'><BsSearch /></Button></Col>
        </Row>
    )
}