import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import ClubsCarousel from "../../components/Carousel/ClubsCarousel";
import React from "react";
import { EventCard } from "../../components/Cards/EventCard";
import { makeStyles, withStyles } from "@material-ui/core/styles";
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
  divider: {
    marginTop: "30px",
    marginBottom: "30px",
  },
  textMargin: {
    marginTop: "30px",
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
  contentLink: {
    borderBottom: "1px solid"
  }
}));

const CardsGrid = withStyles({
  root: {
      marginTop: "30px",
      marginBottom: "12px"
  }
})(Grid);

export default function ForYouPanel(props) {
  const { news, blogs, sportsNews, events, tabChange} = props;
  const classes = useStyles();

  const newsList = news.map((item, index) => {
    return (
      <Grid item xs={12} sm={6} className={classes.grid} key={`news-${index}`}>
        <HomePageNewsCard
          title={item._source.title}
          categories={item._source.categories}
          photo={item._source.mediaThumbnail ? item._source.mediaThumbnail[0] ? item._source.mediaThumbnail[0].url : "" : ""}
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
      <Container maxWidth={"xl"}>
        <Typography align={"left"} variant="h4" className={classes.forYouTitle}>
          News
        </Typography>
      </Container>
      <Container>
        {(news.length === 0 && sportsNewsList.length === 0) ? (
            <div className={classes.textMargin}>
          <Typography variant={"h6"}>
            Sorry, there are currently no news that match your preferences.
            Please make sure your preferences are up to date.
            <br/>
            In the meanwhile, you can <Link className={classes.contentLink} to='/news'>check out news here</Link> or under the <a className={classes.contentLink} href='#' onClick={()=>tabChange(null, 1)}>RECENT</a> tab.
          </Typography>
          </div>
        ) : (
          <CardsGrid container spacing={3}>
            {newsList}
            {sportsNewsList}
          </CardsGrid>
        )}
      </Container>

      <Container maxWidth={"xl"}>
        <Divider className={classes.divider} />

        <Typography align={"left"} variant="h4" className={classes.forYouTitle}>
          Events
        </Typography>
      </Container>
      <Container>
        {events.length === 0 ? (
            <div>
            <Typography variant={"h6"} className={classes.textMargin}>
                Sorry, there are currently no events that match your preferences.
                Please make sure your preferences are up to date.
                <br/>
                In the meanwhile, you can <Link className={classes.contentLink} to='/events'>check out events here</Link> or under the <a className={classes.contentLink} href='#' onClick={()=>tabChange(null, 1)}>RECENT</a> tab.
            </Typography>
            </div>
        ) : (
          <CardsGrid container spacing={4}>
            {eventList}
          </CardsGrid>
        )}
      </Container>

      <Container maxWidth={"xl"}>
        <Divider className={classes.divider} />

        <Typography align={"left"} variant="h4" className={classes.forYouTitle}>
          Student Life Blogs
        </Typography>
      </Container>
      <Container>
        {blogs.length === 0 ? (
          <div>
            <Typography variant={"h6"} className={classes.textMargin}>
              Sorry, there are currently no blogs that match your preferences.
              Please make sure your preferences are up to date.
              <br/>
              In the meanwhile, you can <a className={classes.contentLink} href='#' onClick={()=>tabChange(null, 1)}>check out Student Life Blogs under the RECENT tab</a>.
            </Typography>
          </div>
        ) : (
          <CardsGrid container spacing={4}>
            {blogsList}
          </CardsGrid>
        )}
      </Container>

      <Container maxWidth={"xl"}>
        <Divider className={classes.divider} />
        <Typography align={"left"} variant="h4" className={classes.forYouTitle}>
          Clubs
        </Typography>
      </Container>
      <Container>
        <ClubsCarousel />
      </Container>
    </Grid>
  );
}
