import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import {Amplify} from "aws-amplify";
import awsConfig from './aws-exports';
import SignIn from "./views/SignIn";
import {HashRouter, Route} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';

const store = createStore(
    reducers, applyMiddleware(thunk)
);
Amplify.configure(awsConfig);


ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
        <Route path = '/logOut' exact component={SignIn}/>
            <SignIn/>
        </HashRouter>
    </Provider>,

document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// serviceWorker.unregister();
