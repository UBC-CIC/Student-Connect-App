import SurveyCheckbox from "../../components/Checkboxes/Checkbox";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Divider} from "@material-ui/core";
import {newsBlogsClubsOptions,academicOptions,eventsOptions} from '../../assets/SurveyCategories'
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

export function NewsBlogsClubs(){
    const classes = useStyles();
    return(
        <div>
            <Typography align={'left'} variant="h6" className={classes.title}>
                Which of the following topics interest you? (for news, blogs and clubs)
            </Typography>
            <Divider className={classes.divider}/>

            {newsBlogsClubsOptions.map(option => <SurveyCheckbox label={option}/>)}

        </div>

    )
}
export function Events(){
    const classes = useStyles();


    return(
        <div>
            <Typography align={'left'} variant="h6" className={classes.title}>
                You would be interested in attending events organised in which of the following areas?
            </Typography>
            <Divider className={classes.divider}/>
            {eventsOptions.map(option => <SurveyCheckbox label={option}/>)}

        </div>

    )
}
export function Academic(){
    const classes = useStyles();

    return(
        <div>
            <div>
                <Typography align={'left'} variant="h6" className={classes.title}>
                    Which of the following academic fields are you interested in? (for news, blogs and clubs)
                </Typography>
                <Divider className={classes.divider}/>

                {academicOptions.map(option => <SurveyCheckbox label={option}/>)}
            </div>
        </div>

    )
}