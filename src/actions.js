import store from './store';
// import {auth, database} from './firebase';
import firebase from 'firebase';

// Initialize Firebase
var config = 
{
    apiKey: "AIzaSyDMg_E_HmXrtp_SKiuisYQ7UpQj9dfWIIg",
    authDomain: "trello-react-redux.firebaseapp.com",
    databaseURL: "https://trello-react-redux.firebaseio.com",
    projectId: "trello-react-redux",
    storageBucket: "trello-react-redux.appspot.com",
    messagingSenderId: "648141349493"
};

firebase.initializeApp(config);
const database = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

export function signUp (firstName, lastName, email, password, confirmPassword) 
{
    console.log ('signUp' + firstName + lastName + email + password + confirmPassword);
    auth.createUserWithEmailAndPassword(email, password).then(user => 
    {
        let newUser = 
        {
            email: email,            
            firstName: firstName,
            lastName: lastName,
        }
        database.ref('users/' + user.uid).set(newUser);   

        // database.ref ('users/' + user.uid + '/options').update ( 'option1, option2, option3...');   
        //  database.ref ('users/').push (newuser);   
        
        database.ref('users/' + user.uid).once('value').then(res => 
        {
            let fullUserInfo = res.val();
            fullUserInfo.boards = [];
            console.log ('full info ', fullUserInfo);
            store.setState({
                user: 
                {
                    id : user.uid,
                    email :  fullUserInfo.email,
                    firstName :  fullUserInfo.firstName,
                    lastName :  fullUserInfo.lastName,              
                    boards: fullUserInfo.boards,
                }
            })
        })
    })
}

export function signOut () 
{
    auth.signOut();
    store.setState({
        successLogin : false,
        user: 
        {
            id : "",
            email :  "",
            firstName :  "",
            lastName :  "", 
            boards: [],
        }
    })
}

export function signIn (user, password) 
{
    auth.signInWithEmailAndPassword(user, password).then(userObj => 
    {
        database.ref('users/' + userObj.uid).once('value').then(res => 
        {
            const fullUserInfo = res.val(); 
            console.log ('full info ', fullUserInfo);
            if(!fullUserInfo.boards)
                fullUserInfo.boards = [];
            // database.ref('users/' + userObj.uid + '/boards').once('value').then(res =>
            // {
            //     let boards = res;
            //     let boardObjs = [];
            //     boards.forEach(item => {
            //         let obj = item.val();
            //         console.log("obj", obj)
            //         obj.id = item.key;
            //         boardObjs.push(obj);
            //     })
            //     console.log("boardObjs", boardObjs);            
            //     fullUserInfo.boards = boardObjs;
            //     console.log("fullUserInfo.boards", fullUserInfo.boards);                            
            // console.log("user", store.getState().user);                                        
            
            // })
               
        
            store.setState({
                user: 
                {
                    id : userObj.uid,
                    email :  fullUserInfo.email,
                    firstName :  fullUserInfo.firstName,
                    lastName :  fullUserInfo.lastName,  
                    boards: fullUserInfo.boards,             
                }
            })
            console.log("xxxxxxxxxxxxx")
            console.log("user", store.getState().user);                                        
            readAllBoards(); 
        })
    })
}

auth.onAuthStateChanged(user => 
{
    if (user) {
        console.log('user', user);
        let usersRef = database.ref('users');
        let userRef = usersRef.child(user.uid);
        store.setState({
            successLogin : true
        })
    }
 });

async function snapshotToArray (snapshot)  
{
    let user = store.getState().user;
    let boards = [];
    snapshot.forEach(childSnapshot => 
    {
        console.log("childSnapshot", childSnapshot);        
        let item = childSnapshot.val();
        console.log("item", item);
        let key = childSnapshot.key;
        item.id = key;
        console.log("item.lists", item.lists);
        firebase.database().ref('users/' + user.id + '/boards/'+ key + '/lists').once('value').then(res => 
        {
            console.log("res", res);
            const lists = res;
            let listObjs = [];
            lists.forEach(item => {
                let obj = item.val();
                console.log("obj", obj)
                obj.id = item.key;
                listObjs.push(obj);
            })
            console.log("listObjs", listObjs);            
            item.lists = listObjs; 
            console.log("item.lists3", item.lists);
            item.lists.map((list, index) => {
                return list.cards = [];
            })    
            console.log("boards", store.getState().user.boards);        
        }); 
        boards.push(item);
    });
    console.log("sdfdfdsfsdfsd")
    store.setState({
        user:
        {
            id : user.id,
            email :  user.email,
            firstName :  user.firstName,
            lastName :  user.lastName,  
            boards: boards    
        }
    }) 
}
 
export const readAllBoards = () =>
{
    let user = store.getState().user;    
    console.log("user readAllBoards", user)
    firebase.database()
        .ref('users/' + user.id + '/boards')
        .on('value', (res) => {
            snapshotToArray(res)
        });
}

export async function addBoard(name)
{
    let user = store.getState().user;
    // let inputNewBoard = store.getState().inputNewBoard;
    
    let newBoards = {
        name: name
        // lists: [],
    };
    console.log("user add", user);
    const res = database.ref('users').child(user.id).child('boards').push(newBoards);
    // newBoards.id = res.key;
    // console.log("newBoards1", newBoards);
    
    newBoards = user.boards.concat(newBoards);
    // inputNewBoard = "";
    store.setState({
        user:
        {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            boards: newBoards,            
        }
    });
    console.log("user", store.getState().user);
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

export const selectBoard = (index) => 
{
    store.setState({
        selectedItem : index
    });
}

export async function addList(name, id, selectedItem)
{
    let user = store.getState().user;
    let toAddList = store.getState().toAddList;
    let key;
    // if(boards[selectedItem].lists.length)
    // {
    //     key = boards[selectedItem].lists.length;
    //     console.log("key", key);
    // }
    // else
    // {
    //     key = 0;
    // }
    let newList = {
        // id: key,
        name: name,
        cards: [],
    };
    // console.log("newBoards1", newBoards);
    const res = database.ref('users').child(user.id).child('boards/').child(id).child('lists/').push(newList);
    newList.id = res.key;
    // console.log("newBoards1", newBoards);
    
    newList = user.boards[selectedItem].lists.push(newList);
    console.log("boards11", user.boards[selectedItem]);    
    toAddList = false;
    store.setState({
        user:
        {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            boards: user.boards,    
        },
        toAddList: toAddList,
    });
    console.log("boards", user.boards);
    console.log("toadd", store.getState().toAddBoard);    
}

export const changeNewList = () =>
{
    let newtoAddList = true;
    store.setState({
        toAddList: newtoAddList,
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
    const res = await database.ref('tableros/').child(id).push (newList);
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