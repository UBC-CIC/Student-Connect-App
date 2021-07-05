import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
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

export default function SurveyCheckbox(props) {
    const {label, backendName,category,userPreference} = props

    function checkSport() {
        if(category==="mensSportsList" || category==="womensSportsList"){
            console.log(category)
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

            console.log(props)
            props.handleChange({category:category,
                backendName:backendName})
    }
    return (
        <FormGroup row>
            <FormControlLabel
                control={<BlueCheckbox checked={state.checked} label={backendName} onChange={handleChange} name="checked"
                />}
                label={<Typography variant={"caption"}>{label}</Typography>}
            />
        </FormGroup>
    );
}
