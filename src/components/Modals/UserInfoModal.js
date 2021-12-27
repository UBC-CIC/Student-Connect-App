import {connect, useDispatch} from "react-redux";


import {AppBar, Button, Dialog, Divider, FormControl, Grid, MenuItem, Select, Slide} from "@material-ui/core";

import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

import { getUserDataAction, updateUserDataAction } from "../../actions/userAction";
import { openModal } from "../../actions/disclosureModalActions"
import PopOverButton from "../../components/Button/PopOverButton";



const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    contentTitle: {
        color:"#0055B7",
        marginTop: '30px'
    },
    modifyButton:{
        backgroundColor:"#0055B7",
        color:"white",
        textTransform:'none',
        fontSize:"14px",
        paddingLeft:"15px",
        paddingRight:"15px"

    },
    appBar: {
        position: 'relative',
        background: "#002145",
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    formControl: {
        margin: theme.spacing(1,1,1,0),
        minWidth: 200,
    },
    divider:{
        marginTop:'30px',
    },
    saveButton:{
        fontSize:"16px",
    }


}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


function UserInfoModal(props){
    const classes = useStyles();
    const dispatch = useDispatch();
    const {currentUser, currentUserProfile} = props

    const [open, setOpen] = React.useState(false);
    const [gender, setGender] = React.useState('none');
    const [initialGender, setInitialGender] = React.useState('none');
    const [transOrCis, setTransOrCis] = React.useState('none');
    const [initialTransOrCis, setInitialTransOrCis] = React.useState('none');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSave = () => {
        updateUserDataAction({
            id: currentUser.username,
            cisOrTrans: transOrCis === "Prefer not to answer" ? "" : transOrCis,
            gender: gender === "Prefer not to answer" ? "" : gender
        });
        setOpen(false);
    };
    const handleClose = () => {
        setOpen(false);
        setGender(initialGender);
        setTransOrCis(initialTransOrCis);
    };

    const handleModalOpen = () => {
        dispatch(openModal());
    };

    const handleGenderChange=(event)=>{
        setGender(event.target.value)
    }
    const handleTransOrCisChange=(event)=> {
        setTransOrCis(event.target.value)
    }

    useEffect(()=>{
        (async () => {
            if (open) {
                await dispatch(getUserDataAction(currentUser.username));
            }
        })();
    }, [open])

    useEffect(()=>{
        if (JSON.stringify(currentUserProfile) !== '{}') {
            if (currentUserProfile.gender === "") {
                setGender("Prefer not to answer");
                setInitialGender("Prefer not to answer");
            } else {
                setGender(currentUserProfile.gender);
                setInitialGender(currentUserProfile.gender);
            }
            
            if (currentUserProfile.cisOrTrans === "") {
                setTransOrCis("Prefer not to answer");
                setInitialTransOrCis("Prefer not to answer");
            } else {
                setTransOrCis(currentUserProfile.cisOrTrans);
                setInitialTransOrCis(currentUserProfile.cisOrTrans);
            }
        }
    }, [currentUserProfile])

    return(
        <div>
            <Button className={classes.modifyButton} onClick={handleClickOpen} startIcon={<EditIcon/>}>
                Modify
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h5" className={classes.title}>
                            Change Profile Information
                        </Typography>
                        <Button className={classes.saveButton} autoFocus color="inherit" onClick={handleSave} startIcon={<SaveAltIcon/>}>
                            Save
                        </Button>
                    </Toolbar>
                </AppBar>
                {/* content */}
                <div className={classes.nested}>
                    <Typography align={'left'} variant="h6" className={classes.contentTitle}>
                        Gender
                    </Typography>
                    <Grid container item direction="row" alignItems="center">
                        <FormControl className={classes.formControl} size="small">
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                variant="outlined" 
                                value={gender}
                                onChange={handleGenderChange}
                            >
                                <MenuItem value={"none"} disabled>Select an option</MenuItem>
                                <MenuItem value={"female"}>Female</MenuItem>
                                <MenuItem value={"male"}>Male</MenuItem>
                                <MenuItem value={"non_binary"}>Non-Binary</MenuItem>
                                <MenuItem value={"Prefer not to answer"}>Prefer not to answer</MenuItem>

                            </Select>
                        </FormControl>
                        <PopOverButton title={"How does changing this information affect you?"}
                                    content={`
                                                - Gender information is collected to better enhance the 
                                                    recommendations that are being provided to you. 
                                                    You can change this information anytime.
                                            `
                                            }
                                    contentLink={[`- Please refer back to the Personal Information Disclosure to learn more about how we use the collected information.`, 'Personal Information Disclosure', handleModalOpen]}
                                    />
                    </Grid>
                    </div>
                    <Divider className={classes.divider}/>
                    <div className={classes.nested}>
                    <Typography align={'left'} variant="h6" className={classes.contentTitle}>
                        Are you/ Would you say you are:
                    </Typography>

                    <Grid container item direction="row" alignItems="center">
                        <FormControl className={classes.formControl} size="small">
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                variant="outlined" 
                                value={transOrCis}
                                onChange={handleTransOrCisChange}
                            >
                                <MenuItem value={"none"} disabled>Select an option</MenuItem>
                                <MenuItem value={"cisgender"}>Cisgender</MenuItem>
                                <MenuItem value={"transgender"}>Transgender</MenuItem>
                                <MenuItem value={"Prefer not to answer"}>Prefer not to answer</MenuItem>

                            </Select>
                        </FormControl>
                        <PopOverButton title={"Definitions"}
                                    content={'- Cisgender describes a person whose gender identity matches their assigned sex at birth.'}
                                    content2={"- Transgender describes a person whose gender identity does not match their assigned sex at birth."}
                                    />
                    </Grid>
                </div>


            </Dialog>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        currentUser:state.currentUser,
        currentUserProfile: state.currentUserProfile
    };
};

export default connect(mapStateToProps, null)(UserInfoModal);