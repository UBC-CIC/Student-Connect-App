import React from 'react';
import {Grid, InputAdornment, TextField} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        fontSize: "1rem"
    },
    form: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: 0,
            },
        },
    },
    contained: {
        marginLeft: 0,
    }
}));

export default function TextFieldStartAdornment(props) {
    const { startIcon, placeholder, ...other } = props;
    const classes = useStyles();

    return (
        <Grid container item direction={"column"} className={`input-box ${!startIcon && classes.form}`}>
            <TextField
                {...other}
                required
                placeholder={placeholder}
                fullWidth={true}
                variant="outlined"
                FormHelperTextProps={{
                    classes: {
                        root: classes.root,
                        contained: classes.contained,
                    } 
                }}
                InputProps={{
                    startAdornment: startIcon && (
                        <InputAdornment position="start" disablePointerEvents>
                            {startIcon}
                        </InputAdornment>
                    )
                }}
                size= {startIcon ? "medium" : "small"}
            />
        </Grid>
    );
};