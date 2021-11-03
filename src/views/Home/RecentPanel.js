import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Divider, withStyles} from "@material-ui/core";
import Container from "@material-ui/core/Container";
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
    divider:{
        marginTop:'42px', // 30+12
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

const TitleContainer = withStyles({
    root: {
        marginBottom: "30px"
    }
})(Container);
export default function RecentPanel(props){
    const {allNews,allEvents,allBlogs} = props
    const classes = useStyles();



    const recentNewsList=allNews.slice(0, 6).map((item, index) => {
        return(
            <Grid item xs={12} sm={6} md={6} className={classes.grid} key={`recent-news-${index}`}>
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
    const recentEventList=allEvents.slice(0,6).map((item, index)=>{
        return(

            <Grid item xs={12} sm={6} md={4} className={classes.grid} key={`recent-event-${index}`}>
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
    const recentBlogsList=allBlogs.slice(0, 6).map((item, index) => {
        return(
            <Grid item xs={12} sm={6} md={6} className={classes.grid} key={`recent-blogs-${index}`}>
                <HomePageNewsCard title={item.title}
                                  categories={item.categories}
                                  link={item.link}
                                  description={item.excerpt}
                                  photo={item.mediaImages.mediumImage}
                                  date={item.dateModified}

                />
            </Grid>
        )
    });

    return(
        <Grid container spacing={1} alignItems="stretch">

            <TitleContainer maxWidth={'xl'}>
                <Typography align={'left'} variant="h4" className={classes.forYouTitle}>
                    News
                </Typography>
            </TitleContainer>

            <Container maxWidth={'xl'}>
                <Grid container spacing={3}>
                    {recentNewsList}
                </Grid>
            </Container>

            <TitleContainer maxWidth={'xl'}>
                <Divider className={classes.divider}/>

                <Typography align={'left'} variant="h4" className={classes.forYouTitle}>
                    Events
                </Typography>
            </TitleContainer>

            <Container maxWidth={'xl'}>
                <Grid container spacing={4}>
                    {recentEventList}
                </Grid>
            </Container>

            <TitleContainer maxWidth={'xl'}>
                <Divider className={classes.divider}/>

                <Typography align={'left'} variant="h4" className={classes.forYouTitle}>
                    Student Life Blogs
                </Typography>
            </TitleContainer>

            <Container maxWidth={'xl'}>
                <Grid container spacing={4}>
                    {recentBlogsList}
                </Grid>
            </Container>
        </Grid>

    )
}