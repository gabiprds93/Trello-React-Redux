import React, { Component } from 'react';
import './App.css';
import {Grid, Row, Col, FormGroup, FormControl, Button, Dropdown, MenuItem, Glyphicon} from 'react-bootstrap';
import logo from './assets/logo.png';
import {NavLink, Redirect} from 'react-router-dom';
import {connect} from 'redux-zero/react';
import {addList, changeNewList, inputNewListChange, addCard, changeNewCard, inputNewCardChange} from './actions';
import HeaderBoardsDetail from './HeaderBoardsDetail';

const Detail = ({successLogin, user, selectedItem, toAddList, inputNewList, toAddCard, inputNewCard}) =>
{
    let listList;
    const addToList = () => {
        addList(this.inputNewList.value, user.boards[selectedItem].id, selectedItem);
        // selectBoard(boards.length);
    };
    const addToCard = () => {
        addCard(inputNewCard);
    }
    console.log("boards", user.boards);
    console.log("selected", selectedItem);
    // console.log("lists", user.boards[selectedItem].lists);  
    if(user.boards[selectedItem])
    {
        listList = user.boards[selectedItem].lists.map((list, index) => {
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
                                <div className="btn newCard" onClick={changeNewCard}>Add new card...</div>
                            }                      
                            </Col>
                        </Row>
                    </div>
                </Col>
            )
        })
    }
    return (
        <Grid fluid={true}>
        {
            !successLogin  ? <Redirect to = "/signin" /> :
            <div>
                <HeaderBoardsDetail/>
                <Row>
                    <Col xs={2} xsOffset={0} md={2} mdOffset={0} className="myBoards">
                        {user.boards[selectedItem].name}
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
                                    inputRef={ref => {this.inputNewList = ref}}                            
                                    type="text"
                                    placeholder="Add a new list"
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
            </div>
        }
        </Grid>
    );
}

const mapToProps = ({successLogin, user, selectedItem, toAddList, inputNewList, toAddCard, inputNewCard}) => ({successLogin, user, selectedItem, toAddList, inputNewList, toAddCard, inputNewCard})

export default connect(mapToProps)(Detail);