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

const store = createStore(
    reducers, applyMiddleware(thunk)
);
Amplify.configure({
    Auth: {
        region: awsconfig.aws_project_region,
        userPoolId: awsconfig.aws_user_pools_id,
        userPoolWebClientId: awsconfig.aws_user_pools_web_client_id,
        oauth: {
            domain: process.env.react_app_domain,
            scope: ["email", "openid", "aws.cognito.signin.user.admin", "profile"],
            redirectSignIn: process.env.REACT_APP_SignInUrl,
            redirectSignOut: process.env.REACT_APP_SignOutUrl,
            responseType: "token"
        }
    }
})
Auth.configure({
    auth0: {
        domain: process.env.react_app_domain,
        clientID: 'your client id',
        redirectUri: 'your call back url',
        audience: 'https://your_domain/userinfo',
        responseType: 'token id_token', // for now we only support implicit grant flow
        scope: 'openid profile email', // the scope used by your app
        returnTo: 'your sign out url'
    }
});

ReactDOM.render(
    // <AmplifyAuthenticator >
    <Provider store={store}>
        <Router>
        <Route path = '/logOut' exact component={SignIn}/>

        <SignIn/>
        </Router>
    </Provider>,
    // </AmplifyAuthenticator>,

document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// serviceWorker.unregister();
