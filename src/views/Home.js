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
import {Divider, GridList, GridListTile, GridListTileBar, Paper} from "@material-ui/core";
import {HomePageNewsCard} from "../components/Cards/NewsCard";
import {HomeEventCard} from "../components/Cards/EventCard";
import IconButton from "@material-ui/core/IconButton";
import * as PropTypes from "prop-types";
import {EventGridList, NewsGridList} from "../components/GridList/GridList";
import {NewsCarousel, Item, ClubsCarousel, BlogsCarousel} from '../components/Carousel/carousel'
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
    recommandationContainer: {
        // backgroundColor: '#0055B7',
        // borderRadius: '25px',
},
    divider:{
        marginTop:'30px',
        marginBottom:'30px',

    },
    forYouTitle:{
        fontWeight: 600,
        color:"#00A7E1"
    },
    mostLikedTitle:{
        fontWeight: 600,
        color:"#ec407a"

    }

}));

function StarBorderIcon(props) {
    return null;
}

StarBorderIcon.propTypes = {className: PropTypes.any};
export default function Home() {
    const classes = useStyles();

    return (
        <React.Fragment>


            <Container maxWidth={'xl'} >
                <Typography align={'left'} variant="h4" className={classes.forYouTitle}>
                    For You
                </Typography>
                <Typography align={'left'} variant="h6">
                    Recommendations based on your personalized content tags
                </Typography>
                <Divider className={classes.divider}/>
                <Typography align={'left'} variant="h4" className={classes.forYouTitle}>
                    News
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <HomePageNewsCard categories={['Category','Category']} date={'date'} title={'News title'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <HomePageNewsCard title={'Parental consumption shapes how teens think about and use cannabis'}
                                          photo={'https://news.ok.ubc.ca/wp-content/uploads/2021/05/cannabis-1200-225x225.jpg'}
                                          link={'https://news.ok.ubc.ca/?p=19214'}
                                          date={'May 19, 2021'} categories={['Health','Irving K. Barber Faculty of Arts and Social Sciences','Psychology']}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <HomePageNewsCard title={'UBCO student receives gift of a lifetime from younger sibling'}
                                          photo={'https://news.ok.ubc.ca/wp-content/uploads/2021/05/nursing-bros-770-225x225.jpg'}
                                        link={'https://news.ok.ubc.ca/?p=19201'}
                                          date={'May 12, 2021'} categories={['Health','School of Nursing',' Aboriginal',' Faculty of Health and Social Development']}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <HomePageNewsCard title={'UBC invites wine lovers to learn and wine taste virtually'}
                                          photo={'https://news.ok.ubc.ca/wp-content/uploads/2021/05/wine-770-225x225.jpg'}
                                link = 'https://news.ok.ubc.ca/?p=19227' categories={['Health','Chemistry']}
                        date={'May 26, 2021'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <HomePageNewsCard title={'No time to exercise? No problem, says UBCO researcher'}
                                          photo={'https://news.ok.ubc.ca/wp-content/uploads/2021/05/jonathan-little-770-225x225.jpg'}
                        link={'https://news.ok.ubc.ca/2021/05/20/no-time-to-exercise-no-problem-says-ubco-researcher/'}
                                          categories={['Health','Research','School of Health and Exercise']}
                        date={'May 20, 2021'}/>
                    </Grid>
                </Grid>
                <Divider className={classes.divider}/>

                <Typography align={'left'} variant="h4" className={classes.forYouTitle}>
                    Events
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3} >
                        <HomeEventCard categories={['Category','Category']} title={"Event"} date={'2021/05/20'} location={"Vancouver, BC"} photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}/>

                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <HomeEventCard categories={['Category','Category']} title={"Event"} date={'2021/05/20'} location={"Vancouver, BC"}  photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <HomeEventCard categories={['Category','Category']} title={"Event"} date={'2021/05/20'} location={"Vancouver, BC"}  photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <HomeEventCard  categories={['Category','Category']} title={"Event"} date={'2021/05/20'} location={"Vancouver, BC"} photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}/>
                    </Grid>
                </Grid>
                </Container>
            <Container maxWidth={'xl'}>
                <Divider className={classes.divider}/>

                <Typography align={'left'} variant="h4" className={classes.forYouTitle}>
                    Student life blogs
                </Typography>
                <BlogsCarousel/>
            </Container>

            <Container maxWidth={"xl"}>
                <Divider className={classes.divider}/>
                <Typography align={'left'} variant="h4" className={classes.forYouTitle}>
                    Event's that you liked
                </Typography>
                <EventGridList/>
            </Container>
            <Divider className={classes.divider}/>
            <Container maxWidth={"xl"}>
                <Typography align={'left'} variant="h4" className={classes.forYouTitle}>
                    Clubs
                </Typography>
                <ClubsCarousel/>
            </Container>

        </React.Fragment>
    );
}