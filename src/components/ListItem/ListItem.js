import {Collapse, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {ExpandLess, ExpandMore, StarBorder} from "@material-ui/icons";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {newsBlogsClubsOptions} from "../../assets/SurveyCategories";
import {SettingsPageCheckbox} from "../Checkboxes/Checkbox";
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

export  function PreferenceListItem(props){
    const [openListItem, setOpenListItem] = React.useState(false);

    const handleClickOpenListItem = () => {
        setOpenListItem(!openListItem);
    };
    const classes = useStyles();
    const {label,nestedItem,icon} = props

    return(
        <div>
            <ListItem button onClick={handleClickOpenListItem}>
                <ListItemIcon style={{ color:"#0055B7"  }} >
                    {icon}
                </ListItemIcon>
                <ListItemText primary={label} />
                {openListItem ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
        <Collapse in={openListItem} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                {nestedItem.map(option =>
                    <ListItem button className={classes.nested}>
                        <SettingsPageCheckbox name={option.name} backendName={option.backendName} checked={option.checked} />
                    </ListItem>
                )}
            </List>
        </Collapse>
        <Divider />
        </div>

)
}