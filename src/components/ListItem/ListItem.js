import {Collapse, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import React from "react";
import {makeStyles, withStyles} from "@material-ui/core/styles";
import {SettingsPageCheckbox} from "../Checkboxes/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

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
    switch:{
        float:"right"

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
                        <SettingsPageCheckbox name={option.name} backendName={option.backendName}
                                              checked={option.checked} userPreference={option.userPreference}
                        category={option.category}/>
                    </ListItem>
                )}
            </List>
        </Collapse>
        <Divider />
        </div>

)
}

export  function EmailItem(props){
    const [openListItem, setOpenListItem] = React.useState(false);

    const handleClickOpenListItem = () => {
        setOpenListItem(!openListItem);
    };
    const [state, setState] = React.useState({
        checked: props.userPreference.emailNotification
    });

    const classes = useStyles();
    const {label,icon} = props
    const handleSwitchChange=()=>{
        setState({checked:!state.checked})
        props.userPreference.emailNotification=!state.checked

    }

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
                    <ListItem className={classes.nested}>
                    <Typography>

                    </Typography>
                        <FormGroup row>
                            <FormControlLabel
                                control={<BlueCheckbox checked={state.checked}
                                                       onChange={handleSwitchChange} name="checked"
                                />}
                                label={<Typography variant={"caption"}>{"Email me news, events and blogs that I might be interested"}</Typography>}
                            />
                        </FormGroup>

                    </ListItem>
                </List>
            </Collapse>
            <Divider />
        </div>

    )
}