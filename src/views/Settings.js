import {Button, Card, Container, Divider, Grid, Modal,Fade, Switch, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import UserPreferenceModal from "../components/Modals/UserPreferenceModal";
import {connect} from "react-redux";
const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        alignItems:"left",
        alignContent:"left"
    },
    card:{
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8)
    },
    divider:{
        marginTop:'30px',
        marginBottom:'30px',

    },

    title:{
        fontWeight: 600,
        color:"#0055B7"

    },
    switch:{

    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },


}));

function Settings(props){
    const classes = useStyles();
    const{userPreference}=props
    console.log(userPreference)
    const [state, setState] = React.useState({
        checked: props.userPreference.emailNotification
    });

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSwitchChange=()=>{
        setState({checked:!state.checked})
        props.userPreference.emailNotification=!state.checked

    }


    return(

        <div>
            <Container maxWidth={'xl'} >
                <Typography align={'left'} variant="h4" className={classes.title}>
                    Settings
                </Typography>
                <Divider className={classes.divider}/>
            </Container>
            <Container>
            <Card className={classes.card}>
                <Grid container spacing={3} className={classes.root} >
                    <Grid item xs={12}>
                            <Typography align={'left'}>
                                General
                            </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography align={'left'} >
                            Modify my preference settings to get the best out of the recommendation
                        </Typography>

                    </Grid>
                    <Grid item xs={2}>
                        <UserPreferenceModal userPreference={userPreference}/>
                    </Grid>

                </Grid>

            </Card>
            </Container>
            <Container>
                <Card className={classes.card}>
                    <Grid container spacing={3} className={classes.root} >
                        <Grid item xs={12}>
                            <Typography align={'left'}>

                            Email
                        </Typography>

                    </Grid>
                        <Grid item xs={10}>
                            <Typography align={'left'}>
                            Email me about events and clubs that I might be interested in
                            </Typography>
                        </Grid>

                        <Grid item xs={2}>
                            <Switch checked={state.checked}  onChange={handleSwitchChange}
                                    className={classes.switch}/>
                        </Grid>
                    </Grid>

                </Card>
            </Container>

        </div>

    )

}
const mapStateToProps = (state) => {
    return {
        userPreference: state.userPreference,
    };
};

export default connect(mapStateToProps)(Settings)