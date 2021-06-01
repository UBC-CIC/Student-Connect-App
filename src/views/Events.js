import EventCard from "../components/Cards/EventCard";
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
                    <EventCard title={"Event"} description={"Hello"} photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}
                 location={'Vancouver, BC'} date={'2021/05/29'} category={'Music'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <EventCard title={"Event"} description={"Hello"} photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}
                                   location={'Vancouver, BC'} date={'2021/05/29'} category={'Music'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <EventCard title={"Event"} description={"Hello"} photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}
                                   location={'Vancouver, BC'} date={'2021/05/29'} category={'Music'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <EventCard title={"Event"} description={"Hello"} photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}
                                   location={'Vancouver, BC'} date={'2021/05/29'} category={'Music'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <EventCard title={"Event"} description={"Hello"} photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}
                                   location={'Vancouver, BC'} date={'2021/05/29'} category={'Music'}/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <EventCard title={"Event"} description={"Hello"} photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}
                                   location={'Vancouver, BC'} date={'2021/05/29'} category={'Music'}/>
                    </Grid>

                </Grid>
            </Container>

        </div>


    )

}

export default Events