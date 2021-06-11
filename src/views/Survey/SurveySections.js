import SurveyCheckbox from "../../components/Checkboxes/Checkbox";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Divider} from "@material-ui/core";
import {academicOptions,sustainbilityOptions,campusLifeOptions,workingCareerOptions,studyingCareerOptions,researchOptions} from '../../assets/SurveyCategories'
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

export function Academic(){
    const classes = useStyles();
    return(
        <div>
            <Typography align={'left'} variant="h6" className={classes.title}>
                Which of the following academic fields are you interested in?
            </Typography>
            <Divider className={classes.divider}/>

            {academicOptions.map(option => <SurveyCheckbox label={option}/>)}

        </div>

    )
}
export function Career(){
    const classes = useStyles();

    return(
        <div>
            <Typography align={'left'} variant="h6" className={classes.title}>
                Which of the following careers development categories are interested in?
            </Typography>
            <Divider className={classes.divider}/>

            <div>
                <Typography align={'left'} variant="h6" className={classes.title}>
                    Studying
                </Typography>
                {studyingCareerOptions.map(option => <SurveyCheckbox label={option}/>)}
            </div>
            <Typography align={'left'} variant="h6" className={classes.title}>
                Working
            </Typography>

            <div>
                {workingCareerOptions.map(option => <SurveyCheckbox label={option}/>)}

            </div>

    </div>


)
}export function Research(){
    const classes = useStyles();


    return(
        <div>
            <Typography align={'left'} variant="h6" className={classes.title}>
                Are you interested in research?
            </Typography>
            <Divider className={classes.divider}/>
            {researchOptions.map(option => <SurveyCheckbox label={option}/>)}

        </div>

    )
}export function Campus(){
    const classes = useStyles();

    return(
        <div>
            <Typography align={'left'} variant="h6" className={classes.title}>
                Want to know more about campus life (Events, student blogs...etc)?
            </Typography>
            <Divider className={classes.divider}/>
            <div>
                <Typography align={'left'} variant="h6" className={classes.title}>
                    Campus life
                </Typography>
                {campusLifeOptions.map(option => <SurveyCheckbox label={option}/>)}
            </div>
            <div>
                <Typography align={'left'} variant="h6" className={classes.title}>
                    Sustainbility
                </Typography>

                {sustainbilityOptions.map(option => <SurveyCheckbox label={option}/>)}
            </div>
        </div>

    )
}