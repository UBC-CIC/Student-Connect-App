import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import BookIcon from "@material-ui/icons/Book";
import Grid from "@material-ui/core/Grid";
import {HomePageNewsCard} from "../Cards/NewsCard";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball';
import {Button, Menu, MenuItem} from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import Container from "@material-ui/core/Container";

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

}));

export default function NewsBlogsTab(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);

    };

    const {allNews,allBlogs,allSportsNews} = props
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
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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

    const sportsNewsList=allSportsNews.map((item)=>{
        return(
            <Grid item xs={12} sm={6} className={classes.grid}>
                <HomePageNewsCard title={item.title}
                                  categories={item.categories}
                                  link={item.link}
                                  description={item.summary}
                                  photo={item.mediaThumbnail}
                                  date={item.dateModified}
                />
            </Grid>

        )
    })


    const sortOldToNew = () => {
        setAnchorEl(null);
        switch (value){
            case 0:
                allNews.sort(function(a, b) {
                    return new Date(a.dateModified)-new Date(b.dateModified)

                })
                break
            case 1:
                allSportsNews.sort(function(a, b) {
                    return new Date(a.dateModified)-new Date(b.dateModified)
                })
                break
            default:
                break

        }
    }
    const sortNewToOld = () => {
        setAnchorEl(null);
        switch (value){
            case 0:
                allNews.sort(function(a, b) {
                    return new Date(b.dateModified)-new Date(a.dateModified)
                })
                break
            case 1:
                allSportsNews.sort(function(a, b) {
                    return new Date(b.dateModified)-new Date(a.dateModified)
                })
                break
            default:
                break

        }
    }

    return (
        <div className={classes.root}>
<Container>

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
                    <Tab icon={<SportsBasketballIcon/>}label="Sports News" {...a11yProps(1)} />
                    <Tab icon={<BookIcon/>}label="Student Life Blogs" {...a11yProps(2)} />

                </Tabs>
            </AppBar>
            {(value===0||value===1) ?
                <div>
                <Button startIcon={<SortIcon />} className={classes.button} aria-haspopup="true" onClick={handleClick} >
                    Sort By
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}

                >
                    <MenuItem className={classes.sortDropDown} onClick={() => sortNewToOld()}>Most recent</MenuItem>
                    <MenuItem className={classes.sortDropDown} onClick={() => sortOldToNew()}>Least Recent</MenuItem>
                </Menu>
                </div>
                : null}
</Container>

            <TabPanel value={value} index={0}>
                <Grid container spacing={3} alignItems="stretch">
                    {newsList}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container spacing={3} alignItems="stretch">
                    {sportsNewsList}

                </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Grid container spacing={3} alignItems="stretch">
                    {blogList}
                </Grid>
            </TabPanel>


        </div>
    );
}
