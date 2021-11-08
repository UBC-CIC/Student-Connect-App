import {AppBar, Dialog, Slide} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import CloseIcon from '@material-ui/icons/Close';
import {EmailItem, PreferenceListItem} from "../ListItem/ListItem";
import {
    academicOptions,
    cultureOptions,
    eventsOptions,
    newsBlogsClubsOptions,
    varsitySportsOptions,
    competitiveSportsOptions
} from "../../assets/SurveyCategories";
import BookIcon from "@material-ui/icons/Book";
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import RssFeedIcon from "@material-ui/icons/RssFeed";
import EventIcon from '@material-ui/icons/Event';
import {Sports} from "@material-ui/icons";
import {updateUserPreferenceAction} from "../../actions/userAction";
import EmailIcon from "@material-ui/icons/Email";
import PublicIcon from '@material-ui/icons/Public';

const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
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
    listTitle:{
        fontSize:"16px",

    }



}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function UserPreferenceModal(props){
    const classes = useStyles();
    const {userPreference} = props
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSave = () => {
        updateUserPreferenceAction(userPreference)
        setOpen(false);
    };
    const handleClose = () => {
        setOpen(false);
    };


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
                            Change preferences
                        </Typography>
                        <Button className={classes.listTitle} autoFocus color="inherit" onClick={handleSave} startIcon={<SaveAltIcon/>}>
                            Save
                        </Button>
                    </Toolbar>
                </AppBar>
                {userPreference ?
                    <List>
                        <PreferenceListItem label={"News, Blogs and Clubs"}
                                            nestedItem={newsBlogsClubsOptions.map(item=>({ name: item.name,
                                                backendName: item.backendName, checked:userPreference["newsBlogsClubsPreference"][item.backendName], userPreference:userPreference,category:"newsBlogsClubsPreference" }))} icon={<RssFeedIcon/>}/>
                        <PreferenceListItem label={"Events"}
                                            nestedItem={eventsOptions.map(item=>({ name: item.name, backendName: item.backendName,checked:userPreference["eventsPreference"][item.backendName], userPreference:userPreference,category:"eventsPreference" }) )} icon={<EventIcon/>}/>

                        <PreferenceListItem label={"Academic"}
                                            nestedItem={academicOptions.map(item=>({ name: item.name, backendName: item.backendName,checked:userPreference["academicPreference"][item.backendName], userPreference:userPreference,category:"academicPreference" }) )} icon={<BookIcon/>}/>

                        <PreferenceListItem label={"Culture"}
                                            nestedItem={cultureOptions.map(item=>({ name: item.name, backendName: item.backendName,checked:userPreference["culturePreference"][item.backendName], userPreference:userPreference,category:"culturePreference" }) )} icon={<PublicIcon/>}/>
                        <PreferenceListItem label={"Varsity Sports"}
                                            nestedItem={varsitySportsOptions.map(item=>({ name: item.name, backendName: item.backendName,checked:userPreference["sportsPreference"]["varsitySportsList"][item.backendName], userPreference:userPreference,category:"varsitySportsList" }) )} icon={<Sports/>}/>
                        <PreferenceListItem label={"Competitive Sports"}
                                            nestedItem={competitiveSportsOptions.map(item=>({ name: item.name, backendName: item.backendName,checked:userPreference["sportsPreference"]["competitiveSportsList"][item.backendName] , userPreference:userPreference,category:"competitiveSportsList" }) )
                                            } icon={<Sports/>}/>
                        <EmailItem icon={<EmailIcon/>} label={'Email'} userPreference={userPreference}/>

                    </List>
                    : null}

            </Dialog>
        </div>

    )
}