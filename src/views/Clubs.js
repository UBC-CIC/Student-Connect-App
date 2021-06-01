import ClubCard from "../components/Cards/ClubCard";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {FormControl, Input, InputAdornment} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import EventCard from "../components/Cards/EventCard";
function Clubs(){
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
            <h1>Clubs</h1>
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
            <Container className={classes.cardGrid} >
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <ClubCard title="Club" description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque eget ligula elementum ultrices. Duis pulvinar tincidunt est eu feugiat. Nam feugiat lacus eu"}/>
                    </Grid>

                </Grid>
            </Container>

        </div>

    )

}

export default Clubs