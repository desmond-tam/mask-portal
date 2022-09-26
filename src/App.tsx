import React, { Component } from 'react';
import './App.scss';
import { HeaderSection } from './components/header-section';
import { FooterSection } from './components/footer-section';
import { Col, Container, Row } from 'react-bootstrap';
import { PageSpinner } from './components/page-spinner';
import { BodySection } from './components/body-section';




class App extends Component {


  async componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.google.com/recaptcha/api.js";
    //script.onload = () => this.scriptLoaded();



    //For head
    document.head.appendChild(script);

    // For body
    //document.body.appendChild(script);

    // For component
    //this.div.appendChild(script);
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
        </>
      );
  }
}


export default App;


