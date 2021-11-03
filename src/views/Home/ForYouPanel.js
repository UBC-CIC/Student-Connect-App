import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Divider, withStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import ClubsCarousel from "../../components/Carousel/ClubsCarousel";
import React from "react";
import { EventCard } from "../../components/Cards/EventCard";
import { makeStyles } from "@material-ui/core/styles";
import { HomePageNewsCard } from "../../components/Cards/NewsCard";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tabBar: {
    background: "#0055B7",
  },
  indicator: {
    backgroundColor: "#6EC4E8",
  },
  button: {
    backgroundColor: "#0055B7",
    color: "white",
    textTransform: "none",
    float: "left",
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "20px",
  },
  sortDropDown: {
    textTransform: "none",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    paddingLeft: theme.spacing(10),
  },
  container: {
    paddingLeft: theme.spacing(10),
  },
  recommandationContainer: {
    // backgroundColor: '#0055B7',
    // borderRadius: '25px',
  },
  divider: {
    marginTop: "30px",
    marginBottom: "30px",
  },
  forYouTitle: {
    fontWeight: 600,
    color: "#0055B7",
  },
  mostLikedTitle: {
    fontWeight: 600,
    color: "#ec407a",
  },
  grid: {
    display: "flex",
  },
}));

const TitleContainer = withStyles({
  root: {
      marginBottom: "30px"
  }
})(Container);

export default function ForYouPanel(props) {
  const { news, blogs, sportsNews, events, tabChange} = props;
  const classes = useStyles();

  const newsList = news.map((item, index) => {
    return (
      <Grid item xs={12} sm={6} className={classes.grid} key={`news-${index}`}>
        <HomePageNewsCard
          title={item._source.title}
          categories={item._source.categories}
          photo={item._source.mediaThumbnail[0].url}
          link={item._source.link}
          description={item._source.summary}
        />
      </Grid>
    );
  });
  const sportsNewsList = sportsNews.map((item, index) => {
    return (
      <Grid item xs={12} sm={6} className={classes.grid} key={`sportnews-${index}`}>
        <HomePageNewsCard
          title={item._source.title}
          categories={item._source.categories}
          link={item._source.link}
          description={item._source.summary}
          photo={item._source.mediaThumbnail}
        />
      </Grid>
    );
  });

  const eventList = events.map((item, index) => {
    if (item._source.cost === "") {
      item._source.cost = "Free";
    }

    return (
      <Grid item xs={12} sm={6} className={classes.grid} key={`event-${index}`}>
        <EventCard
          title={item._source.title}
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
    );
  });
  const blogsList = blogs.map((item, index) => {
    return (
      <Grid item xs={12} sm={6} className={classes.grid} key={`blog-${index}`}>
        <HomePageNewsCard
          title={item._source.title}
          categories={item._source.categories}
          link={item._source.link}
          description={item._source.excerpt}
          photo={item._source.mediaImages.mediumImage}
        />
      </Grid>
    );
  });

  return (
    <Grid container spacing={1} alignItems="stretch">
      <TitleContainer maxWidth={"xl"}>
        <Typography align={"left"} variant="h4" className={classes.forYouTitle}>
          News
        </Typography>
      </TitleContainer>
      <Container>
        <Grid container spacing={3}>
          {newsList}
          {sportsNewsList}
        </Grid>

        {news.length === 0 && sportsNewsList.length === 0 && (
            <div className={classes.divider}>
          <Typography variant={"h6"}>
            Sorry, there are currently no news that match your preference.
            Please make sure your preferences are up to date.
            <br/>
            In the meanwhile, you can check out news <Link to='/news'>here</Link> or under the <a href='#' onClick={()=>tabChange(null, 1)}>RECENT</a> tab.
          </Typography>
          </div>
        )}
      </Container>

      <TitleContainer maxWidth={"xl"}>
        <Divider className={classes.divider} />

        <Typography align={"left"} variant="h4" className={classes.forYouTitle}>
          Events
        </Typography>
      </TitleContainer>
      <Container>
        <Grid container spacing={4}>
          {eventList}
        </Grid>

        {events.length === 0 && (
            <div>
            <Typography variant={"h6"} className={classes.divider}>
                Sorry, there are currently no events that match your preferences.
                Please make sure your preferences are up to date.
                <br/>
                In the meanwhile, you can check out events <Link to='/events'>here</Link> or under the <a href='#' onClick={()=>tabChange(null, 1)}>RECENT</a> tab.
            </Typography>
            </div>
        )}
      </Container>

      <TitleContainer maxWidth={"xl"}>
        <Divider className={classes.divider} />

        <Typography align={"left"} variant="h4" className={classes.forYouTitle}>
          Student Life Blogs
        </Typography>
      </TitleContainer>
      <Container>
        <Grid container spacing={4}>
          {blogsList}
        </Grid>

        {blogs.length === 0 && (
          <div>
            <Typography variant={"h6"} className={classes.divider}>
              Sorry, there are currently no blogs that match your preference.
              Please make sure your preferences are up to date.
              <br/>
              In the meanwhile, you can check out Student Life Blogs under the <a href='#' onClick={()=>tabChange(null, 1)}>RECENT</a> tab.
            </Typography>
          </div>
        )}
      </Container>
      <TitleContainer maxWidth={"xl"}>
        <Divider className={classes.divider} />
        <Typography align={"left"} variant="h4" className={classes.forYouTitle}>
          Clubs
        </Typography>
      </TitleContainer>
      <Container>
        <ClubsCarousel />
      </Container>
    </Grid>
  );
}
