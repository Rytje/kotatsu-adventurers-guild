import React, { Dispatch, SetStateAction } from 'react';
import { Row, Col } from 'react-bootstrap';

type Props = {
    content: string;
    setContent: Dispatch<SetStateAction<string>>;
};

export default function NavigationBar({content, setContent}:Props) {

    function Navigate(val: string){
        console.log(val);
        setContent(val);
    }

    return (
        <nav>
            <Row className='gx-0'>
                <Col>
                    <button className="btn btn-primary w-100" onClick={() => { Navigate("PlayerList") }}>Player list</button>
                </Col>
                <Col>
                    <button className="btn btn-primary w-100" onClick={() => { Navigate("CommisionBoard") }}>Commision board</button>
                </Col>
                <Col>
                    <button className="btn btn-primary w-100" onClick={() => { Navigate("CoopTips") }}>Co-op tips</button>
                </Col>
            </Row>
        </nav>
    )
}
