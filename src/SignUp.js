import React, { Component } from 'react';
import './App.css';
import {Grid, Row, Col, FormGroup, FormControl, Button} from 'react-bootstrap';
import logo from './assets/logo.png';
import {NavLink, Redirect} from 'react-router-dom';
import {connect} from 'redux-zero/react';
import {signIn, signOut, signUp} from './actions';
import HeaderLoginRegister from './HeaderLoginRegister'

const SignUp = ({successLogin}) =>
{
  return (
    <Grid>
      {
        successLogin  && <Redirect to="/boards" />
      }
      <HeaderLoginRegister/>
      <Row>
        <Col xs={4} xsOffset={4} md={4} mdOffset={4}>
          <form onSubmit =  
            {
              e => 
              {
                e.preventDefault();
                signUp(this.inputFirstName.value, this.inputLastName.value, this.inputEmail.value, this.inputPassword.value, this.inputConfirmPassword.value) 
              }
            }>
            <FormGroup
              controlId="formBasicText"
              validationState=""
            >
              <FormControl
                inputRef={ref => {this.inputFirstName = ref}}             
                type="text"
                placeholder="First Name"
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="formBasicText"
              validationState=""
            >
              <FormControl
                inputRef={ref => {this.inputLastName = ref}}                
                type="text"
                placeholder="Last Name"
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="formBasicText"
              validationState=""
            >
              <FormControl
                inputRef={ref => {this.inputEmail = ref}}                
                type="text"
                placeholder="Email"
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="formBasicText"
              validationState=""
            >
              <FormControl
                inputRef={ref => {this.inputPassword = ref}}                
                type="text"
                placeholder="Password"
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="formBasicText"
              validationState=""
            >
              <FormControl
                inputRef={ref => {this.inputConfirmPassword = ref}}                
                type="text"
                placeholder="Confirm Password"
              />
              <FormControl.Feedback />
            </FormGroup>
            <Button type="submit" bsSize="large" block>
              Sign up
            </Button>
          </form>
        </Col>
      </Row>
      <Row className="toSignIn text-center">
        <Col xs={4} xsOffset={4} md={4} mdOffset={4}>
            <NavLink to={"/signin"}>Sign in</NavLink>
        </Col>       
      </Row>
    </Grid>
  );
}

const mapToProps = ({successLogin}) => ({successLogin}) 
export default connect(mapToProps)(SignUp);