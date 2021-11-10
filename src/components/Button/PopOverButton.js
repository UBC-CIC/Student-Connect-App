import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HelpIcon from '@material-ui/icons/Help';

const useStyles = makeStyles((theme) => ({
    typography: {
        margin: theme.spacing(2),
    },
    button:{
        textTransform:"none",
        backgroundColor:"#0055B7",
        color:"white",
        fontSize:'13px',
        borderRadius:"3",
    },
    cursor: {
        cursor: "pointer"
    },
    contentLink: {
        borderBottom: "1px solid"
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

    const handleLinkString = () => {
        /*
        * props.contentLink = [defaultString, string to split, function]
        */
        const defaultString = props.contentLink[0].split(props.contentLink[1]);
        return (
            <Typography className={classes.typography} variant={"subtitle1"}>
                {defaultString[0]}
                <span className={classes.cursor}>
                    <a className={classes.contentLink} onClick={props.contentLink[2]}>
                        {props.contentLink[1]}
                    </a>
                </span>
                {defaultString[1]}
            </Typography>
        )
    }

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
                PaperProps={{
                    style: { width: "400px" },
                }}
            >
                <Typography className={classes.typography} variant={"subtitle1"}>
                    {props.content}
                </Typography>

                {!!props.content2 && 
                    <Typography className={classes.typography} variant={"subtitle1"}>
                        {props.content2}
                    </Typography>
                }

                {!!props.contentLink && handleLinkString()}

            </Popover>
        </div>
    );
}
