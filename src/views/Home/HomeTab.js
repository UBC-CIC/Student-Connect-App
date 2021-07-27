import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ForYouPanel from "./ForYouPanel";
import RecentPanel from "./RecentPanel";
import HomeIcon from '@material-ui/icons/Home';

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

export default function HomeTab(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const {news,blogs,sportsNews,events,allNews,allEvents,allBlogs,allClubs} = props
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


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
                        <Tab icon={<HomeIcon/>}label="For you" {...a11yProps(0)}  />
                        <Tab icon={<RssFeedIcon/>} label="Recent" {...a11yProps(1)} />

                    </Tabs>
                </AppBar>
            </Container>


            <TabPanel value={value} index={0}>
                <ForYouPanel events={events} sportsNews={sportsNews} news={news} blogs={blogs}/>
            </TabPanel>



            <TabPanel value={value} index={1}>
                <RecentPanel allNews={allNews} allEvents={allEvents} allBlogs={allBlogs}/>
            </TabPanel>


        </div>
    );
}
