import store from './store';

export const addBoard = (name) =>
{
    let newBoards = [...store.getState().boards];
    newBoards = newBoards.concat({
        name: name,
        lists: [],
    });
    store.setState({
        boards: newBoards,
    });
}

export const changeNewBoard = () =>
{
    let newtoAddBoard = true;
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