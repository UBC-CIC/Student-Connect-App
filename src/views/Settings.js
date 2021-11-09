import {Card, Container, Divider, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React, { useState } from 'react';

import UserPreferenceModal from "../components/Modals/UserPreferenceModal";
import UserInfoModal from "../components/Modals/UserInfoModal";
import InfoDisclosureModal from "../components/Modals/InfoDisclosureModal";
import { openModal } from "../actions/disclosureModalActions";

import {connect, useDispatch} from "react-redux";

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
    const dispatch = useDispatch();
    const{userPreference} = props

    const handleOpen = () => {
        dispatch(openModal());
    };

    return(

        <div>
            <Container maxWidth={'xl'} >
                <Grid container spacing={2} direction={"column"}>
                    <Grid item> 
                        <Typography align={'left'} variant="h4" className={classes.title}>
                            Settings
                        </Typography>
                    </Grid>
                    <Grid item> 
                        <Typography align={'left'} variant="h5" >
                            Change your preferences here
                        </Typography>
                    </Grid>
                </Grid>

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
                                        Modify your preference settings to get the best out of the recommendations.
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
                            <InfoDisclosureModal/>
                        </Grid>
                    </Grid>

                </Grid>

            </Card>


            <Card className={classes.card}>
                <Grid container spacing={3} className={classes.root} >
                    <Grid item xs={12}>
                            <Typography align={'left'} variant={"h5"}>
                                Profile
                            </Typography>
                    </Grid>
                    <Grid container item direction="row" spacing={4} alignItems="center">
                        <Grid item>
                            <Grid container item direction="row" spacing={1}>
                                <Grid item>
                                    <Typography className={classes.content}>
                                        Modify your personal profile. 
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <UserInfoModal/>
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

export default connect(mapStateToProps, null)(Settings)