// import {Image} from "semantic-ui-react";
import {
    Button,
    ButtonBase,
    CircularProgress,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Image from 'material-ui-image'

// icons
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LockIcon from '@material-ui/icons/Lock';
import DialpadIcon from '@material-ui/icons/Dialpad';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import CWLButton from '../../assets/img/CWL-button.jpg'
// colors
import { green, red } from '@material-ui/core/colors';


import {makeStyles, withStyles} from '@material-ui/core/styles';
import {Auth} from "aws-amplify";
import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import {updateLoginState} from "../../actions/loginActions";
import TextFieldStartAdornment from "./TextFieldStartAdornment";
import "./Login.css";


const initialFormState = {
    email: "", password: "", given_name: "", family_name: "", authCode: "", resetCode: ""
}

const useStyles = makeStyles((theme) => ({
    marginTop: {
        margin: theme.spacing(2, 'auto', 'auto', 'auto')
    },
    marginHorizontal: {
        margin: theme.spacing(4, 'auto')
    },
    padding: {
        padding: theme.spacing(1.5)
    },
    textAlignCenter: {
        textAlign: "center"
    },
    flexDisplay: {
        display: "flex"
    },
    forgetPassword: {
        justifyContent: "flex-end", 
        fontFamily: "'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
        fontWeight: 500, 
        lineHeight: 1.75, 
    },
    activeButton: {
        borderRadius: 50, 
        width: "100%", 
        fontSize: "1em"
    },
    themeColor: {
        backgroundColor: "#012144", 
    },
    errorMessage: {
        color: "red",
    },
    cursor: {
        cursor: "pointer"
    },
    underlineText: {
        textDecoration: "underline",
    },
    passwordReq: {
        backgroundColor: "#ffc2c2",
        borderRadius: 5
    },
    centerBox: {
        justifyContent: "center",
        alignItems: "center"
    }
}));



function Login(props) {
    const {loginState, updateLoginState, animateTitle, type, title, darkMode, logo, themeColor, disableSignUp} = props;



    const classes = useStyles();

    useEffect(() => {
        async function retrieveUser() {
            try {
                Auth.currentAuthenticatedUser().then(user => {
                    console.log(user)
                    updateLoginState("signedIn");
                }).catch(err => {
                    updateLoginState("signIn");
                })

            } catch (e) {

            }
        }
        retrieveUser();
    }, []);




    return (
        <>
            {/*  An example image is provided. Please use a royalty-free photo, a photo owned by you, or a photo owned by the CIC */}
            <Grid container className={classes.centerBox} style={
                (type === "image") ? (themeColor === "standard") ? { backgroundColor: "#012144", backgroundImage: "url(./Assets/Images/background.jpg)", backgroundSize: "cover", backgroundRepeat: "no", width: "100%", height: "100vh"} :
                    { backgroundColor: themeColor, backgroundImage: "url(./Assets/Images/background.jpg)", backgroundSize: "cover", backgroundRepeat: "no", width: "100%", height: "100vh"} :
                (themeColor === "standard")? { backgroundColor: "#012144", width: "100%", height: "100vh"} : { backgroundColor: themeColor, width: "100%", height: "100vh"}
            }>
                {/* Please use a royalty free video or a video that you or the CIC owns */}
                {(type === "video")?
                    <video playsInline autoPlay muted loop>
                        <source src={process.env.PUBLIC_URL + "/Assets/Videos/video.mp4"} type="video/mp4" />
                    </video>
                    : null}
                <Grid container item xs={12} md={6} className={`page-info ${classes.centerBox}`}>
                    <Grid container item justify={"space-evenly"} alignItems={"center"} /*style={{height: "60vh"}}*/>
                        <Grid xs item className={`typewriter ${classes.marginHorizontal}`}> 
                            <p className={`${classes.textAlignCenter} ${(animateTitle) ? 
                                (darkMode) ? "line anim-typewriter" : "line anim-typewriter-light lightMode" 
                                :
                                (darkMode) ? "line-static" : "line-static lightMode-static"
                                }`}
                            >
                                {title}
                            </p>
                        </Grid>
                        <Grid container item xs={12} justify={"center"}>
                            <Grid item xs={10}>
                                {/*{(logo !== "none")? <Image src={process.env.PUBLIC_URL + logoType} fluid/> : null}*/}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item xs={12} sm={7} md={5} className={`login-container ${classes.centerBox}`}>
                    <Grid container item direction={"column"} xs={12} sm={11} md={9} className={"login-box"}>
                        <Grid className={"login-wrapper-top"}>
                            <span className={"login-wrapper-top-header"}>
                                <span>Sign In</span>
                            </span>
                        </Grid>
                        {
                            loginState === "signIn" && (
                                <Grid>
                                    <ButtonBase href={process.env.REACT_APP_SignInUrl}>
                                        <img src={CWLButton}alt="cwl button" />
                                    </ButtonBase>

                                </Grid>
                            )
                        }

                    </Grid>
                </Grid>
            </Grid>
        </>
        );
}


const mapStateToProps = (state) => {
    return {
        loginState: state.loginState.currentState,
    };
};

const mapDispatchToProps = {
    updateLoginState,
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
