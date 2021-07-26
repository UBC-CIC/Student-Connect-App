import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Divider} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import ClubsCarousel from "../../components/Carousel/ClubsCarousel";
import React from "react";
import {EventCard} from "../../components/Cards/EventCard";
import {makeStyles} from "@material-ui/core/styles";
import {HomePageNewsCard} from "../../components/Cards/NewsCard";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    tabBar:{
        background: '#0055B7',

    },
    indicator:{
        backgroundColor:"#6EC4E8"

    },
    button:{
        backgroundColor:"#0055B7",
        color:"white",
        textTransform:'none',
        float:'left',
        paddingLeft:"20px",
        paddingRight:"20px",
        marginTop: '20px'

    },
    sortDropDown:{
        textTransform:'none',
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

export default function RecentPanel(props){
    const {allNews,allEvents,allBlogs} = props
    const classes = useStyles();



    const recentNewsList=allNews.slice(0, 6).map((item) => {
        return(
            <Grid item xs={12} sm={6} md={6} className={classes.grid}>
                <HomePageNewsCard title={item.title}
                                  categories={item.categories}
                                  link={item.link}
                                  description={item.summary}
                                  photo={item.mediaThumbnail[0].url}
                                  date={item.dateModified}
                />
            </Grid>
        )
    });
    const recentEventList=allEvents.slice(0,6).map((item)=>{
        return(

            <Grid item xs={12} sm={6} md={4} className={classes.grid}>
            <EventCard categories={item.categories}
                       startDate={item.startDate}
                       endDate={item.endDate}
                       title={item.title}
                       description={item.excerpt}
                       photo={item.fullImage[0]}
                       link={item.link}
                       location={item.eventLocation.venue}
                       cost={item.cost}
            />
        </Grid>
        )

    })
    const recentBlogsList=allBlogs.slice(0, 6).map((item) => {
        return(
            <Grid item xs={12} sm={6} md={6} className={classes.grid}>
                <HomePageNewsCard title={item.title}
                                  categories={item.categories}
                                  link={item.link}
                                  description={item.excerpt}
                                  photo={item.mediaImages.mediumImage}
                />
            </Grid>
        )
    });

    return(
        <Grid container spacing={3} alignItems="stretch">

            <Grid container spacing={3} alignItems="stretch">
                <Container maxWidth={'xl'}>

                <Typography align={'left'} variant="h6"className={classes.divider} >
                    Most recent items
                </Typography>
                    <Divider className={classes.divider}/>

                </Container>
                <Container maxWidth={'xl'}>

                <Typography align={'left'} variant="h4" className={classes.forYouTitle}>
                    News
                </Typography>
                </Container>
                <Container maxWidth={'xl'}>

                <Grid container spacing={3}>
                    {recentNewsList}
                </Grid>
                </Container>

                <Container maxWidth={'xl'}>
                    <Divider className={classes.divider}/>

                    <Typography align={'left'} variant="h4" className={classes.forYouTitle}>
                    Events
                </Typography>
                </Container>
                <Container maxWidth={'xl'}>

                <Grid container spacing={4}>
                    {recentEventList}
                </Grid>
                </Container>
            </Grid>

            <Container maxWidth={'xl'}>
                <Divider className={classes.divider}/>

                <Typography align={'left'} variant="h4" className={classes.forYouTitle}>
                    Student life blogs
                </Typography>

                <Grid container spacing={4}>
                    {recentBlogsList}

                </Grid>

            </Container>
        </Grid>

    )
}