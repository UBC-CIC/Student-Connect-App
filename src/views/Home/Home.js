import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Divider} from "@material-ui/core";
import {HomePageNewsCard} from "../../components/Cards/NewsCard";
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
import EventsCarousel from "../../components/Carousel/EventsCarousel";
import ClubsCarousel from "../../components/Carousel/ClubsCarousel";
import {fetchAllNews, fetchAllSportsNews, fetchNews, fetchSportsNews} from "../../actions/newsActions";
import {fetchAllEvents, fetchEvents} from "../../actions/eventsAction";
import {fetchAllBlogs, fetchBlogs} from "../../actions/blogsAction";
import {fetchAllClubs, fetchClubs} from "../../actions/clubAction";
import {getUserPreferenceAction} from "../../actions/userAction";
import {listToString} from "../../helpers/PreferenceListToString";
import {Auth} from "aws-amplify";
import AWS from "aws-sdk";
import {EventCard, HomeEventCard} from "../../components/Cards/EventCard";
import defaultImg from "../../assets/img/event_img.png";
import HomeTab from "./HomeTab";

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
    const {news,blogs,sportsNews,events,allNews,allEvents,allBlogs,allClubs} = props



    return (
        <React.Fragment>


            <Container maxWidth={'xl'} >
                <Container>
                <Typography align={'left'} variant="h4" className={classes.forYouTitle}>
                    Home
                </Typography>
                </Container>
                <HomeTab news={news} blogs={blogs} sportsNews={sportsNews}
                events={events} allClubs={allClubs} allNews={allNews} allEvents={allEvents}
                allBlogs={allBlogs}/>
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
        allClubs:state.allClubs,
        allNews:state.allNews,
        allEvents:state.allEvents,
        allBlogs:state.allBlogs

    };
};


export default connect(mapStateToProps, null)(Home);
