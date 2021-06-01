import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {ButtonBase, Card, Icon, IconButton, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import LanguageIcon from '@material-ui/icons/Language';
import TwitterIcon from '@material-ui/icons/Twitter';
function ClubCard (props){
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

    const {title,logo,description} = props
    const classes = useStyles();
    return(
        <div>
            <Card>
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                            <Grid item>
                                <ButtonBase className={classes.image}>
                                    <img className={classes.img} alt="complex" src="https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg" />
                                </ButtonBase>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <Typography gutterBottom variant="h5" align={'left'}>
                                            {title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography gutterBottom variant={"body2"} align={'left'}>
                                            {description}
                                        </Typography>
                                    </Grid>

                                    <Grid item alignItems={'left'}>
                                        <IconButton>
                                            <EmailIcon/>
                                        </IconButton>
                                        <IconButton>
                                            <FacebookIcon/>
                                        </IconButton>
                                        <IconButton>
                                            <TwitterIcon/>
                                        </IconButton>
                                        <IconButton>
                                            <LanguageIcon/>
                                        </IconButton>


                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>

            </Card>
        </div>
    )


}
export default ClubCard