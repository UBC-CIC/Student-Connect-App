import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Divider} from "@material-ui/core";
import {HomePageNewsCard} from "../components/Cards/NewsCard";
import * as PropTypes from "prop-types";
import {EventGridList, NewsGridList} from "../components/GridList/GridList";
import {ClubsCarousel} from '../components/Carousel/Carousel'
import { connect } from "react-redux";
import EventsCarousel from "../components/Carousel/EventsCarousel";
import BlogsCarousel from "../components/Carousel/BlogsCarousel";
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
    const {news} = props
    console.log(news)
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
                </Grid>
                <Divider className={classes.divider}/>

                <Typography align={'left'} variant="h4" className={classes.forYouTitle}>
                    Events
                </Typography>
                <EventsCarousel/>
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

const mapStateToProps = (state) => {
    return {
        news: state.news,
    };
};

export default connect(mapStateToProps)(Home);
