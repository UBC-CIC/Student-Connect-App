import {AppBar, Collapse, Dialog, Fade, ListItem, ListItemIcon, ListItemText, Slide} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import CloseIcon from '@material-ui/icons/Close';
import {CalendarToday, ExpandLess, ExpandMore, StarBorder} from "@material-ui/icons";
import {PreferenceListItem} from "../ListItem/ListItem";
import {newsBlogsClubsOptions,academicOptions,eventsOptions,workingCareerOptions,studyingCareerOptions,researchOptions} from "../../assets/SurveyCategories";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SchoolIcon from '@material-ui/icons/School';
import WorkIcon from '@material-ui/icons/Work';
import EcoIcon from '@material-ui/icons/Eco';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import FunctionsIcon from '@material-ui/icons/Functions';
import BookIcon from "@material-ui/icons/Book";
import EditIcon from '@material-ui/icons/Edit';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import RssFeedIcon from "@material-ui/icons/RssFeed";
import EventIcon from '@material-ui/icons/Event';

const useStyles = makeStyles((theme) => ({
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },    modifyButton:{
        backgroundColor:"#0055B7",
        color:"white",
        textTransform:'none'

    },
    appBar: {
        position: 'relative',
        background: "#002145",
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },



}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function UserPreferenceModal(props){
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
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
                        <Typography variant="h6" className={classes.title}>
                            Change preferences
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose} startIcon={<SaveAltIcon/>}>
                            Save
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <PreferenceListItem label={"News, Blogs and Clubs"} nestedItem={newsBlogsClubsOptions} icon={<RssFeedIcon/>}/>
                    <PreferenceListItem label={"Events"} nestedItem={eventsOptions} icon={<EventIcon/>}/>
                    <PreferenceListItem label={"Academic"} nestedItem={academicOptions} icon={<BookIcon/>}/>


                </List>
            </Dialog>
        </div>

    )
}