import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Divider} from "@material-ui/core";
import {HomePageNewsCard} from "../components/Cards/NewsCard";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import EventsCarousel from "../components/Carousel/EventsCarousel";
import ClubsCarousel from "../components/Carousel/ClubsCarousel";
import {fetchAllNews, fetchAllSportsNews, fetchNews, fetchSportsNews} from "../actions/newsActions";
import {fetchAllEvents, fetchEvents} from "../actions/eventsAction";
import {fetchAllBlogs, fetchBlogs} from "../actions/blogsAction";
import {fetchAllClubs, fetchClubs} from "../actions/clubAction";
import {getUserPreferenceAction} from "../actions/userAction";
import {listToString} from "../helpers/PreferenceListToString";
import {Auth} from "aws-amplify";
import AWS from "aws-sdk";
import {EventCard, HomeEventCard} from "../components/Cards/EventCard";
import defaultImg from "../assets/img/event_img.png";

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
        color:"#0055B7"
    },
    mostLikedTitle:{
        fontWeight: 600,
        color:"#ec407a"

    },
    grid:{
        display: 'flex'
    }

}));

function StarBorderIcon(props) {
    return null;
}

StarBorderIcon.propTypes = {className: PropTypes.any};
function Home(props) {
    const classes = useStyles();
    const {news,blogs,sportsNews,events} = props
    const newsList = news.map((item) => {
        return(
            <Grid item xs={12} sm={6} className={classes.grid}>
                <HomePageNewsCard title={item._source.title}
                                  categories={item._source.categories}
                                  photo={item._source.mediaThumbnail[0].url}
                                  link={item._source.link}
                                  description={item._source.summary}
                />
            </Grid>
        )
    });
    const sportsNewsList = sportsNews.map((item) => {
        return(
            <Grid item xs={12} sm={6} className={classes.grid}>
                <HomePageNewsCard title={item._source.title}
                                  categories={item._source.categories}
                                  link={item._source.link}
                                  description={item._source.summary}
                                  photo={item._source.mediaThumbnail}
                                  date={item._source.dateModified}
                />
            </Grid>
        )
    });

    const blogsList=blogs.map((item)=>{
        return(
            <Grid item xs={12} sm={6} className={classes.grid}>
            <HomePageNewsCard title={item._source.title}
                              categories={item._source.categories}
                              link={item._source.link}
                              description={item._source.excerpt}
                              photo={item._source.mediaImages.mediumImage}
            />
            </Grid>

        )
    })
    const eventList=events.map((item)=>{
        if(item._source.cost===''){
            item._source.cost = "Free"
        }

        return(
            <Grid item xs={12} sm={6} className={classes.grid}>

            <EventCard title={item._source.title}
                           categories={item._source.categories}
                           link={item._source.link}
                           location={item._source.eventLocation.venue}
                           photo={item._source.fullImage[0]}
                           description={item._source.excerpt}
                           startDate={item._source.startDate}
                           endDate={item._source.endDate}
                           cost={item._source.cost}
            />
            </Grid>

        )
    })

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
                    {newsList}
                    {sportsNewsList}
                </Grid>
                <Divider className={classes.divider}/>

                <Typography align={'left'} variant="h4" className={classes.forYouTitle}>
                    Events
                </Typography>
                <Grid container spacing={4} >

                {eventList}
                </Grid>
                </Container>
            <Container maxWidth={'xl'}>
                <Divider className={classes.divider}/>

                <Typography align={'left'} variant="h4" className={classes.forYouTitle}>
                    Student life blogs
                </Typography>
                <Grid container spacing={3}>

                    {blogsList}
                </Grid>
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

const mapStateToProps = (state) => {
    return {
        news: state.news,
        blogs:state.blogs,
        userPreference: state.userPreference,
        currentUser:state.currentUser,
        sportsNews:state.sportsNews,
        events: state.events,

    };
};


export default connect(mapStateToProps, null)(Home);
