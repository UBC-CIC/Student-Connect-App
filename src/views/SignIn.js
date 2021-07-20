import {Button, Grid, IconButton} from '@material-ui/core';
import Login from "../components/Authentication/Login";
import {Auth, Hub} from "aws-amplify";
import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import {updateCurrentUser, updateLoginState} from "../actions/loginActions";
import App from "../App";
import { Cache } from 'aws-amplify';
import {func} from "prop-types";
import FacebookIcon from "@material-ui/icons/Facebook";
import AWS from "aws-sdk";



function SignIn(props) {
    const {loginState, updateLoginState,currentUser,currentCredentials} = props;

    const [currentLoginState, updateCurrentLoginState] = useState(loginState);
    const [user, setUser] = useState(null);
    const [cred, setCred] = useState(null);


    useEffect(() => {
        setAuthListener();
    }, []);

    useEffect(() => {

        async function retrieveUser() {
            try {
                Auth.currentAuthenticatedUser().then(user => {
                    setUser(user)
                }).catch(err => {
                    console.log(err)
                })

            } catch (e) {

            }
        }
        retrieveUser()
        updateCurrentLoginState(loginState);
        setCred(currentCredentials)
        setUser(currentUser)
        console.log(cred,user)
    }, [loginState,currentCredentials,currentUser]);


    async function setAuthListener() {
        Hub.listen('auth', (data)=> {
            switch(data.payload.event) {
                case "signOut":
                    updateLoginState("signIn");
                    break;
                default:
                    break;
            }
        })
    }


    return (
        <Grid container>
            <Grid item xs={12}>
                {
                    currentLoginState === "signIn" && (
                        <div>
                            <Login logo={"custom"} type={"image"} themeColor={"standard"} animateTitle={true}
                                   title={"Student App"} darkMode={true}
                                   disableSignUp={false}
                            />

                        </div>

                    )
                }
                {
                    (currentLoginState === "signedIn"&&user&&cred) && (
                        <App propUser={user}/>
                    )
                }
            </Grid>
        </Grid>
    );
}

const mapStateToProps = (state) => {
    return {
        loginState: state.loginState.currentState,
        currentUser:state.currentUser,
        currentCredentials: state.currentCredentials

    };
};

const mapDispatchToProps = {
    updateLoginState,
    updateCurrentUser
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

