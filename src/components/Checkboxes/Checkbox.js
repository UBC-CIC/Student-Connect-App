import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const BlueCheckbox = withStyles({
    root: {
        color: "#0055B7",
        '&$checked': {
            color: "#0055B7",
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function SurveyCheckbox(props) {
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const {label} = props

    return (
        <FormGroup row>
            <FormControlLabel
                control={<BlueCheckbox checked={state.checkedG} onChange={handleChange} name="checkedG" />}
                label={label}
            />
        </FormGroup>
    );
}
