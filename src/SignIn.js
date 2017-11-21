import React, { Component } from 'react';
import './App.css';
import {Grid, Row, Col, FormGroup, FormControl, Button} from 'react-bootstrap';
import logo from './assets/logo.png'
import {NavLink, Redirect} from 'react-router-dom';
import {connect} from 'redux-zero/react'
import {signIn, signOut, signUp} from './actions'
import HeaderLoginRegister from './HeaderLoginRegister'

const SignIn = ({successLogin}) =>
{
  return (
    <Grid className="signIn">
      {
        successLogin  && <Redirect to = "/boards" />
      }
      <HeaderLoginRegister/>
      <Row>
        <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={4} lgOffset={4}>
          <form onSubmit={
            e => {
               e.preventDefault();
               signIn(this.inputEmail.value,  this.inputPassword.value);
            }
          }>
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
                type="password"
                placeholder="Password"
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
      <Row className="toSignUp text-center">
        <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={4} lgOffset={4}>
          <NavLink to={"/signup"}>Create new account</NavLink>
        </Col>       
      </Row>
    </Grid>
  );
}

const mapToProps = ({successLogin}) => ({successLogin}) 
export default connect(mapToProps)(SignIn);