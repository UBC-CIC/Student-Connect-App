import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
// import * as serviceWorker from '../public/serviceWorker';
import reducers from "./reducers";
import {AmplifyAuthenticator} from "@aws-amplify/ui-react";
import {Amplify, Auth} from "aws-amplify";
import awsconfig from './aws-exports';
import SignIn from "./views/SignIn";
import {Route} from "react-router-dom";
import Survey from "./views/Survey/Survey";
import {BrowserRouter as Router, Redirect} from 'react-router-dom';
import awsConfig from "./aws-exports";
import 'semantic-ui-css/semantic.min.css';
import { HashRouter } from 'react-router-dom'

const store = createStore(
    reducers, applyMiddleware(thunk)
);
Amplify.configure(awsConfig);


ReactDOM.render(
    // <AmplifyAuthenticator >
    <Provider store={store}>
        <HashRouter>
        <Route path = '/logOut' exact component={SignIn}/>
            <SignIn/>
        </HashRouter>
    </Provider>,
    // </AmplifyAuthenticator>,

document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// serviceWorker.unregister();
