import store from './store';
import {auth, database} from './firebase';

export function signUp (firstName, lastName, email, password, confirmPassword) 
{
    console.log ('signUp' + firstName + lastName + email + password + confirmPassword);
    auth.createUserWithEmailAndPassword(email, password).then(user => 
    {
        let newUser = 
        {
            firstName, lastName, email
        }
        database.ref('users/' + user.uid).set(newUser);   

        // database.ref ('users/' + user.uid + '/options').update ( 'option1, option2, option3...');   
        //  database.ref ('users/').push (newuser);   
        
        database.ref('users/' + user.uid).once('value').then(res => 
        {
            const fullUserInfo = res.val(); 
            console.log ('full info ', fullUserInfo);
            store.setState({
                user: 
                {
                    id : user.uid,
                    email :  fullUserInfo.email,
                    firstName :  fullUserInfo.firstName,
                    lastName :  fullUserInfo.lasName,              
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
            id :'',
            email :  ''
        }
    })
}

// export function signIn (user, pass) 
// {
//     auth.signInWithEmailAndPassword(user, pass).then (userObj => {

//     })        
// }

auth.onAuthStateChanged(user => {
    if (user) {
       console.log('user', user);
       let usersRef = database.ref('/users');
       let userRef = usersRef.child(user.uid);
       store.setState ( {
          successLogin : true
       })
    }
 });

const snapshotToArray = (snapshot) => 
{
    let boards = [];
    snapshot.forEach(childSnapshot => 
    {
        let item = childSnapshot.val();
        console.log("item", item);
        let key = childSnapshot.key;
        item.id = key;
        console.log("item.lists", item.lists);
        database.ref('tableros/' + key + '/lists').once('value').then(res => 
        {
            console.log("res", res);
            const lists = res;
            let listObjs = [];
            lists.forEach(item => {
                let obj = item.val();
                obj.id = item.key;
                listObjs.push(obj);
            })
            console.log("listObjs", listObjs);            
            item.lists = listObjs; 
            console.log("item.lists3", item.lists);
            item.lists.map((list, index) => {
                return list.cards = [];
            })    
        console.log("boards", store.getState().boards);        
        }); 
        boards.push( item );
    });
    store.setState({
        boards: boards
    }) 
}
 
export const readAllBoards = () =>
{
    database
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
    const res = database.ref('tableros').push (newBoards);
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
    let key;
    if(boards[selectedItem].lists.length)
    {
        key = boards[selectedItem].lists.length;
        console.log("key", key);
    }
    else
    {
        key = 0;
    }
    let newList = {
        id: key,
        name: name,
        cards: [],
    };
    // console.log("newBoards1", newBoards);
    const res = database.ref('tableros').child(id).child('lists/').push(newList);
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