import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Academic, Email, Events, NewsBlogsClubs, Sports, SurveyWelcomePage} from "./SurveySections";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DoneIcon from '@material-ui/icons/Done';
import {ButtonGroup} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import {createUserDataAction, createUserPreferenceAction} from "../../actions/userAction";
import {connect} from "react-redux";
import {API, graphqlOperation} from "aws-amplify";
import {createSavedItemsTable} from "../../graphql/mutations";

const QontoConnector = withStyles({
    alternativeLabel: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    active: {
        '& $line': {
            borderColor: '#0055B7',
        },
    },
    completed: {
        '& $line': {
            borderColor: '#0055B7',
        },
    },
    line: {
        borderColor: '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#0055B7',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#0055B7',
        zIndex: 1,
        fontSize: 18,
    },
});

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
};


const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <SettingsIcon />,
        2: <GroupAddIcon />,
        3: <VideoLabelIcon />,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    nextButton:{
        backgroundColor:'#0055B7',
        color:"white",
        padding: '10px 25px 10px 25px',
        marginRight: theme.spacing(1)

    },
    prevButton:{
        backgroundColor:'#0055B7',
        color:"white",
        padding: '10px 20px 10px 20px',
        marginRight: theme.spacing(1)


    },
    goToHomeButton:{
        backgroundColor:'#0055B7',
        color:"white",
        padding: '10px 20px 10px 20px',
        marginTop: theme.spacing(5),
        textTransform:'none'


    },
    title:{
        color:"#0055B7",


    },


}));

function getSteps() {
    return ['Welcome','News, Blogs, Clubs', 'Academic', 'Events', 'Sports', 'Email/Gender'];
}

const userPreference ={
    id: '',
    academicPreference: {
        arts: false,
        biology: false,
        business: false,
        chemistry: false,
        computerScience: false,
        economics: false,
        engineering: false,
        history: false,
        mathematics: false,
        philosophy: false,
        physics: false,
        psychology: false,
        science: false,
        statistics: false,
    },
    emailNotification :false,
    eventsPreference: {
        faculties: false,
        studentServices: false,
        subjectDepartments: false,
        universityServices: false,
    },
    sportsPreference : {
        mensSportsList: {
            baseball: false,
            basketball: false,
            crew: false,
            crossCountry: false,
            football: false,
            golf: false,
            iceHockey: false,
            lacrosse: false,
            skiing: false,
            soccer: false,
            squash: false,
            swimming: false,
            tennis: false,
            trackAndField: false,
            wrestling: false,
        },
        womensSportsList: {
            basketball: false,
            crew: false,
            crossCountry: false,
            fieldHockey: false,
            golf: false,
            iceHockey: false,
            lacrosse: false,
            skiing: false,
            soccer: false,
            softball: false,
            squash: false,
            swimming: false,
            tennis: false,
            trackAndField: false,
            volleyball: false,
        }
    },
    newsBlogsClubsPreference: {
        academics: false,
        activism: false,
        careers: false,
        culture: false,
        gradSchool: false,
        healthAndWellbeing: false,
        recreation: false,
        religion: false,
        research: false,
    },
    culturePreference:{
        northAmerican:false,
        southAmerican:false,
        european:false,
        african:false,
        australian:false,
        asian:false,
    }
}

 function Survey(props) {
    const {UID,user,createUserPreferenceAction,createUserDataAction} = props
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();
    const [gender, setGender] = React.useState('');
     const [cisOrTrans, setCisOrTrans] = React.useState('');
     const handleChange=(param)=> {
        if(param.category==="mensSportsList" || param.category==="womensSportsList"){
            userPreference.sportsPreference[param.category][param.backendName]=param.checked
        }else{
            userPreference[param.category][param.backendName]=param.checked

        }
    }
    const handleSwitchChange=(param)=>{
        userPreference.emailNotification=param
    }

     const handleGenderChange=(param)=>{
         setGender(param)
     }
     const handleCisOrTransChange=(param)=>{
         setCisOrTrans(param)
     }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <SurveyWelcomePage/>
            case 1:
                return <NewsBlogsClubs handleChange={handleChange} userPreference={userPreference}/>;
            case 2:
                return <Academic handleChange={handleChange} userPreference={userPreference}/>;
            case 3:
                return <Events handleChange={handleChange} userPreference={userPreference}/>;
            case 4:
                return <Sports handleChange={handleChange} userPreference={userPreference}/>
            case 5:
                return <Email handleChange={handleChange} handleSwitchChange={handleSwitchChange} userPreference={userPreference}
                              handleGenderChange={handleGenderChange} handleCisOrTransChange={handleCisOrTransChange}/>

            default:
                return <div>error</div>
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSave = () => {
        createUserData(user)
        createUserPreferenceAction(userPreference)

    };


     function createUserData(user){
         let userData ={
             id: user.attributes.email,
             // id: user.attributes['custom:SP-PUID'],
             // SPUID: user.attributes['custom:SP-PUID'],
             // displayName: user.attributes['custom:preferredGivenName'],
             // yearLevel: user.attributes['custom:studentYearLevel'],
             // email:user.attributes['custom:studentLearnerEmail'],
             // primarySpecialization: user.attributes['custom:specPrimPrgmType'],
             // campus: user.attributes['custom:locale'],
             // faculty:user.attributes['custom:adwardingFaculty'],
             gender: gender,
             cisOrTrans:cisOrTrans

         }

         createUserDataAction(userData)
         API.graphql(graphqlOperation(createSavedItemsTable, {input: {id:UID,savedItems:[]}})).then((response) => {
             let res = response.data
         })

     }

     useEffect(()=>{
        userPreference.id = UID
    })


    return (
        <Container maxWidth={'md'} >

        <div className={classes.root}>

            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography variant={"h6"} className={classes.title}>
                            Thanks for filling in your preferences. If you would like to make changes, please go to settings page to modify
                        </Typography>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                        <div>
                            <ButtonGroup>
                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.prevButton} startIcon={<ArrowBackIcon/>}>
                                </Button>
                                {activeStep === steps.length - 1 &&(
                                    <Button startIcon={<DoneIcon/>} onClick={handleSave} />
                                )}
                                {activeStep === 0&&(
                                    <Button
                                        onClick={handleNext}
                                        className={classes.nextButton}>
                                        I agree
                                    </Button>

                                        )}

                                        {activeStep !== 0&&activeStep !== steps.length - 1&&(
                                    <Button
                                    onClick={handleNext}
                                    className={classes.nextButton}
                                    startIcon={<ArrowForwardIcon/>}
                                    />

                                    )}

                            </ButtonGroup>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </Container>
    );
}

export default connect(null, {createUserPreferenceAction,createUserDataAction})(Survey);
