import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from "@material-ui/core/Typography";

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
        if(category==="varsitySportsList" || category==="competitiveSportsList"){
            return userPreference.sportsPreference[category][backendName]
        }
        return userPreference[category][backendName]
    }
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
    const {name, category, backendName,userPreference} = props
    function checkSport() {
        if(category==="varsitySportsList" || category==="competitiveSportsList"){
            return userPreference.sportsPreference[category][backendName]
        }
        return userPreference[category][backendName]

    }

    const [state, setState] = React.useState({
        checked: checkSport(),
    });

    const handleChange = (event) => {
        setState({ checked: event.target.checked })
        if(category==="varsitySportsList" || category==="competitiveSportsList"){
            userPreference.sportsPreference[category][backendName]=event.target.checked
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
