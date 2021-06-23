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
    const classes = useStyles()
    const [state, setState] = React.useState({
        checkedA: false,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const {label} = props

    return (
        <FormGroup row>
            <FormControlLabel
                control={<BlueCheckbox checked={state.checkedA} onChange={handleChange} name="checkedA"/>}
                label={<Typography variant={"caption"}>{label}</Typography>}
            />
        </FormGroup>
    );
}
