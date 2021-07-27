import {Grid} from '@material-ui/core';
import Login from "../components/Authentication/Login";
import {Auth, Hub} from "aws-amplify";
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {updateCurrentUser, updateLoginState} from "../actions/loginActions";
import App from "../App";


function SignIn(props) {
    const {loginState, updateLoginState,currentUser,currentCredentials} = props;

    const [currentLoginState, updateCurrentLoginState] = useState(loginState);
    const [user, setUser] = useState(null);
    const [cred, setCred] = useState(null);


    useEffect(() => {
        setAuthListener();
    });

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
                    currentLoginState !== "signedIn" && (
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

