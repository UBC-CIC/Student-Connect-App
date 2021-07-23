import {SurveyCheckbox} from "../../components/Checkboxes/Checkbox";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Switch
} from "@material-ui/core";
import {
    academicOptions,
    eventsOptions,
    mensSportsOptions,
    newsBlogsClubsOptions,
    womensSportsOptions
} from '../../assets/SurveyCategories'
import Grid from "@material-ui/core/Grid";

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
        color:"#0055B7"

    },
    divider:{
        marginTop:'5px',
        marginBottom:'5px',
    },
    introduction:{
        marginBottom:'20px',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },


}));

export function SurveyWelcomePage(props){
    const classes = useStyles();
    const {checked} = props


    return(
        <div>
            <Typography align={'left'} variant="h6" className={classes.title}>
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
            <Typography align={'left'} variant="h6" className={classes.title}>
                Which of the following topics interest you? (for news, blogs and clubs)
            </Typography>
            <Divider className={classes.divider}/>

            {newsBlogsClubsOptions.map(option => <SurveyCheckbox label={option.name} backendName={option.backendName}
                                                                 handleChange={props.handleChange} category={"newsBlogsClubsPreference"}
                                                                 userPreference={props.userPreference}/>)}

        </div>

    )
}
export function Events(props){
    const classes = useStyles();



    return(
        <div>
            <Typography align={'left'} variant="h6" className={classes.title}>
                You would be interested in attending events organised in which of the following areas?
            </Typography>
            <Divider className={classes.divider}/>
            {eventsOptions.map(option => <SurveyCheckbox label={option.name} backendName={option.backendName}
                                                         handleChange={props.handleChange} category={"eventsPreference"}
                                                         userPreference={props.userPreference}/>) }

        </div>

    )
}
export function Academic(props){
    const classes = useStyles();

    return(
        <div>
            <div>
                <Typography align={'left'} variant="h6" className={classes.title}>
                    Which of the following academic fields are you interested in? (for news, blogs and clubs)
                </Typography>
                <Divider className={classes.divider}/>

                {academicOptions.map(option => <SurveyCheckbox label={option.name} backendName={option.backendName}
                                                               handleChange={props.handleChange} category={"academicPreference"}
                                                               userPreference={props.userPreference}/>)}
            </div>
        </div>

    )
}
export function Sports(props){
    const classes = useStyles();

    return(
        <div>
            <div>
                <Typography align={'left'} variant="h6" className={classes.title}>
                    Which of the following sports are you interested in? (for athletic news)
                </Typography>
                <Divider className={classes.divider}/>
                <Typography align={'left'} variant="subtitle1" className={classes.title}>
                    Men's Sports
                </Typography>


                {mensSportsOptions.map(option => <SurveyCheckbox label={option.name} backendName={option.backendName}
                                                                 handleChange={props.handleChange} category={"mensSportsList"}
                                                                 userPreference={props.userPreference}/>)}
                <Divider className={classes.divider}/>
                <Typography align={'left'} variant="subtitle1" className={classes.title}>
                    Women's Sports
                </Typography>

                {womensSportsOptions.map(option => <SurveyCheckbox label={option.name}backendName={option.backendName}
                                                                   handleChange={props.handleChange} category={"womensSportsList"}
                                                                   userPreference={props.userPreference}/>)}

            </div>
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
                </Grid>
                <Grid item xs={5}>
                    <Switch
                        checked={state.checkedA}
                        onChange={handleChange}
                        name="checkedA"
                        color="primary"
                    />
                </Grid>
                <Typography align={'left'} variant="h6" className={classes.title}>
                    Please indicate your gender
                </Typography>

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Select an option</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gender}
                        onChange={handleGenderChange}
                    >
                        <MenuItem value={"female"}>Female Gender</MenuItem>
                        <MenuItem value={"male"}>Male Gender</MenuItem>
                        <MenuItem value={"non_binary"}>Non-Binary Gender</MenuItem>
                        <MenuItem value={"Prefer not to answer"}>Prefer not to answer</MenuItem>

                    </Select>
                </FormControl>
                <Typography align={'left'} variant="h6" className={classes.title}>
                    Are you/Would you say you are:
                </Typography>

                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Select an option</InputLabel>

                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={transOrCis}
                        onChange={handleTransOrCisChange}
                    >
                        <MenuItem value={"cisgender"}>Cisgender</MenuItem>
                        <MenuItem value={"transgender"}>Transgender</MenuItem>
                        <MenuItem value={"Prefer not to answer"}>Prefer not to answer</MenuItem>

                    </Select>
                </FormControl>

            </Grid>
        </div>

    )
}
