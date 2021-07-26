import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    label:{
        fontSize:"14"
    }

}));

const BlueCheckbox = withStyles({
    root: {
        color: "#00A7E1",
        '&$checked': {
            color: "#00A7E1",
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

export function SurveyCheckbox(props) {
    const {label, backendName,category,userPreference} = props

    function checkSport() {
        if(category==="mensSportsList" || category==="womensSportsList"){
            return userPreference.sportsPreference[category][backendName]
        }
        return userPreference[category][backendName]

    }
    const classes = useStyles()
    const [state, setState] = React.useState({
        checked: checkSport(),
    });

    const handleChange = (event) => {
        setState({ checked: event.target.checked });
        props.handleChange({category:category,
                backendName:backendName,
                checked:!state.checked
        })
    }
    return (
        <FormGroup row>
            <FormControlLabel
                control={<BlueCheckbox checked={state.checked} label={backendName} onChange={handleChange} name="checked"
                />}
                label={<Typography variant={"subtitle1"}>{label}</Typography>}
            />
        </FormGroup>
    );
}
export function SettingsPageCheckbox(props) {
    const classes = useStyles()
    const {name, category, backendName,checked,userPreference} = props
    function checkSport() {
        if(category==="mensSportsList" || category==="womensSportsList"){
            return userPreference.sportsPreference[category][backendName]
        }
        return userPreference[category][backendName]

    }

    const [state, setState] = React.useState({
        checked: checkSport(),
    });

    const handleChange = (event) => {
        setState({ checked: event.target.checked })
        if(category==='mensSportsList'){
            userPreference.sportsPreference.mensSportsList[backendName]=event.target.checked

        }else if(category==='womensSportsList'){
            userPreference.sportsPreference.womensSportsList[backendName]=event.target.checked
        }else{
            userPreference[category][backendName]=event.target.checked
        }

    }
    return (
        <FormGroup row>
            <FormControlLabel
                control={<BlueCheckbox checked={state.checked} label={name} onChange={handleChange} name="checked"
                />}
                label={<Typography variant={"subtitle1"}>{name}</Typography>}
            />
        </FormGroup>
    );
}
