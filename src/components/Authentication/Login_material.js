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
import {updateCredentials, updateCurrentUser, updateLoginState} from "../../actions/loginActions";
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
const DefaultButton = withStyles((theme) => ({
    root: {
        borderRadius: 50,
        width: "100%",
        fontSize: "1em",
        padding: theme.spacing(1.5),
        margin: theme.spacing(2, 'auto')
    },
}))(Button);

const SubmitButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText("#012144"),
        backgroundColor: "#012144",
        '&:hover': {
            backgroundColor: "#012144",
        },
    },
}))(DefaultButton);



function Login(props) {
    const {loginState, updateLoginState, animateTitle, type, title, darkMode, logo, themeColor,
        disableSignUp,updateCurrentUser} = props;

    const [formState, updateFormState] = useState(initialFormState);
    const [accountCreationEmailExistError, setAccountCreationEmailExistError] = useState(false);
    const [accountCreationPasswordError, setAccountCreationPasswordError] = useState(false);
    const [accountLoginError, setAccountLoginError] = useState(false);
    const [verificationError, setVerificationError] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [newVerification, setNewVerification] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentUser, setCurrentUser] =  useState(null);
    const [forgotPasswordError, setForgotPasswordError] = useState(false);
    const [emptyInputError, setEmptyInputError] = useState(false);
    const [invalidEmailError, setInvalidEmailError] = useState(false);
    const [timeLimitError, setTimeLimitError] = useState("");


    // password check
    const [passwordRequirements, setPasswordRequirements] = useState({
        uppercase: { error: false, description: 'At least one uppercase letter' },
        lowercase: { error: false, description: 'At least one lowercase letter' },
        digit: { error: false, description: 'At least one digit' },
        special: { error: false, description: 'At least one special character' },
        minLength: { error: false, description: 'Should be more than 8 characters' },
        maxLength: { error: false, description: 'Should be less than 16 characters' }
    });
    const [passwordUnmatchError, setPasswordUnmatchError] = useState(false);
    const [confirmPasswordString, setConfirmPasswordString] = useState('');




    const classes = useStyles();

    useEffect(() => {
        Auth.currentAuthenticatedUser().then(user => {
            updateCurrentUser(user)
                    updateLoginState("signedIn");
                }).catch(err => {
                    updateLoginState("signIn");
                })
    }, []);


    function clearErrors() {
        setAccountCreationEmailExistError(false);
        setAccountCreationPasswordError(false);
        setAccountLoginError(false);
        setVerificationError(false);
        setNewVerification(false);
        setNewPasswordError(false);
        setInvalidEmailError(false);
    }

    function onChange(e) {
        e.persist();
        clearErrors()

        updateFormState({...formState, [e.target.name]: e.target.value})
    }

    function onChangePassword(e) {
        const currPW = e.target.value;
        setPasswordRequirements(() => {
            passwordRequirements.uppercase.error = /[A-Z]/.test(currPW)
            passwordRequirements.lowercase.error = /[a-z]/.test(currPW)
            passwordRequirements.digit.error = /[0-9]/.test(currPW)
            passwordRequirements.special.error = /[^A-Za-z0-9]/.test(currPW)
            passwordRequirements.minLength.error = currPW.length > 8
            passwordRequirements.maxLength.error = currPW.length <= 16

            return passwordRequirements;
        })

        onChange(e);

        // check if "password" is the same as "confirm-password"
        e.target.value === confirmPasswordString ? setPasswordUnmatchError(false) : setPasswordUnmatchError(true)
    }

    async function signUp() {
        try {
            // check if both passwords match first before signing up
            checkMatchingPasswords();

            const {email, password, given_name, family_name} = formState;
            checkEmptyString(given_name);
            checkEmptyString(family_name);

            setLoading(true);
            await Auth.signUp({
                username: email,
                password: password,
                attributes: {
                    given_name: given_name,
                    family_name: family_name
                }
            });
            updateFormState(() => ({...initialFormState, email}))
            updateLoginState("confirmSignUp");
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setEmptyInputError(false);

            const errorMsg = e.message;

            if (errorMsg.includes("empty")) {
                setEmptyInputError(true);
            } else if (errorMsg.includes("Username should be an email.")) {
                setInvalidEmailError(true);
            } else if (errorMsg.includes("given email already exists")){
                setAccountCreationEmailExistError(true);
            } else if (errorMsg.includes("Passwords do not match")) {
                setPasswordUnmatchError(true)
            } else {
                setAccountCreationPasswordError(true);
            }
        }
    }

    // confirmSignUp shows after signUp page
    async function confirmSignUp() {
        // Verify Account with confirmation code after sign up page
        try {
            setNewVerification(false);
            const {email, authCode} = formState;
            setLoading(true);
            await Auth.confirmSignUp(email, authCode);
            resetStates("signedIn");
            setLoading(false);
        } catch (e) {
            setVerificationError(true);
            setLoading(false);

            const errorMsg = e.message;
            if (errorMsg.includes("time")) {
                setTimeLimitError(errorMsg);
            }
        }
    }

    async function resendConfirmationCode() {
        try {
            const {email} = formState;
            setVerificationError(false);
            await Auth.resendSignUp(email);
            setNewVerification(true);
        } catch (err) {
            setNewVerification(false);

            const errorMsg = err.message;
            if (errorMsg.includes("time")) {
                setTimeLimitError(errorMsg);
            }
        }
    }

    async function signIn(){
        try {
            setLoading(true);
            const {email, password} = formState;
            let user = await Auth.signIn(email, password);
            if (user.challengeName === "NEW_PASSWORD_REQUIRED") {
                // a new password needs to be set if account is created through Amazon Cognito for the user
                resetStates("newUserPassword")
                setLoading(false);
                setCurrentUser(user);
            } else {
                resetStates("signedIn")
                setLoading(false);
            }
        } catch (e) {
            setLoading(false);
            const errorMsg = e.code;

            // if a password is requested through Amazon Cognito,
            // need to jump to resetPassword page
            if (errorMsg.includes("PasswordResetRequiredException")) {
                const {email} = formState;

                updateFormState(() => ({...initialFormState, email}))
                updateLoginState("resetPassword")
                setLoading(false);
            } else {
                setAccountLoginError(true);
            }
        }
    }

    async function setNewPassword() {
        try {
            // check if both passwords match first before setting new password
            checkMatchingPasswords();

            const { password } = formState;
            setLoading(true);
            await Auth.completeNewPassword(currentUser, password);
            resetStates("signedIn");
            setLoading(false);
        } catch (e) {
            setLoading(false);

            const errorMsg = e.message;

            if (errorMsg.includes("empty")) {
                setEmptyInputError(true);
            } else if (errorMsg.includes("Passwords do not match")) {
                setPasswordUnmatchError(true);
            } else if (errorMsg.includes("time")) {
                setTimeLimitError(errorMsg);
            } else {
                setNewPasswordError(true);
            }
        }
    }

    async function forgotPassword() {
        try {
            const {email} = formState;
            setLoading(true);
            await Auth.forgotPassword(email);
            updateFormState(() => ({...initialFormState, email}))
            updateLoginState("resetPassword")
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setForgotPasswordError(true);
        }
    }

    // resetPassword after forgotPassword page
    async function resetPassword() {
        try {
            // check if both passwords match first before resetting password
            checkMatchingPasswords();

            const {email, resetCode, password} = formState;
            setLoading(true);
            await Auth.forgotPasswordSubmit(email, resetCode, password);
            resetStates("signIn");
            setLoading(false);
        } catch (e) {
            setLoading(false);
            setEmptyInputError(false);

            const errorMsg = e.message;

            if (errorMsg.includes("empty")) {
                setEmptyInputError(true);
            } else if (errorMsg.includes("verification code")) {
                setVerificationError(true);
            } else if (errorMsg.includes("time")) {
                setTimeLimitError(errorMsg);
            } else if (errorMsg.includes("Passwords do not match")) {
                setPasswordUnmatchError(true)
            } else {
                setNewPasswordError(true);
            }
        }
    }

    function checkMatchingPasswords() {
        // check if both passwords match
        if (!confirmPasswordString) {
            // empty field
            throw new Error("empty");
        } else if (passwordUnmatchError) {
            throw new Error("Passwords do not match");
        }
    }

    function checkEmptyString(str) {
        // check if string is empty after space trimmed
        if (str.replace(/\s+/g, '') === '') {
            throw new Error("empty");
        }
    }

    function resetStates(state) {
        // clear states when hitting the back button
        updateFormState(() => (initialFormState))
        clearErrors()

        // the following were not removed during onChange() so need to be cleared here
        setForgotPasswordError(false)
        setEmptyInputError(false)
        setPasswordUnmatchError(false);
        setConfirmPasswordString('');
        setTimeLimitError('');

        // clear password requirement checks
        setPasswordRequirements(() => {
            passwordRequirements.uppercase.error = false
            passwordRequirements.lowercase.error = false
            passwordRequirements.digit.error = false
            passwordRequirements.special.error = false
            passwordRequirements.minLength.error = false
            passwordRequirements.maxLength.error = false

            return passwordRequirements;
        })

        updateLoginState(state)
    }

    let logoType = (darkMode)? "/Assets/Images/logo_inverse.png" : "/Assets/Images/logo.png";

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
                    </Grid>
                </Grid>
                <Grid container item xs={12} sm={7} md={5} className={`login-container ${classes.centerBox}`}>
                    <Grid container item direction={"column"} xs={12} sm={11} md={9} className={"login-box"}>
                        <Grid className={"login-wrapper-top"}>
                            <span className={"login-wrapper-top-header"}>
                                {(loginState === "signIn") ?
                                    <span>Sign In</span>
                                    :
                                    (loginState === "signUp") ? <span>Create an Account</span> :
                                        (loginState === "confirmSignUp") ? <span>Verify Account</span> :
                                            (loginState === "forgotPassword") ? <span>Forgot your password?</span> :
                                                (loginState === "resetPassword") ? <span>Password Reset</span> :
                                                    (loginState === "newUserPassword") ? <span>Set New Password</span> : <span>Welcome</span>
                                }
                            </span>
                        </Grid>
                        {
                            loginState === "signIn" && (
                                <Grid>
                                    <BannerMessage type={"error"} typeCheck={accountLoginError}>Incorrect username or password.</BannerMessage>
                                    {/* username */}
                                    <TextFieldStartAdornment startIcon={<AlternateEmailIcon/>} placeholder={"Email"} name={"email"} type={"email"} onChange={onChange}/>
                                    {/* password */}
                                    <TextFieldStartAdornment startIcon={<LockIcon/>} placeholder={"Password"} name={"password"} type={"password"} onChange={onChange} />
                                    <Grid className={`${classes.flexDisplay} ${classes.forgetPassword} ${classes.cursor}`}
                                          onClick={() => resetStates("forgotPassword")}
                                    > {/* forget */}
                                        <span style={{textAlign: "end"}}>Forgot your password?</span>
                                    </Grid>
                                    <Grid className={`input-box ${classes.marginTop}`}> {/* sign in button */}
                                        <SubmitButtonWithLoading submitAction={signIn} submitMessage={"Sign In"} loadingState={loading}/>
                                    </Grid>
                                    {!(disableSignUp) && // if sign up is not disabled, then show the create an account option
                                    <div>
                                        {/* divider */}
                                        <Grid container item alignItems="center" xs={12}>
                                            <Grid item xs>
                                                <Divider />
                                            </Grid>
                                            <Grid item className={classes.padding}>
                                                Or
                                            </Grid>
                                            <Grid item xs>
                                                <Divider />
                                            </Grid>
                                        </Grid>
                                        {/* create an account button */}
                                        <Grid className={`input-box`}>
                                            <DefaultButton variant="contained" type="button" onClick={() => resetStates("signUp")}>
                                                Create an Account
                                            </DefaultButton>
                                        </Grid>
                                    </div>
                                    }
                                </Grid>
                            )
                        }
                        {
                            loginState === "forgotPassword" && (
                                <Grid>
                                    <Grid container item xs={12}>
                                        <span>
                                            Enter your email address and we'll send you a code to help you reset your password.
                                        </span>
                                    </Grid>
                                    <TextFieldStartAdornment
                                        startIcon={<AlternateEmailIcon/>}
                                        placeholder={"Email"}
                                        name={"email"}
                                        type="email"
                                        autoComplete={"new-password"}
                                        variant="outlined"
                                        error={forgotPasswordError}
                                        onChange={onChange}
                                    />
                                    {!!forgotPasswordError &&
                                    <Grid container item xs={12} className={classes.errorMessage}>
                                            <span>Please enter a valid email or create an account&nbsp;
                                                <span className={`${classes.cursor} ${classes.underlineText}`} onClick={() => updateLoginState("signUp")}><strong>here</strong></span>
                                            <span>.</span>
                                            </span>
                                    </Grid>
                                    }
                                    <BackAndSubmitButtons backAction={()=>resetStates("signIn")} submitAction={forgotPassword} submitMessage={"Send reset code"} loadingState={loading}/>
                                </Grid>
                            )
                        }
                        {
                            loginState === "resetPassword" && (
                                <Grid>
                                    <Grid>
                                        <span>
                                            Please check your email&nbsp;
                                            <strong>{formState.email}</strong><br/>
                                            for a reset code and create a new password.
                                        </span>
                                    </Grid>
                                    <BannerMessage type={"error"} typeCheck={emptyInputError||timeLimitError}>
                                        {(!!emptyInputError && "Please fill in all fields.") || (timeLimitError!=='' && timeLimitError)}
                                    </BannerMessage>
                                    <TextFieldStartAdornment
                                        startIcon={<DialpadIcon/>}
                                        placeholder="Enter reset code"
                                        variant="outlined"
                                        name={"resetCode"}
                                        type="text"
                                        error={verificationError}
                                        helperText={
                                            !!verificationError && "Please enter correct reset code."
                                        }
                                        onChange={onChange}
                                    />
                                    <TextFieldStartAdornment
                                        startIcon={<LockIcon/>}
                                        placeholder="Create new password"
                                        name={"password"}
                                        type="password"
                                        error={newPasswordError}
                                        helperText={
                                            "Your password must have the following:"
                                        }
                                        autoComplete={"new-password"}
                                        onChange={onChangePassword}
                                    />
                                    <Grid container item xs={12} className={!!newPasswordError ? classes.passwordReq : null}>
                                        <PasswordRequirements requirements={passwordRequirements}/>
                                    </Grid>
                                    <TextFieldStartAdornment
                                        startIcon={<LockIcon/>}
                                        placeholder="Re-enter the password"
                                        name={"confirm-password"}
                                        type="password"
                                        error={passwordUnmatchError}
                                        helperText={!!passwordUnmatchError && "Passwords do not match"}
                                        autoComplete={"new-password"}
                                        value={confirmPasswordString}
                                        onChange={(e)=> {
                                            setConfirmPasswordString(e.target.value); // update current input state
                                            // check if "password" is the same as "confirm-password"
                                            e.target.value === formState.password ? setPasswordUnmatchError(false) : setPasswordUnmatchError(true)
                                        }}
                                    />
                                    <BackAndSubmitButtons
                                        backAction={()=>resetStates("signIn")}
                                        submitAction={resetPassword}
                                        submitMessage={"Update Password"}
                                        loadingState={loading}
                                    />
                                </Grid>
                            )
                        }
                        {
                            loginState === "signUp" && (
                                <Grid>
                                    <BannerMessage type={"error"} typeCheck={emptyInputError}>Please fill in all fields.</BannerMessage>
                                    <TextFieldStartAdornment
                                        startIcon={false}
                                        label={"First Name"}
                                        name={"given_name"}
                                        type="text"
                                        autoComplete={"new-password"}
                                        onChange={onChange}
                                    />
                                    <TextFieldStartAdornment
                                        startIcon={false}
                                        label={"Last Name"}
                                        name={"family_name"}
                                        type="text"
                                        autoComplete={"new-password"}
                                        onChange={onChange}
                                    />
                                    <TextFieldStartAdornment
                                        startIcon={false}
                                        label={"Email"}
                                        name={"email"}
                                        type="email"
                                        autoComplete={"new-password"}
                                        error={accountCreationEmailExistError || invalidEmailError}
                                        helperText={
                                            (!!accountCreationEmailExistError && "An account with the given email already exists.") ||
                                            (!!invalidEmailError && "Please enter a valid email.")
                                        }
                                        onChange={onChange}
                                    />
                                    <TextFieldStartAdornment
                                        startIcon={false}
                                        label={"Password"}
                                        name={"password"}
                                        type="password"
                                        error={accountCreationPasswordError}
                                        helperText={
                                            "Your password must have the following:"
                                        }
                                        autoComplete={"new-password"}
                                        onChange={onChangePassword}
                                    />
                                    <Grid container item xs={12} className={!!accountCreationPasswordError ? classes.passwordReq : null}>
                                        <PasswordRequirements requirements={passwordRequirements}/>
                                    </Grid>
                                    <TextFieldStartAdornment
                                        startIcon={false}
                                        label={"Confirm Password"}
                                        name={"confirm-password"}
                                        type="password"
                                        error={passwordUnmatchError}
                                        helperText={!!passwordUnmatchError && "Passwords do not match"}
                                        autoComplete={"new-password"}
                                        value={confirmPasswordString}
                                        onChange={(e)=> {
                                            setConfirmPasswordString(e.target.value); // update current input state
                                            // check if "password" is the same as "confirm-password"
                                            e.target.value === formState.password ? setPasswordUnmatchError(false) : setPasswordUnmatchError(true)
                                        }}
                                    />
                                    <BackAndSubmitButtons backAction={()=>resetStates("signIn")} submitAction={signUp} submitMessage={"Sign Up"} loadingState={loading}/>
                                </Grid>
                            )
                        }
                        {
                            loginState === "confirmSignUp" && (
                                <Grid>
                                    <Grid container item xs={12}>
                                        <span>Please check your email for a confirmation code. This may take several minutes.</span>
                                    </Grid>
                                    <BannerMessage type={"error"} typeCheck={verificationError}>Invalid verification code provided, please try again.</BannerMessage>
                                    <BannerMessage type={"error"} typeCheck={timeLimitError!==''}>{timeLimitError}</BannerMessage>
                                    <BannerMessage type={"success"} typeCheck={newVerification}>New verification code sent successfully.</BannerMessage>
                                    <Grid container item direction={"column"} xs={12} className={"input-box"}>
                                        <TextFieldStartAdornment
                                            startIcon={<DialpadIcon/>}
                                            placeholder="Enter your confirmation code."
                                            name={"authCode"}
                                            type="text"
                                            autoComplete={"new-password"}
                                            onChange={onChange}
                                        />
                                    </Grid>
                                    <Grid>
                                        <span>Didn't receive your verification code?</span>
                                        <Button onClick={resendConfirmationCode}>
                                            <span className={classes.underlineText}>Resend Code</span>
                                        </Button>
                                    </Grid>
                                    <BackAndSubmitButtons
                                        backAction={()=>resetStates("signUp")}
                                        submitAction={confirmSignUp}
                                        submitMessage={"Verify"}
                                        loadingState={loading}
                                    />
                                </Grid>
                            )
                        }
                        {
                            loginState === "newUserPassword"  && (
                                <Grid>
                                    <Grid container item xs={12}>
                                        <span>
                                            Please replace your temporary password with a new password for <strong>{formState.email}</strong>.
                                        </span>
                                    </Grid>
                                    <BannerMessage type={"error"} typeCheck={timeLimitError!==''}>{timeLimitError}</BannerMessage>
                                    <Grid className={`input-box`}>
                                        <TextFieldStartAdornment
                                            startIcon={false}
                                            placeholder={"Enter new password" }
                                            label={"Password"}
                                            name={"password"}
                                            type="password"
                                            autoComplete={"new-password"}
                                            error={(newPasswordError || emptyInputError)}
                                            helperText={"Your password must have the following:"}
                                            onChange={onChangePassword}
                                        />
                                        <Grid container item xs={12} className={(!!newPasswordError || !!emptyInputError) ? classes.passwordReq : null}>
                                            <PasswordRequirements requirements={passwordRequirements}/>
                                        </Grid>
                                        <TextFieldStartAdornment
                                            startIcon={false}
                                            placeholder={"Re-enter new password" }
                                            label={"Confirm Password"}
                                            name={"confirm-password"}
                                            type="password"
                                            error={passwordUnmatchError}
                                            helperText={!!passwordUnmatchError && "Passwords do not match"}
                                            autoComplete={"new-password"}
                                            value={confirmPasswordString}
                                            onChange={(e)=> {
                                                setConfirmPasswordString(e.target.value); // update current input state
                                                // check if "password" is the same as "confirm-password"
                                                e.target.value === formState.password ? setPasswordUnmatchError(false) : setPasswordUnmatchError(true)
                                            }}
                                        />
                                    </Grid>
                                    <BackAndSubmitButtons
                                        backAction={()=>resetStates("signIn")}
                                        submitAction={setNewPassword}
                                        submitMessage={"Set Password"}
                                        loadingState={loading}
                                    />
                                </Grid>
                            )
                        }
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

/* helper components */

const BannerMessage = (props) => {
    const {type, typeCheck, children} = props

    const styles = makeStyles((theme) => ({
        root: {
            width: "100%",
            margin: theme.spacing(2, 'auto')
        },
    }));

    const localStyles = styles();

    return (
        <Grid>
            {
                (!!typeCheck) &&
                <Grid container item xs={12}>
                    <Alert
                        className={localStyles.root}
                        variant="filled"
                        severity={type}
                        elevation={3}
                    >
                        {children}
                    </Alert>
                </Grid>
            }
        </Grid>
    )
};

const SubmitButtonWithLoading = (props) => {
    const styles = makeStyles((theme) => ({
        progress: {
            display: "flex",
            padding: theme.spacing(0, 1)
        }
    }));

    const {submitAction, submitMessage, loadingState} = props;
    const localStyles = styles();


    return (
        <SubmitButton variant="contained" disabled={!!loadingState} onClick={submitAction}>
            {submitMessage}
            {/* if it is loading, show the loading indicator */}
            {!!loadingState && <Grid className={localStyles.progress}><CircularProgress size={15}/></Grid>}
        </SubmitButton>
    )
}

const BackAndSubmitButtons = ({backAction, ...others}) => {
    return (
        <Grid container item xs={12} justify="space-between" spacing={1}>
            <Grid container item xs>
                <DefaultButton variant="contained" startIcon={<ArrowBackIcon />} onClick={backAction}>
                    Back
                </DefaultButton>
            </Grid>
            <Grid container item md={7} justify={"flex-end"}>
                <SubmitButtonWithLoading {...others}/>
            </Grid>
        </Grid>
    )
};

const PasswordRequirements = ({requirements}) => {
    const styles = makeStyles((theme) => ({
        valid: {
            color: green[500]
        },
        invalid: {
            color: red[500]
        },
        fontSize: {
            fontSize: "0.9rem",
        }
    }));

    const localStyles = styles();

    return (
        <List dense={true} className={localStyles.root}>
            { Object.entries(requirements).map((req) => {
                return (
                    <ListItem key={req[0]}>
                        <ListItemIcon>
                            {req[1].error ? <CheckCircleRoundedIcon className={localStyles.valid}/> : <CancelRoundedIcon className={localStyles.invalid}/>}
                        </ListItemIcon>
                        <ListItemText
                            className={localStyles.fontSize}
                            primary={req[1].description}
                        />
                    </ListItem>
                )
            })}
        </List>
    )
}


const mapStateToProps = (state) => {
    return {
        loginState: state.loginState.currentState,
    };
};

const mapDispatchToProps = {
    updateLoginState,
    updateCurrentUser,
    updateCredentials
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
