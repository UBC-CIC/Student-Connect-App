import {ButtonBase, Card, CardActionArea, IconButton, Paper} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import EmailIcon from "@material-ui/icons/Email";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import LanguageIcon from "@material-ui/icons/Language";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Tag} from "../Tags/Tag";

export function BigNewsCard(props){
    const classes = useStyles();
    const {title, photo, link, date,categories, excerpts} = props

    return(
    <Card>
        <CardActionArea href={link} target = "_blank">
                <Paper className={classes.bigCard}>
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
                                    <Typography variant="body2"  align={'left'} >
                                        {excerpts}
                                    </Typography>

                                </Grid>
                                <Grid item>
                                    <Typography variant="body2"  align={'left'} >
                                        {date}
                                    </Typography>
                                    <Typography variant="body2"  align={'left'} >
                                        <Tag categories={categories}/>
                                    </Typography>

                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
        </CardActionArea>
    </Card>
    )

}
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    bigCard:{
        minHeight:"300px",
        padding: theme.spacing(2),
        margin: 'auto',
        maxHeight:"400px"

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

export function HomePageNewsCard(props){

    const classes = useStyles();
    const {title, photo, link, date,categories} = props
    return(
        <Card>
            <CardActionArea href={link} target = "_blank">
            <div className={classes.root} >
                <Paper className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <img className={classes.img} alt="img" src={photo} />
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
                                    <Typography variant="body2"  align={'left'} >
                                        <Tag categories={categories}/>
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