import createStore from 'redux-zero';

let BOARDS = 
[
    {
        name: "Tes board",
        lists: 
        [
            {
                name: "ABC",
                cards: ["test", "test2"],
            },
            {
                name: "DEF",
                cards: [],
            }
        ],
    },
    {
        name: "Tes board2",
        lists: 
        [
            {
                name: "QWE",
                cards: [],
            }
        ],
    }
]

const initialState = {
    boards: BOARDS,
    selectedItem : -1,
    toAddBoard: false,
    inputNewBoard: "",
}

const store = createStore(initialState);
export default store;