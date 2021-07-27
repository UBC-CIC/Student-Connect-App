import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles((theme) => ({
    typography: {
        padding: theme.spacing(2),
    },
    button:{
        textTransform:"none",
        backgroundColor:"#0055B7",
        color:"white",
        fontSize:'13px',
        borderRadius:"3",
        marginTop:theme.spacing(1)

    }

}));

export default function PopOverButton(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button className={classes.button} aria-describedby={id}
                    startIcon={<HelpIcon/>} variant="contained" color="primary" onClick={handleClick}>
                {props.title}
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Typography className={classes.typography} variant={"subtitle1"}>
                    {props.content}
                </Typography>
                <Typography className={classes.typography} variant={"subtitle1"}>
                    {props.content2}
                </Typography>

            </Popover>
        </div>
    );
}
