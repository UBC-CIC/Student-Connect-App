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

/*
    If federate login is enabled, amplify.configure will include
    the necessary info to set up oauth for the HostedUI
*/
process.env.REACT_APP_ENABLE_FEDERATE_LOGIN === 'true'
? 
Amplify.configure({
    ...awsConfig,
    oauth: {
        domain: process.env.REACT_APP_COGNITO_APP_URL.replace(/^https:\/\/|^http:\/\//, ""), // remove "http[s]://" string if any
        scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
        redirectSignIn: process.env.REACT_APP_CALLBACK_URI,
        redirectSignOut: `${process.env.REACT_APP_CALLBACK_URI.replace(/\/$/,"")}/logOut`, // remove the ending slash if any
        responseType: 'code'
    }
}) 
:
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
