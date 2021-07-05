import SurveyCheckbox from "../../components/Checkboxes/Checkbox";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Divider} from "@material-ui/core";
import {
    newsBlogsClubsOptions,
    academicOptions,
    eventsOptions,
    mensSportsOptions,
    womensSportOptions, womensSportsOptions
} from '../../assets/SurveyCategories'
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

}));

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