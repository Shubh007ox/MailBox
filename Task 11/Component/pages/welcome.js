// import React from "react";

// function WelcomePage(){
//     return(
//         <div>
//             <h1>This is the welcome for MailBox</h1>
//         </div>
//     )
// }

// export default WelcomePage;
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './WelcomePage.css';

function WelcomePage() {
  return (
    <div className="welcome-page">
      <Container>
        <Row>
          <Col xs={12}>
            <h1 className="text-center text-white">Welcome to Mailbox</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <p className="text-center text-white">
              Keep your messages organized and stay on top of your inbox.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default WelcomePage;
