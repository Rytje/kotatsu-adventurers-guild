import { useState, useEffect } from 'react';
import { Col, Container, Row, Tabs, Tab } from 'react-bootstrap';
import CommisionBoard from './Components/Content/CommissionBoard';
import PlayerList from './Components/Content/PlayerList';
import Tips from './Components/Content/Tips';

function App() {

  return (
    <Container fluid="sm" className='' >
      <header>
        <Row className='my-3' >
          <Col>
            <h1>Tomodachi Impact</h1>
          </Col>
        </Row>
      </header>

      <main>
        <Tabs variant='pills' defaultActiveKey="playerlist" className='rounded my-3' >
          <Tab eventKey="playerlist" title="Player List" >
            <PlayerList />
          </Tab>
          <Tab eventKey="commissionboard" title="Commission Board" >
            <CommisionBoard />
          </Tab>
          <Tab eventKey="tips" title="Tips" >
            <Tips />
          </Tab>
        </Tabs>
      </main>
    </Container>
  );
}

export default App;
