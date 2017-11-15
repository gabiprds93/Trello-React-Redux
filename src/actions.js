import store from './store';
import firebase from 'firebase';
// Initialize Firebase
var config = {
apiKey: "AIzaSyDMg_E_HmXrtp_SKiuisYQ7UpQj9dfWIIg",
authDomain: "trello-react-redux.firebaseapp.com",
databaseURL: "https://trello-react-redux.firebaseio.com",
projectId: "trello-react-redux",
storageBucket: "trello-react-redux.appspot.com",
messagingSenderId: "648141349493"
};
firebase.initializeApp(config);

const snapshotToArray = snapshot => 
{
    let boards = [];
    snapshot.forEach(childSnapshot => {
       let item = childSnapshot.val();
       console.log("item", item);
       let key = childSnapshot.key;
       item.id = key;
       item.lists = [];
       boards.push( item );
    });
    store.setState({
        boards: boards
    }) 
    // console.log("boards", store.getState().boards);        
};
 
export const readAllBoards = () =>
{
    firebase.database()
        .ref('tableros/')
        .on('value', (res) => {
            snapshotToArray(res)
        });
}

export async function addBoard(name)
{
    let boards = [...store.getState().boards];
    let inputNewBoard = store.getState().inputNewBoard;
    
    let newBoards = {
        name: name,
        lists: [],
    };
    // console.log("newBoards1", newBoards);
    const res = firebase.database().ref('tableros/').push (newBoards);
    newBoards.id = res.key;
    // console.log("newBoards1", newBoards);
    
    newBoards = boards.concat(newBoards);
    inputNewBoard = "";
    store.setState({
        boards: newBoards,
        inputNewBoard: inputNewBoard,
    });
    // console.log("newBoards1", newBoards);
    console.log("toadd", store.getState().toAddBoard);    
}

export const changeNewBoard = () =>
{
    let newtoAddBoard = store.getState().toAddBoard;    
    if(newtoAddBoard)
    {
        newtoAddBoard = false;
    }
    else
    {
        newtoAddBoard = true;
    }
    store.setState({
        toAddBoard: newtoAddBoard,
    });
}

export const inputNewBoardChange = (e) =>
{
    store.setState({
        inputNewBoard: e.target.value,
    });
}

export const selectBoard = (index) => 
{
    store.setState({
        selectedItem : index
    });
}

export async function addList(name, id, selectedItem)
{
    let boards = [...store.getState().boards];
    let inputNewList = store.getState().inputNewList;
    let toAddList = store.getState().toAddList;    
    
    let newList = {
        name: name,
        cards: [],
    };
    // console.log("newBoards1", newBoards);
    const res = await firebase.database().ref('tableros/').child(id).push (newList);
    newList.id = res.key;
    // console.log("newBoards1", newBoards);
    
    newList = boards[selectedItem].lists.push(newList);
    console.log("boards11", boards[selectedItem]);    
    toAddList = false;
    inputNewList = "";
    store.setState({
        boards: boards,
        toAddList: toAddList,
        inputNewList: inputNewList,
    });
    console.log("boards", boards);
    console.log("toadd", store.getState().toAddBoard);    
}

export const changeNewList = () =>
{
    let newtoAddList = true;
    store.setState({
        toAddList: newtoAddList,
    });
}

export const inputNewListChange = (e) =>
{
    store.setState({
        inputNewList: e.target.value,
    });
}

export async function addCard(name, id, selectedItem)
{
    let boards = [...store.getState().boards];
    let inputNewCard = store.getState().inputNewCard;
    let toAddCard = store.getState().toAddCard;    
    
    let newList = {
        name: name,
        cards: [],
    };
    // console.log("newBoards1", newBoards);
    const res = await firebase.database().ref('tableros/').child(id).push (newList);
    newList.id = res.key;
    // console.log("newBoards1", newBoards);
    
    newList = boards[selectedItem].lists.push(newList);
    console.log("boards11", boards[selectedItem]);    
    toAddCard = false;
    inputNewCard = "";
    store.setState({
        boards: boards,
        toAddCard: toAddCard,
        inputNewCard: inputNewCard,
    });
    console.log("boards", boards);
    console.log("toadd", store.getState().toAddBoard);    
}

export const changeNewCard = () =>
{
    let newtoAddCard = true;
    store.setState({
        toAddCard: newtoAddCard,
    });
}

export const inputNewCardChange = (e) =>
{
    store.setState({
        inputNewCard: e.target.value,
    });
}