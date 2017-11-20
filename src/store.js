import createStore from 'redux-zero';

let BOARDS = 
[
    // {
    //     name: "Tes board",
    //     lists: 
    //     [
    //         {
    //             name: "ABC",
    //             cards: ["test", "test2"],
    //         },
    //         {
    //             name: "DEF",
    //             cards: [],
    //         }
    //     ],
    // },
    // {
    //     name: "Tes board2",
    //     lists: 
    //     [
    //         {
    //             name: "QWE",
    //             cards: [],
    //         }
    //     ],
    // }
]

const initialState = 
{
    successLogin : false,    
    user: 
    {
        id: null,
        email: null,
        firstName: null,
        lastName: null,
        boards: [],    
    },
    selectedItem : -1,
    toAddBoard: false,
    toAddList: false,
    toAddCard: false,
    inputNewCard: "",
}

const store = createStore(initialState);
export default store;