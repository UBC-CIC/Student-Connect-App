import {Button, Card, Container, Grid, Switch, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
        alignItems:"left",
        alignContent:"left"
    },
    card:{
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8)
    }
}));

function Profile(){
    const classes = useStyles();

    return(

        <div>
            <h1>Preferences</h1>
            <Container>
            <Card className={classes.card}>
                <Grid container spacing={3} className={classes.root} >
                    <Grid item xs={12}>
                            <Typography align={'left'}>
                                General
                            </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography align={'left'} >
                            Modify my preference settings to get the best out of the recommendation
                        </Typography>

                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained" color="primary"> Modify</Button>
                    </Grid>
                </Grid>

            </Card>
            </Container>
            <Container>
                <Card className={classes.card}>
                    <Grid container spacing={3} className={classes.root} >
                        <Grid item xs={12}>
                            <Typography align={'left'}>

                            Email
                        </Typography>

                    </Grid>
                        <Grid item xs={8}>
                            <Typography align={'left'}>
                            Email me about events and clubs that I might be interested in
                            </Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <Switch/>
                        </Grid>
                    </Grid>

                </Card>
            </Container>

        </div>

    )

}

export default Profile