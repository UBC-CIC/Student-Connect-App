import SurveyCheckbox from "../../components/Checkboxes/Checkbox";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Divider} from "@material-ui/core";

var academicOptions =["Computer Science, Mathematics, Physics, and Statistics", "Economics, Philosophy and Political Science", "History and Sociology",
"School of Nursing", "Engineering", "Okanagan School of Education", 'College of Graduate Studies',"Faculty of Creative and Critical Studies",
"Faculty of Management", "Irving K Barber Faculty of Arts and Social Sciences","Psychology","Faculty of Health and Social Development",
"Southern Medical Program", "Biology", "Centre for Scholarly Communication" ]

const sustainbilityOptions=['Sustainability Office', 'Campus Planning and Development',"Okanagan Institute for Biodiversity, Resilience, and EcosystemsServices (BRAES)",
'Irving K Barber Faculty of Science', "Geology", "School of Health and Exercise Sciences", 'Faculty of Health and Social Development',
'Faculty of Health and Social Development','Student Life Blog: Health & Wellness']

const campusLifeOptions=['Entrepreneurship',"Mental Health and Inclusion", 'Sports and Recreation','Community, Culture and Global Studies']

const workingCareerOptions=['Career Services','Training and Professional Development','Careers Life Blog', 'Co-op Education']

const studyingCareerOptions=['Centre for Teaching and Learning','College of Graduate Studies']

const researchOptions=['Research (news)','Materials and Manufacturing Research Institute (MMRI)','Research and Innovation, Office of the Vice-Principal',
'Institute for Community Engaged Research (ICER) Office of the Vice-Principal', 'Institute for Community Engaged Research (ICER) Office of Research Services',
'Office of Research Services','Research and Innovation, Office of the Vice-Principal']
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