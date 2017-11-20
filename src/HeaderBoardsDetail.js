import React, { Component } from 'react';
import './App.css';
import {Grid, Row, Col, FormGroup, FormControl, Button, Dropdown, MenuItem, Glyphicon} from 'react-bootstrap';
import logo from './assets/logo.png';
import {NavLink} from 'react-router-dom';
import {signOut} from './actions';
import {connect} from 'redux-zero/react';

const HeaderBoardsDetail = ({user}) =>
{
    return(
        <Row className="header">
            <Col xs={1} xsOffset={0} md={1} mdOffset={0}>
                <Dropdown id="dropdown-custom-1">
                    <Dropdown.Toggle>
                        <i className="fa fa-columns" aria-hidden="true"></i> Boards
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="super-colors">
                        <MenuItem eventKey="1">Action</MenuItem>
                        <MenuItem eventKey="2">Another action</MenuItem>
                        <MenuItem eventKey="3" active>Active Item</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey="4">Separated link</MenuItem>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
            <Col xs={2} xsOffset={4} md={2} mdOffset={4}>
                <img width={150} src={logo} className="" alt="logo" />
            </Col>
            <Col xs={1} xsOffset={3} md={1} mdOffset={3}>
                <div className="btn headerElement">{user.firstName + " " + user.lastName}</div>
            </Col>
            <Col xs={1} xsOffset={0} md={1} mdOffset={0}>
                <div className="btn headerElement" onClick={signOut}>
                    <i className="fa fa-sign-out" aria-hidden="true"></i> Sign out
                </div>
            </Col>
        </Row>
    )
}

const mapToProps = ({user}) => ({user}) 
export default connect(mapToProps)(HeaderBoardsDetail);