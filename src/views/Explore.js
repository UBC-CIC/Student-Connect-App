import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Divider} from "@material-ui/core";
import {BigNewsCard} from "../components/Cards/NewsCard";
import {HomeEventCard} from "../components/Cards/EventCard";
import * as PropTypes from "prop-types";
import {EventGridList} from "../components/GridList/GridList";
import {NewsCarousel} from '../components/Carousel/Carousel'

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
    mostLikedTitle:{
        fontWeight: 600,
        color:"#0055B7"
    }

}));

function StarBorderIcon(props) {
    return null;
}

StarBorderIcon.propTypes = {className: PropTypes.any};
export default function Explore() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Container maxWidth={'xl'} >

            <Typography align={'left'} variant="h4" className={classes.mostLikedTitle}>
                Trending
            </Typography>
            <Typography align={'left'} variant="h6">
                The most popular contents from your community
            </Typography>

            <Divider className={classes.divider}/>
            <Typography align={'left'} variant="h4" className={classes.mostLikedTitle}>
                News
            </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} >
                        <BigNewsCard title={'Keeping up with the charge to develop better batteries\n\n'}
                                     photo={'https://news.ok.ubc.ca/wp-content/uploads/2021/03/Jian-Liu-770.jpg'}
                                     link={'https://news.ok.ubc.ca/2021/03/16/keeping-up-with-the-charge-to-develop-better-batteries/'}
                                     date={'March 16, 2021'} categories={['Research','Battery'] }
                                     excerpts={"With increasing global efforts to adopt clean energy, developing sustainable storage systems has become a major challenge in getting electric vehicles on the road and integrating intermittent renewable energy resources into the grid."}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <BigNewsCard title={'UBCO researcher uses geology to help astronomers find habitable planets\n'}
                                          photo={'https://news.ok.ubc.ca/wp-content/uploads/2021/04/earth-770.jpg'}
                                          link={'https://news.ok.ubc.ca/2021/05/04/ubco-researcher-uses-geology-to-help-astronomers-find-habitable-planets/'}
                                          date={'May 24, 2021'} categories={['Research','Astronomy'] }
                             excerpts={"Astronomers have identified more than 4,000, and counting, confirmed exoplanets — planets orbiting stars other than the sun — but only a fraction have the potential to sustain life."}
                                     />
                    </Grid>
                    <Grid item xs={12}>
                        <NewsCarousel/>

                    </Grid>

                    </Grid>
            <Divider className={classes.divider}/>
            <Typography align={'left'} variant="h4" className={classes.mostLikedTitle}>
                Events
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={3} >
                    <HomeEventCard categories={['Category','Category']} title={"Event"} date={'2021/05/20'} location={"Vancouver, BC"} photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}/>

                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <HomeEventCard categories={['Category','Category']} title={"Event"} date={'2021/05/20'} location={"Vancouver, BC"}  photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}/>
                </Grid>

            </Grid>
            <Divider className={classes.divider}/>
            <Typography align={'left'} variant="h4" className={classes.mostLikedTitle}>
                Student life blogs
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} >
                    <BigNewsCard title={'5 ways to improve your exam prep'}
                                 photo={'https://students.ok.ubc.ca/wp-content/uploads/sites/90/2020/10/exam-prep-blog-header.jpg'}
                                 link={'https://students.ok.ubc.ca/2020/12/02/5-ways-to-improve-your-exam-prep/'}
                                 date={'December 2, 2020'} categories={['Study','Academics'] }
                                 excerpts={"Don’t stay up all night cramming for an exam. Start early with these tips to improve your exam prep."}/>

                </Grid>
                <Grid item xs={12} sm={6} >
                    <BigNewsCard title={'What I wish I’d known when I transferred to UBCO'}
                                 photo={'https://students.ok.ubc.ca/wp-content/uploads/sites/90/2021/04/blog-header.jpg'}
                                 link={'https://students.ok.ubc.ca/2021/04/16/what-i-wish-id-known-when-i-transferred-to-ubco/'}
                                 date={'April 16, 2021'} categories={['New Student','Life'] }
                                 excerpts="A transfer student shares her experience coming to UBCO, and some dos and don’ts to help you ease your transition to a new campus."/>
                </Grid>
            </Grid>
            </Container>


        </React.Fragment>
    );
}