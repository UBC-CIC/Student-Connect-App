import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import BookIcon from "@material-ui/icons/Book";
import Grid from "@material-ui/core/Grid";
import {BigNewsCard, HomePageNewsCard} from "../Cards/NewsCard";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

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
    grid:{
        display: 'flex'
    }
}));

export default function NewsBlogsTab(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const {allNews,allBlogs} = props

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log(allNews)
    const newsList= allNews.map((item)=>{
        return(
            <Grid item xs={12} sm={6} className={classes.grid}>
                <HomePageNewsCard title={item.title}
                                  categories={item.categories}
                                  link={item.link}
                                  description={item.summary}
                                  photo={item.mediaThumbnail[0].url}
                                  date={item.dateModified}
                />
            </Grid>

        )
    })
    console.log(allBlogs)
    const blogList=allBlogs.map((item)=>{
        return(
            <Grid item xs={12} sm={6} className={classes.grid}>
                <HomePageNewsCard title={item.title}
                                  categories={item.categories}
                                  link={item.link}
                                  description={item.excerpt}
                                  photo={item.mediaImages.mediumImage}
                />
            </Grid>

        )

    })

    return (
        <div className={classes.root}>

            <AppBar position="static" className={classes.tabBar}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="white"
                    aria-label="icon label tabs example"
                    classes={{
                        indicator: classes.indicator
                    }}>
                    >
                    <Tab icon={<RssFeedIcon/>}label="News" {...a11yProps(0)}  />
                    <Tab icon={<BookIcon/>}label="Student Life Blogs" {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Grid container spacing={3} alignItems="stretch">
                    {newsList}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container spacing={3} alignItems="stretch">
                    {blogList}
                </Grid>
            </TabPanel>
        </div>
    );
}