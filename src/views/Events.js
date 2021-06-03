import {EventCard} from "../components/Cards/EventCard";
import Container from "@material-ui/core/Container";
import {FormControl, Input, InputAdornment, InputBase, InputLabel} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";

function Events(){
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
        divider: {
            height: 28,
            margin: 4,
        },
        cardGrid: {
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
            paddingLeft: theme.spacing(10),
            paddingRight: theme.spacing(10)

        },

    }));
    const classes = useStyles()
    return(
        <div>
            <h1>Events</h1>
            <Container>
                <FormControl >
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                        placeholder={"Search"}
                    />
                </FormControl>
            </Container>
            <Container className={classes.cardGrid}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                    <EventCard title={"Event"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque eget ligula elementum ultrices. Duis pulvinar tincidunt est eu feugiat. Nam feugiat lacus eu maximus commodo. Lorem ipsum dolor sit"}
                               photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}
                 location={'Vancouver, BC'} date={'2021/05/29'} category={'Music'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <EventCard title={"Cover Letter Workshop"} description={"Learn how to create and use your cover letter as a marketing tool to introduce yourself to employers."}
                                   photo={'https://events.cms.ok.ubc.ca/wp-content/uploads/sites/121/2021/05/CoverLetter-FBTwitter-1.jpg'}
                                   location={'Online'} date={'2021-06-07 12:00:00'} category={'College of Graduate Studies'} link={'https://events.ok.ubc.ca/event/cover-letter-workshop/'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <EventCard title={"Okanagan Clinical Neurosciences Grand Rounds"}
                                   description={"The UBC Centre for Chronic Disease Prevention and Management (CCDPM) is pleased to present the Okanagan Clinical Neurosciences Grand Rounds in partnership with Interior Health."}
                                   photo={'https://events.cms.ok.ubc.ca/wp-content/uploads/sites/121/2021/02/Grand-Round-Series.png'}
                                   location={'Online'} date={'2021-06-04 08:00:00'} category={'Research and Innovation, Office of the Vice-Principal'}
                        link={'https://events.ok.ubc.ca/event/okanagan-clinical-neurosciences-grand-rounds-4/'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <EventCard title={"Event"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque eget ligula elementum ultrices. Duis pulvinar tincidunt est eu feugiat. Nam feugiat lacus eu maximus commodo. Lorem ipsum dolor sit"}
                                   photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}
                                   location={'Vancouver, BC'} date={'2021/05/29'} category={'Music'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <EventCard title={"Event"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque eget ligula elementum ultrices. Duis pulvinar tincidunt est eu feugiat. Nam feugiat lacus eu maximus commodo. Lorem ipsum dolor sit"}
                                   photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}
                                   location={'Vancouver, BC'} date={'2021/05/29'} category={'Music'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <EventCard title={"Event"} description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque eget ligula elementum ultrices. Duis pulvinar tincidunt est eu feugiat. Nam feugiat lacus eu maximus commodo. Lorem ipsum dolor sit"}
                                   photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}
                                   location={'Vancouver, BC'} date={'2021/05/29'} category={'Music'}/>
                    </Grid>

                </Grid>
            </Container>

        </div>


    )

}

export default Events