import React, { Component } from 'react';
import './App.css';
import {Grid, Row, Col, FormGroup, FormControl, Button} from 'react-bootstrap';
import logo from './assets/logo.png';
import {NavLink} from 'react-router-dom';

const SignUp = () =>
{
  return (
    <Grid>
      <Row>
        <Col xs={4} xsOffset={4} md={4} mdOffset={4}>
          <img src={logo} className="" alt="logo" />
        </Col>
      </Row>
      <Row>
        <Col xs={4} xsOffset={4} md={4} mdOffset={4}>
          <form>
            <FormGroup
              controlId="formBasicText"
              validationState=""
            >
              <FormControl
                type="text"
                value=""
                placeholder="First Name"
                onChange=""
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="formBasicText"
              validationState=""
            >
              <FormControl
                type="text"
                value=""
                placeholder="Last Name"
                onChange=""
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="formBasicText"
              validationState=""
            >
              <FormControl
                type="text"
                value=""
                placeholder="Email"
                onChange=""
              />
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
            <FormGroup
              controlId="formBasicText"
              validationState=""
            >
              <FormControl
                type="text"
                value=""
                placeholder="Confirm Password"
                onChange=""
              />
              <FormControl.Feedback />
            </FormGroup>
            <Button type="submit" bsSize="large" block>
              Sign up
            </Button>
          </form>
        </Col>
      </Row>
      <Row>
        <Col xs={4} xsOffset={4} md={4} mdOffset={4}>
            <NavLink to={"/signin"}>Sign in</NavLink>
        </Col>       
      </Row>
    </Grid>
  );
}

export default SignUp;