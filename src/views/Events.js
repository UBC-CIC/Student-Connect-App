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

function Events(){
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const classes = useStyles()
    return(
        <div>
        <Container>
                <Typography align={'left'} variant="h4" className={classes.title}>
                    Events
                </Typography>
                <Typography align={'left'} variant="h6">
                    Check out all the events here
                </Typography>
                <Divider className={classes.divider}/>
        </Container>
    <Container>

    <Grid container spacing={1}>
                    <Grid item md={8}>
                        <Input
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                            placeholder={"Search"}
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={2}>
                        <Button className={classes.button}>
                            Search
                        </Button>
                    </Grid>
                    <Grid item md={2}>


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
                            <MenuItem className={classes.sortDropDown} onClick={handleClose}>New to Old</MenuItem>
                            <MenuItem className={classes.sortDropDown} onClick={handleClose}>Old to New</MenuItem>
                        </Menu>

                    </Grid>

                </Grid>
    </Container>
            <Container>

            <Grid container spacing={4} className={classes.cardGrid}>
                    <Grid item xs={12} sm={6} md={4} className={classes.grid}>
                    <EventCard categories={['Category','Category']} title={"Event"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque eget ligula elementum ultrices. Duis pulvinar tincidunt est eu feugiat. Nam feugiat lacus eu maximus commodo. Lorem ipsum dolor sit"}
                               photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}
                 location={'Vancouver, BC'} date={'2021/05/29'} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} className={classes.grid}>
                        <EventCard title={"Cover Letter Workshop"} description={"Learn how to create and use your cover letter as a marketing tool to introduce yourself to employers."}
                                   photo={'https://events.cms.ok.ubc.ca/wp-content/uploads/sites/121/2021/05/CoverLetter-FBTwitter-1.jpg'}
                                   location={'Online'} date={'2021-06-07 12:00:00'} categories={['Workshop']} link={'https://events.ok.ubc.ca/event/cover-letter-workshop/'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} className={classes.grid}>
                        <EventCard categories={['Health']} title={"Okanagan Clinical Neurosciences Grand Rounds"}
                                   description={"The UBC Centre for Chronic Disease Prevention and Management (CCDPM) is pleased to present the Okanagan Clinical Neurosciences Grand Rounds in partnership with Interior Health."}
                                   photo={'https://events.cms.ok.ubc.ca/wp-content/uploads/sites/121/2021/02/Grand-Round-Series.png'}
                                   location={'Online'} date={'2021-06-04 08:00:00'}
                        link={'https://events.ok.ubc.ca/event/okanagan-clinical-neurosciences-grand-rounds-4/'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} className={classes.grid}>
                        <EventCard title={"Event"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque eget ligula elementum ultrices. Duis pulvinar tincidunt est eu feugiat. Nam feugiat lacus eu maximus commodo. Lorem ipsum dolor sit"}
                                   photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}
                                   location={'Vancouver, BC'} date={'2021/05/29'} categories={['Category']} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} className={classes.grid}>
                        <EventCard title={"Event"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque eget ligula elementum ultrices. Duis pulvinar tincidunt est eu feugiat. Nam feugiat lacus eu maximus commodo. Lorem ipsum dolor sit"}
                                   photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}
                                   location={'Vancouver, BC'} date={'2021/05/29'} categories={['Category']} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} className={classes.grid}>
                        <EventCard title={"Event"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque eget ligula elementum ultrices. Duis pulvinar tincidunt est eu feugiat. Nam feugiat lacus eu maximus commodo. Lorem ipsum dolor sit"}
                                   photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}
                                   location={'Vancouver, BC'} date={'2021/05/29'} categories={['Category']}/>
                    </Grid>

                </Grid>
            </Container>
        </div>


    )

}

export default Events