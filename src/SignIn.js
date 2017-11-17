import React, { Component } from 'react';
import './App.css';
import {Grid, Row, Col, FormGroup, FormControl, Button} from 'react-bootstrap';
import logo from './assets/logo.png'
import {NavLink} from 'react-router-dom';

const SignIn = () =>
{
  return (
    <Grid>
      <Row className="">
        <Col xs={4} xsOffset={4} md={4} mdOffset={4}>
          <img src={logo} className="" alt="logo" />
        </Col>
      </Row>
      <Row>
        <Col xs={4} xsOffset={4} md={4} mdOffset={4}>
          <form onSubmit={
            e => {
               e.preventDefault();
              //  signIn ( this.emailInputRef.value,  this.passwordInputRef.value)
              console.log("Sdasfsdfsd");
              console.log(this.input.value);
            }
          }>
            <FormGroup
              controlId="formBasicText"
              validationState=""
            >
              <FormControl inputRef={ref => { this.input = ref; }}
                type="text"
                // value=""
                placeholder="Email"
                onChange=""
                // inputRef = { e => this.passwordInputRef = e}
              />
              {console.log(this.passwordInputRef)}
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="formBasicText"
              validationState=""
            >
              <FormControl
                type="text"
                value=""
                placeholder="Password"
                onChange=""
              />
              <FormControl.Feedback />
            </FormGroup>
            {/* <NavLink to={"/boards"}> */}
              <Button type="submit" bsSize="large" block>
                Sign in
              </Button>
            {/* </NavLink> */}
          </form>
        </Col>
      </Row>
      <Row>
        <Col xs={4} xsOffset={4} md={4} mdOffset={4}>
          <NavLink to={"/signup"}>Create new account</NavLink>
        </Col>       
      </Row>
    </Grid>
  );
}

export default SignIn;