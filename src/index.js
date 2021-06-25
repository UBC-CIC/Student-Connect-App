import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {connect, Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
// import * as serviceWorker from '../public/serviceWorker';
import reducers from "./reducers";
import {AmplifyAuthenticator, AmplifySignOut} from "@aws-amplify/ui-react";
import {Amplify} from "aws-amplify";
import awsconfig from './aws-exports';

const store = createStore(
    reducers, applyMiddleware(thunk)
);
Amplify.configure(awsconfig);

ReactDOM.render(
    <AmplifyAuthenticator>
    <Provider store={store}>
        <App />
    </Provider>
    </AmplifyAuthenticator>,

document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// serviceWorker.unregister();
