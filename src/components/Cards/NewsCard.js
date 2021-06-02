import {ButtonBase, Card, CardActionArea, IconButton, Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import EmailIcon from "@material-ui/icons/Email";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LanguageIcon from "@material-ui/icons/Language";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

export function HomePageNewsCard(props){
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,

        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
        },
        image: {
            width: 128,
            height: 128,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
    }));

    const classes = useStyles();
    const {title, photo} = props
    return(
        <Card>
            <CardActionArea>
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <ButtonBase className={classes.image}>
                                <img className={classes.img} alt="complex" src={photo} />
                            </ButtonBase>
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="h6" align={'left'}>
                                        {title}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>

            </div>
            </CardActionArea>
        </Card>
    )

}