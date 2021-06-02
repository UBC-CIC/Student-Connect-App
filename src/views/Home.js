import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {GridList, GridListTile, GridListTileBar, Paper} from "@material-ui/core";
import {HomePageNewsCard} from "../components/Cards/NewsCard";
import EventCard from "../components/Cards/EventCard";
import IconButton from "@material-ui/core/IconButton";
import * as PropTypes from "prop-types";
import {EventGridList, NewsGridList} from "../components/GridList/GridList";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(10),

    },
    container:{
        paddingLeft: theme.spacing(10),

    },


}));

function StarBorderIcon(props) {
    return null;
}

StarBorderIcon.propTypes = {className: PropTypes.any};
export default function Home() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Container className={classes.container}>
                <Typography align={'left'} variant="h4">
                    Events that you have shown interests
                </Typography>
                <Container>
                    <EventGridList/>
                </Container>
            </Container>

            <Container className={classes.container} >
                <Typography align={'left'} variant="h4">
                    For you
                </Typography>
                <Typography align={'left'} variant="h6">
                    Recommendations based on your personalized content tags
                </Typography>

            </Container>
            <div className={classes.root}>
                <Container className={classes.cardGrid}>
                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <HomePageNewsCard title={'News title'} photo={'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <HomePageNewsCard title={'Parental consumption shapes how teens think about and use cannabis'} photo={'https://news.ok.ubc.ca/wp-content/uploads/2021/05/cannabis-1200-225x225.jpg'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <HomePageNewsCard title={'News title'} photo={'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg'}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <HomePageNewsCard title={'News title'} photo={'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <HomePageNewsCard title={'News title'} photo={'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg'}/>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3} >
                        <EventCard title={"Event"} date={'2021/05/20'} location={"Vancouver, BC"} photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}/>

                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <EventCard title={"Event"} date={'2021/05/20'} location={"Vancouver, BC"}  photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <EventCard title={"Event"} date={'2021/05/20'} location={"Vancouver, BC"}  photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <EventCard title={"Event"} date={'2021/05/20'} location={"Vancouver, BC"} photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}/>
                    </Grid>
                </Grid>
                </Container>
                <Container className={classes.container} >
                    <Typography align={'left'} variant="h4">
                        Trending News
                    </Typography>

                </Container>
                <Container className={classes.container} >
                    <NewsGridList/>
                </Container>

            </div>


        </React.Fragment>
    );
}