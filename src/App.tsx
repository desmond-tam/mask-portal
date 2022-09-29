import React, { Component } from 'react';
import './App.scss';
import { HeaderSection } from './components/header-section';
import { FooterSection } from './components/footer-section';
import { Col, Container, Row } from 'react-bootstrap';
import { PageSpinner } from './components/page-spinner';
import { BodySection } from './components/body-section';
import { ToastSection } from './components/toast-section';


class App extends Component {


  async componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.google.com/recaptcha/api.js";
    document.head.appendChild(script);
  }

  render() {
      return (
        <> 
          <PageSpinner />
          <Container>
              <Row>
                  <Col>
                      <HeaderSection></HeaderSection>
                      <div className='content-body'>
                        <BodySection></BodySection>
                      </div>
                  </Col>
              </Row>
          </Container>
          <FooterSection></FooterSection>
          <ToastSection></ToastSection>
        </>
      );
  }
}


export default App;


