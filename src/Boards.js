import React, { Component } from 'react';
import './App.css';
import {Grid, Row, Col, FormGroup, FormControl, Button, Dropdown, MenuItem, Glyphicon} from 'react-bootstrap';
import logo from './assets/logo.png';
import {NavLink} from 'react-router-dom';
import {connect} from 'redux-zero/react';
import {addBoard, changeNewBoard, inputNewBoardChange, selectBoard} from './actions';

const Board = ({name, index, selectBoard}) =>
(
    <Col key={index} xs={3} xsOffset={0} md={3} mdOffset={0}>
        <NavLink to={"/detail"}><div className="btn board" onClick={selectBoard}>{name}</div></NavLink>
    </Col>
)

const Boards = ({boards, toAddBoard, inputNewBoard}) =>
{
    const addToBoard = () => {  
        addBoard(inputNewBoard);
        selectBoard(boards.length);
     };
    const boardList = boards.map((board, index) =>(
        <Board name={board.name} index={index} selectBoard={ () => selectBoard (index)} />
    ));
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
            <img width={150} src={logo} className="" alt="logo" />
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
            <i className="fa fa-user" aria-hidden="true"></i> My Boards
        </Col>
      </Row>
      <Row>      
        {boardList}
        <Col xs={3} xsOffset={0} md={3} mdOffset={0} onClick={changeNewBoard}>
            {
                toAddBoard 
                ? 
                <div className="btn board">New board
                    <FormGroup
                    controlId="formBasicText"
                    >
                    <FormControl
                        type="text"
                        value={inputNewBoard}
                        placeholder="Board name"
                        onChange={inputNewBoardChange}
                    />
                    <FormControl.Feedback />
                    </FormGroup>
                    <NavLink to={"/detail"}>
                        <div className="btn createBoard" onClick={addToBoard}>Create board</div>
                    </NavLink> or <a>cancel</a>
                    
                </div> 
                : 
                <div className="btn new">Add new board...</div>
            }
        </Col>
      </Row>
    </Grid>
  );
}

const mapToProps = ({boards, toAddBoard, inputNewBoard}) => ({boards, toAddBoard, inputNewBoard})

export default connect(mapToProps)(Boards);