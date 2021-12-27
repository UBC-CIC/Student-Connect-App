import {SurveyCheckbox} from "../../components/Checkboxes/Checkbox";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Divider, FormControl, Grid, MenuItem, Select, Switch} from "@material-ui/core";
import {
    academicOptions,
    cultureOptions,
    eventsOptions,
    newsBlogsClubsOptions,
    varsitySportsOptions,
    competitiveSportsOptions
} from '../../assets/SurveyCategories'
import PopOverButton from "../../components/Button/PopOverButton";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    title:{
        color:"#0055B7",
        marginTop: '24px !important'
    },
    divider:{
        marginTop:'5px',
        marginBottom:'5px',
    },
    introduction:{
        marginBottom:'20px',
    },
    formControl: {
        margin: theme.spacing(1,1,1,0),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },


}));

export function SurveyWelcomePage(props){
    const classes = useStyles();


    return(
        <div>
            <Typography align={'left'} variant="h5" className={classes.title}>
                Welcome to the Student App
            </Typography>
            <Divider className={classes.divider}/>
            <Typography align={'left'} variant="subtitle1" className={classes.introduction}>
                This app amalgamates information about events, blogs, news and clubs in order to provide information you may be interested in. In order to show you information relevant to your interests, we need some information about you. Completing the form is entirely voluntary; if you choose not to provide further information, the recommendations will simply be less personalized.
            </Typography>

            <Typography align={'left'} variant="subtitle1" className={classes.introduction}>

                We are committed to protecting your privacy.  Any information you choose to provide will be used solely for the purpose of this app. It will not be shared with third parties, and it will be stored securely in an environment controlled by UBC.
                </Typography>
            <Typography align={'left'} variant="subtitle1" className={classes.introduction}>
            You can alter your entries at any time, and can delete them entirely, should you wish to do so.
            </Typography>
        </div>

    )

}

export function NewsBlogsClubs(props){
    const classes = useStyles();
    return(
        <div>
            <Typography align={'left'} variant="h5" className={classes.title}>
                Which of the following topics interest you? (for news, blogs and clubs)
            </Typography>
            <Divider className={classes.divider}/>

            {newsBlogsClubsOptions.map((option,index) => <SurveyCheckbox label={option.name} backendName={option.backendName}
                                                                 handleChange={props.handleChange}
                                                                 category={"newsBlogsClubsPreference"}
                                                                 userPreference={props.userPreference}
                                                                 key={index}
                                                                 />)}

        </div>

    )
}
export function Events(props){
    const classes = useStyles();



    return(
        <div>
            <Typography align={'left'} variant="h5" className={classes.title}>
                Which of the following areas/departments on campus would you like to get event recommendations from?
            </Typography>
            <Divider className={classes.divider}/>
            {eventsOptions.map((option,index) => <SurveyCheckbox label={option.name} backendName={option.backendName}
                                                         handleChange={props.handleChange} category={"eventsPreference"}
                                                         userPreference={props.userPreference}
                                                         key={index}
                                                         />) }

        </div>

    )
}
export function Academic(props){
    const classes = useStyles();

    return(
        <div>
            <div>
                <Typography align={'left'} variant="h5" className={classes.title}>
                    Which of the following academic fields are you interested in? (for news, blogs and clubs)
                </Typography>
                <Divider className={classes.divider}/>

                {academicOptions.map((option,index) => <SurveyCheckbox label={option.name} backendName={option.backendName}
                                                               handleChange={props.handleChange} category={"academicPreference"}
                                                               userPreference={props.userPreference}
                                                               key={index}
                                                               />)}
            </div>
        </div>

    )
}
export function Sports(props){
    const classes = useStyles();

    return(
        <div>
            <Grid spacing={5}>
                <Grid item xs={12}>
                    <Typography align={'left'} variant="h5" className={classes.title}>
                        Which of the following sports are you interested in? (for athletic news)
                    </Typography>
                    <Divider className={classes.divider}/>

                    <Typography align={'left'} variant="h6" className={classes.title}>
                        Varsity Sports
                    </Typography>
                    {varsitySportsOptions.map((option,index) => <SurveyCheckbox label={option.name} backendName={option.backendName}
                                                                    handleChange={props.handleChange} category={"varsitySportsList"}
                                                                    userPreference={props.userPreference}
                                                                    key={index}
                                                                    />)}


                    <Typography align={'left'} variant="h6" className={classes.title}>
                        Competitive Club Sports
                    </Typography>
                    {competitiveSportsOptions.map((option,index) => <SurveyCheckbox label={option.name} backendName={option.backendName}
                                                                    handleChange={props.handleChange} category={"competitiveSportsList"}
                                                                    userPreference={props.userPreference}
                                                                    key={index}
                                                                    />)}

                </Grid>
                
                
            </Grid>
        </div>

    )
}

export function Email(props){
    const classes = useStyles();
    const {userPreference} = props
    const [state, setState] = React.useState({
        checkedA: userPreference.emailNotification
    });
    const [gender, setGender] = React.useState('');
    const [transOrCis, setTransOrCis] = React.useState('');

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        props.handleSwitchChange(event.target.checked)
    };
    const handleGenderChange=(event)=>{
        setGender(event.target.value)
        if(event.target.value==="Prefer not to answer"){
            props.handleGenderChange("")
        }else{
            props.handleGenderChange(event.target.value)
        }
    }
    const handleTransOrCisChange=(event)=> {
        setTransOrCis(event.target.value)
        if(event.target.value==="Prefer not to answer"){
            props.handleCisOrTransChange("")
        }else{
            props.handleCisOrTransChange(event.target.value)
        }
    }

        return(
        <div>
            <Grid spacing={5}>
                <Grid item xs={12}>
                <Typography align={'left'} variant="h6" className={classes.title}>
                    Would you like to receive emails about things that you might be interested in?
                </Typography>
                <Divider className={classes.divider}/>
                </Grid>
                <Grid container item direction="row" alignItems="center">
                    <Typography>No</Typography>
                    <Switch
                        checked={state.checkedA}
                        onChange={handleChange}
                        name="checkedA"
                        color="primary"
                    />
                    <Typography>Yes</Typography>
                </Grid>
                <Typography align={'left'} variant="h6" className={classes.title}>
                    Please indicate your gender
                </Typography>
                <Divider className={classes.divider}/>
                <Grid container item direction="row" alignItems="center">
                    <FormControl className={classes.formControl} size="small">
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            variant="outlined" 
                            value={gender}
                            onChange={handleGenderChange}
                        >
                            <MenuItem value={"none"} disabled>Select an option</MenuItem>
                            <MenuItem value={"female"}>Female</MenuItem>
                            <MenuItem value={"male"}>Male</MenuItem>
                            <MenuItem value={"non_binary"}>Non-Binary</MenuItem>
                            <MenuItem value={"Prefer not to answer"}>Prefer not to answer</MenuItem>

                        </Select>
                    </FormControl>
                    <PopOverButton title={"Why is this information collected"}
                                content={`
                                            - Gender information is collected to better enhance the 
                                                recommendations that are being provided to you. 
                                                You can change this information anytime.
                                        `
                                        }
                                contentLink={[`- Please refer back to the Personal Disclosure Statement on the Welcome page to learn more about how we use the collected information.`, 'Personal Disclosure Statement', props.handleBeginning]}
                                />
                </Grid>
                <Typography align={'left'} variant="h6" className={classes.title}>
                    Are you/ Would you say you are:
                </Typography>

                <Grid container item direction="row" alignItems="center">
                    <FormControl className={classes.formControl} size="small">
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            variant="outlined" 
                            value={transOrCis}
                            onChange={handleTransOrCisChange}
                        >
                            <MenuItem value={"none"} disabled>Select an option</MenuItem>
                            <MenuItem value={"cisgender"}>Cisgender</MenuItem>
                            <MenuItem value={"transgender"}>Transgender</MenuItem>
                            <MenuItem value={"Prefer not to answer"}>Prefer not to answer</MenuItem>

                        </Select>
                    </FormControl>
                    <PopOverButton title={"Definitions"}
                                content={'- Cisgender describes a person whose gender identity matches their assigned sex at birth.'}
                                content2={"- Transgender describes a person whose gender identity does not match their assigned sex at birth."}
                                />
                </Grid>


                <Typography align={'left'} variant="h6" className={classes.title}>
                    Which of the following cultures are you interested in?
                </Typography>
                <Divider className={classes.divider}/>
                {cultureOptions.map((option,index) => <SurveyCheckbox label={option.name}backendName={option.backendName}
                                                                   handleChange={props.handleChange} category={"culturePreference"}
                                                                   userPreference={props.userPreference}
                                                                   key={index}
                                                                   />)}

            </Grid>
        </div>

    )
}
