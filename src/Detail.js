import React, { Component } from 'react';
import './App.css';
import {Grid, Row, Col, FormGroup, FormControl, Button, Dropdown, MenuItem, Glyphicon} from 'react-bootstrap';
import logo from './assets/logo.png';
import {NavLink} from 'react-router-dom';
import {connect} from 'redux-zero/react';
import {addList, changeNewList, inputNewListChange, addCard, changeNewCard, inputNewCardChange} from './actions';

const Detail = ({boards, selectedItem, toAddList, inputNewList, toAddCard, inputNewCard}) =>
{
    const addToList = () => {
        addList(inputNewList, boards[selectedItem].id, selectedItem);
        // selectBoard(boards.length);
    };
    const addToCard = () =>{
        addCard(inputNewCard);
    }
    console.log("boards",boards);
    console.log("selected", selectedItem);
    console.log("lists", boards[selectedItem].lists);    
    const listList = boards[selectedItem].lists.map((list, index) => {
        const listCard = list.cards.map((card, index) => (
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
                <Row className="btn">
                    <Col xs={12} md={12}>
                    {
                        toAddCard
                        ? 
                        <div className="btn board">
                            <FormGroup controlId="formControlsTextarea">
                                <FormControl componentClass="textarea" value={inputNewCard} onChange={inputNewCardChange} />
                            </FormGroup>
                            <div className="btn createBoard" onClick={addToCard}>Add</div> or <a>cancel</a>
                        </div> 
                        : 
                        <div className="newCard" onClick={changeNewCard}>Add new card...</div>
                    }                      
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
            {
                toAddList 
                ? 
                <div className="btn board">New board
                    <FormGroup
                    controlId="formBasicText"
                    >
                    <FormControl
                        type="text"
                        value={inputNewList}
                        placeholder="Add a new list"
                        onChange={inputNewListChange}
                    />
                    <FormControl.Feedback />
                    </FormGroup>
                    <div className="btn createBoard" onClick={addToList}>Save list</div> or <a>cancel</a>
                </div> 
                : 
                <div className="btn new" onClick={changeNewList}>Add new list...</div>
            }
        </Col>       
      </Row>
    </Grid>
  );
}

const mapToProps = ({boards, selectedItem, toAddList, inputNewList, toAddCard, inputNewCard}) => ({boards, selectedItem, toAddList, inputNewList, toAddCard, inputNewCard})

export default connect(mapToProps)(Detail);