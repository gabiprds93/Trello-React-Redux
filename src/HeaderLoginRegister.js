import React, { Component } from 'react';
import './App.css';
import {Grid, Row, Col, FormGroup, FormControl, Button} from 'react-bootstrap';
import logo from './assets/logo.png'

const HeaderLoginRegister = () =>
{
    return(
        <Row className="headerLoginRegister text-center">
            <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={3} lg={4} lgOffset={4}>
                <img src={logo} className="logo" alt="logo" />
            </Col>
        </Row>
    )
}

export default HeaderLoginRegister;