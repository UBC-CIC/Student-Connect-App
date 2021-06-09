import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {BigNewsCard, HomePageNewsCard} from "../Cards/NewsCard";
import Container from "@material-ui/core/Container";
import RssFeedIcon from "@material-ui/icons/RssFeed";
import BookIcon from '@material-ui/icons/Book';
import Grid from "@material-ui/core/Grid";
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

    }
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                    </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
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
            </TabPanel>
        </div>
    );
}

