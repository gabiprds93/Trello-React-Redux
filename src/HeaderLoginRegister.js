import React, { Component } from 'react';
import './App.css';
import {Grid, Row, Col, FormGroup, FormControl, Button} from 'react-bootstrap';
import logo from './assets/logo.png'

const HeaderLoginRegister = () =>
{
    return(
        <Row className="headerLoginRegister text-center">
            <Col xs={4} xsOffset={4} sm={4} smOffset={4} md={4} mdOffset={4} lg={4} lgOffset={4}>
                <img src={logo} className="logo" alt="logo" />
            </Col>
        </Row>
    )
}

export default HeaderLoginRegister;