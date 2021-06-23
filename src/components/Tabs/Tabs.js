import React from 'react';
import PropTypes, {func} from 'prop-types';
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
import {clubCategories} from "../../assets/ClubCategories";
import {connect} from "react-redux";
import ClubCard from "../Cards/ClubCard";
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


function ClubsTabs(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const {allClubs} = props
    const [currentCategory,setCurrentCategory] = React.useState("Academics");
    const currentClubs = allClubs.filter((item => item.categories.includes(currentCategory)))
    console.log(allClubs)


    const clubsList=currentClubs.map((item)=>{
        return(
            <Grid item xs={12}>
                <ClubCard title={item.title} categories={item.categories}
                          description={item.description}
                          logo={item.imageLink }
                          facebook={item.facebook}
                          twitter={item.twitter}
                          email={item.email}
                          website={item.website}
                />
            </Grid>
        )
    })

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const getCategories = (index) =>{
        setCurrentCategory(index)
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.tabBar}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="white"
                    variant="scrollable"
                    scrollButtons="auto"
                    classes={{
                        indicator: classes.indicator
                    }}>

                >
                    {clubCategories.map((option,index)=>
                        <Tab label={option} {...a11yProps(index)} onClick={()=>getCategories(option)} />

                    )}

                </Tabs>
            </AppBar>
            <Container >
                <Grid container spacing={4}>
                    {clubsList}
                </Grid>
            </Container>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        allClubs: state.allClubs,
    };
};

export default connect(mapStateToProps)(ClubsTabs);
