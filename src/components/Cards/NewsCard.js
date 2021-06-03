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
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
            height: 128,

        },
    }));

    const classes = useStyles();
    const {title, photo, link, date} = props
    return(
        <Card>
            <CardActionArea href={link} target = "_blank">
            <div className={classes.root} >
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <img className={classes.img} alt="complex" src={photo} />
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="h6" align={'left'}>
                                        {title}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2"  align={'left'} >
                                        {date}
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