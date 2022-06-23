import React from 'react';
import { Col, Row, ListGroup, ListGroupItem } from 'react-bootstrap';

type Props = {};

export default function Tips({ }: Props) {
    return (
        <Row xs={1} sm={2} className='my-3'>
            <Col className='tip-window' >
                <h2>General tips</h2>
                <ListGroup>
                    <ListGroupItem>If you are facing strong enemies, consider picking a character that can heal/shield.</ListGroupItem>
                    <ListGroupItem>If there is no healer or shield in the party, consider equipping a <a href="https://genshin-impact.fandom.com/wiki/NRE_(Menu_30)" target="_blank" rel="noopener noreferrer">NRE</a>.</ListGroupItem>
                    <ListGroupItem>You can sell/destroy your useless artifacts for Mora.</ListGroupItem>
                </ListGroup>
            </Col>
            <Col className='tip-window' >
                <h2>Tips for domains</h2>
                <ListGroup>
                    <ListGroupItem>If you want to repeat a domain quickly, don't leave immediately after receiving your rewards. If <strong>everyone</strong> waits, the party leader can invite everyone to keep going without returning to the overworld.</ListGroupItem>
                    <ListGroupItem>Checkout the Leyline disorder, sometimes certain elemental reactions cause you and your friends to take damage.</ListGroupItem>
                    <ListGroupItem>Checkout the enemies within the domain. Fighting Electro slimes with Lisa ain't really gonna do much you know?</ListGroupItem>
                    <ListGroupItem>Try to form the party based on the enemies you are facing. Your favorite character ain't always the right pick.</ListGroupItem>
                    <ListGroupItem>If you are facing enemies with armor/shields, consider bringing a Claymore user, or elements that react to the enemies shield.</ListGroupItem>
                    <ListGroupItem>Make sure all players are in the character select screen before entering.</ListGroupItem>
                    <ListGroupItem>Before you start and summon the monsters, make sure all players are on the field, because you can lock teammates out of the arena.</ListGroupItem>
                </ListGroup>
            </Col>
        </Row>
    )
}