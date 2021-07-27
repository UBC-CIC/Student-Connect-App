import React from 'react';
import {makeStyles, TextField} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    // need to move the label to the right of the adornment/icon
    labelOffset: {
        transform: "translate(44px, 20px) scale(1)",
    }
}));

export default function TextFieldStartAdornment(props) {
    const classes = useStyles();
    const { startIcon, label, ...other } = props;

    return (
        <TextField
            {...other}
            label={label}
            fullWidth={true}
            // InputProps={{
            //     endAdornment: startIcon && (
            //         <InputAdornment position="end" disablePointerEvents
            //             // style={{}}
            //         >
            //             {startIcon}
            //         </InputAdornment>
            //     )
            // }}
        />
    );
};