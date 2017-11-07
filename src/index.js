import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Boards from './Boards';
import Detail from './Detail';
import { Provider } from 'redux-zero/react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import store from './store';
import registerServiceWorker from './registerServiceWorker';

const Index = () => 
{
    return (
        <Provider store={store}>
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={SignIn} />
                    <Route path="/signin" component={SignIn} />                    
                    <Route path="/signup" component={SignUp} /> 
                    <Route path="/boards" component={Boards} />
                    <Route path="/detail" component={Detail} />                    
                </Switch>
            </HashRouter>
        </Provider>
    )
}

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();