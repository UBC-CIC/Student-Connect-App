import {EventCard} from "../components/Cards/EventCard";
import Container from "@material-ui/core/Container";
import {
    Button,
    ButtonGroup,
    Divider,
    FormControl,
    Input,
    InputAdornment,
    InputBase,
    InputLabel, Menu, MenuItem
} from "@material-ui/core";
import SortIcon from '@material-ui/icons/Sort';
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {connect} from "react-redux";
import defaultImg from '../assets/img/event_img.png'
import {array} from "prop-types";
const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    cardGrid: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    divider:{
        marginTop:'30px',
        marginBottom:'30px',

    },
    title:{
        fontWeight: 600,
        color:"#0055B7"

    },
    searchBar:{
        width:"70vw",
        color:"#0055B7",

    },
    buttonGroup:{
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },

    },
    button:{
        backgroundColor:"#0055B7",
        color:"white",
        textTransform:'none',
        float:'right',
        paddingLeft:"20px",
        paddingRight:"20px"

    },
    sortDropDown:{
        textTransform:'none',
    },
    grid:{
        display: 'flex'
    }


}));

function Events(props){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {allEvents} = props

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);

    };


    const sortOldToNew = () => {
        setAnchorEl(null);
        allEvents.sort(function(a, b) {
            var c = new Date(a.startDate);
            var d = new Date(b.startDate);
            return c-d

    })};
    const sortNewToOld = () => {
        setAnchorEl(null);
        allEvents.sort(function(a, b) {
            var c = new Date(a.startDate);
            var d = new Date(b.startDate);
            return d-c

        })};

    const classes = useStyles()

    const eventsList= allEvents.map((item)=>{
        if(item.fullImage==='false'){
            item.fullImage = defaultImg
        }
        return(
            <Grid item xs={12} sm={6} md={4} className={classes.grid}>
                <EventCard categories={item.categories}
                           startDate={item.startDate}
                           endDate={item.endDate}
                           title={item.title}
                           description={item.excerpt}
                           photo={item.fullImage}
                           link={item.link}
                           location={item.eventLocation.venue}
                           cost={item.cost}
                               />
            </Grid>

        )
    })
    return(
        <Container>

                <Typography align={'left'} variant="h4" className={classes.title}>
                    Events
                </Typography>
                <Typography align={'left'} variant="h6">
                    Check out all the events here
                </Typography>
                <Divider className={classes.divider}/>

    <Grid container spacing={1}>
                    {/*<Grid item md={8}>*/}
                    {/*    <Input*/}
                    {/*        id="input-with-icon-adornment"*/}
                    {/*        startAdornment={*/}
                    {/*            <InputAdornment position="start">*/}
                    {/*                <SearchIcon />*/}
                    {/*            </InputAdornment>*/}
                    {/*        }*/}
                    {/*        placeholder={"Search"}*/}
                    {/*        fullWidth*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                    {/*<Grid item md={2}>*/}
                    {/*    <Button className={classes.button}>*/}
                    {/*        Search*/}
                    {/*    </Button>*/}
                    {/*</Grid>*/}
                    <Grid item >
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
                            <MenuItem className={classes.sortDropDown} onClick={sortOldToNew}>Most recent</MenuItem>
                            <MenuItem className={classes.sortDropDown} onClick={sortNewToOld}>Least Recent</MenuItem>

                        </Menu>

                    </Grid>

                </Grid>

            <Grid container spacing={4} className={classes.cardGrid}>
                {eventsList}

                </Grid>
        </Container>

    )

}
const mapStateToProps = (state) => {
    return {
        allEvents: state.allEvents,
    };
};

export default connect(mapStateToProps)(Events);

