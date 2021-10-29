import {Card, Container, Divider, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React, { useState } from 'react';

import UserPreferenceModal from "../components/Modals/UserPreferenceModal";
import InfoDisclosureModal from "../components/Modals/InfoDisclosureModal";

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
        color:"#0055B7",

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
    content:{
        fontSize:"16px"
    },
    contentLink:{
        fontSize:"16px",
        color: "blue",
        fontWeight: 500, 
        cursor: "pointer"
    },
}));

function Settings(props){
    const classes = useStyles();
    const{userPreference} = props

    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    return(

        <div>
            <Container maxWidth={'xl'} >
                <Typography align={'left'} variant="h4" className={classes.title}>
                    Settings
                </Typography>
                <Typography align={'left'} variant="h5" >
                    Change your preferences here
                </Typography>

                <Divider className={classes.divider}/>
            </Container>
            <Container>
            <Card className={classes.card}>
                <Grid container spacing={3} className={classes.root} >
                    <Grid item xs={12}>
                            <Typography align={'left'} variant={"h5"}>
                                General
                            </Typography>
                    </Grid>
                    <Grid container item direction="row" spacing={4} alignItems="center">
                        <Grid item>
                            <Grid container item direction="row" spacing={1}>
                                <Grid item>
                                    <Typography className={classes.content}>
                                        Modify my preference settings to get the best out of the recommendations.
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography className={classes.contentLink} onClick={handleOpen}>
                                        How does it work?
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <UserPreferenceModal userPreference={userPreference}/>
                        </Grid>
                        <Grid item>
                            <InfoDisclosureModal open={modalOpen} handleClose={handleClose}/>
                        </Grid>
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
        allNews:state.allNews
    };
};

export default connect(mapStateToProps)(Settings)