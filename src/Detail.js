import React, { Component } from 'react';
import './App.css';
import {Grid, Row, Col, FormGroup, FormControl, Button, Dropdown, MenuItem, Glyphicon} from 'react-bootstrap';
import logo from './assets/logo.png';
import {NavLink} from 'react-router-dom';
import {connect} from 'redux-zero/react';

const Detail = ({boards, selectedItem}) =>
{
    const listList = boards[selectedItem].lists.map((list, index) => {
        const listCard= list.cards.map((card, index) => (
            <Row key={index}>
                <Col xs={12} md={12}>
                    <div className="card">{card}</div>
                </Col>
            </Row>
        ));
        return(
        <Col key={index} xs={3} xsOffset={0} md={3} mdOffset={0}>
            <div className="btn list">
                <Row>
                    <Col xs={12} md={12}>
                        {list.name}
                    </Col>
                </Row>
                {listCard}
                <Row className="btn newCard">
                    <Col xs={12} md={12}>
                        Add new card...                        
                    </Col>
                </Row>
            </div>
        </Col>
        )
    })
  return (
    <Grid fluid={true}>
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
            <NavLink to={"/boards"}><img width={150} src={logo} className="" alt="logo"/></NavLink>
        </Col>
        <Col xs={1} xsOffset={3} md={1} mdOffset={3}>
            <div className="btn headerElement">John Doe</div>
        </Col>
        <Col xs={1} xsOffset={0} md={1} mdOffset={0}>
            <div className="btn headerElement">
                <NavLink to={"/signin"}><i className="fa fa-sign-out" aria-hidden="true"></i> Sign out</NavLink>
            </div>
        </Col>
      </Row>
      <Row>
        <Col xs={2} xsOffset={0} md={2} mdOffset={0} className="myBoards">
            {boards[selectedItem].name}
        </Col>
      </Row>
      <Row>
          {listList}
        <Col xs={3} xsOffset={0} md={3} mdOffset={0}>
            <div className="btn new">Add new list...</div>
        </Col>       
      </Row>
    </Grid>
  );
}

const mapToProps = ({boards, selectedItem}) => ({boards, selectedItem})

export default connect(mapToProps)(Detail);