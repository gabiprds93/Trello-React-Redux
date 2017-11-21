import React, { Component } from 'react';
import './App.css';
import {Grid, Row, Col, FormGroup, FormControl, Button, Dropdown, MenuItem, Glyphicon} from 'react-bootstrap';
import logo from './assets/logo.png';
import {NavLink, Redirect} from 'react-router-dom';
import {connect} from 'redux-zero/react';
import {addBoard, changeNewBoard, inputNewBoardChange, selectBoard, readAllBoards} from './actions';
import HeaderBoardsDetail from './HeaderBoardsDetail';

const Board = ({name, index, selectBoard}) =>
(
    <Col key={index} xs={4} xsOffset={0} md={3} mdOffset={0}>
        <NavLink to={"/detail"}><div className="btn board" onClick={selectBoard}>{name}</div></NavLink>
    </Col>
)
const Boards = ({successLogin, user, toAddBoard}) =>
{
    let boardList;
    console.log("user", user);    
    console.log("user.boards", user.boards);
    const addToBoard = () => {
        changeNewBoard();  
        addBoard(this.inputNewBoard.value);
        selectBoard(user.boards.length);
    };
    console.log(user.boards.length);
    if(user.boards.length)
    {
        boardList = user.boards.map((board, index) =>(
            <Board key={index} name={board.name} index={index} selectBoard={ () => selectBoard (index)} />
        ));
    }
    console.log("tableros");
    return (
        <Grid fluid={true}>
            {
                !successLogin  && <Redirect to = "/signin" />
            }
            <HeaderBoardsDetail/>  
            <Row>
                <Col xs={6} xsOffset={0} md={3} mdOffset={0} className="myBoards">
                    <i className="fa fa-user" aria-hidden="true"></i> My Boards
                </Col>
            </Row>
            <Row>      
                {boardList}
                <Col xs={6} xsOffset={0} md={3} mdOffset={0}>
                    {
                        toAddBoard 
                        ? 
                        <div className="btn board">New board
                            <FormGroup
                            controlId="formBasicText"
                            >
                            <FormControl
                                inputRef={ref => {this.inputNewBoard = ref}}                                                
                                type="text"
                                placeholder="Board name"
                            />
                            <FormControl.Feedback />
                            </FormGroup>
                            {/* <NavLink to={"/detail"}> */}
                                <div className="btn createBoard" onClick={addToBoard}>Create board</div> 
                            {/* </NavLink>  or <a>cancel</a> */}
                            
                        </div> 
                        : 
                        <div className="btn new" onClick={changeNewBoard}>Add new board...</div>
                    }
                </Col>
            </Row>
        </Grid>
    );
}

const mapToProps = ({successLogin, user, boards, toAddBoard}) => ({successLogin, user, boards, toAddBoard})
export default connect(mapToProps)(Boards);