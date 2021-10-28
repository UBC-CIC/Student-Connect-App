import React from 'react';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as PropTypes from "prop-types";
import {connect} from "react-redux";
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
                    <Typography align={'left'} variant="h5">
                        Explore your personalized recommendations and recently posted items here 
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
