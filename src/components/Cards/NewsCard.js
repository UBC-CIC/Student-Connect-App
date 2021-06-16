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
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Button from "@material-ui/core/Button";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
export function BigNewsCard(props){
    const classes = useStyles();
    const {title, photo, link, date,categories, excerpts} = props

    return(
    <Card className={classes.bigCard}>
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
                                <Grid item>
                                    <Button className={classes.learnMoreButton} endIcon={<ChevronRightIcon/>} href={link} target = "_blank">
                                        Read more
                                    </Button>
                                    <Button className={classes.learnMoreButton} endIcon={<FavoriteBorderIcon/>}>
                                        Like
                                    </Button>

                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
    </Card>
    )

}
const useStyles = makeStyles((theme) => ({
    root: {

    },
    bigCard:{
        padding: theme.spacing(2),
        height: "100%",
        margin:'none',
        boxShadow: "0 3px 5px 0 rgba(0,0,0,0.2)",
        '&:hover':{
            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)"
        }

    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        height: 128,

    },
    learnMoreButton:{
        textTransform:"none",
        backgroundColor:"#0055B7",
        color:"white",
        fontSize:'11px',
        borderRadius:"3",
        marginRight:theme.spacing(1)

    }
}));

export function HomePageNewsCard(props){

    const classes = useStyles();
    const {title, photo, link, date,categories,description} = props
    return(
        <Card className={classes.bigCard}>
            <div className={classes.root} >
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
                                        {description}
                                    </Typography>

                                    <Typography variant="body2"  align={'left'} >
                                        {date}
                                    </Typography>
                                    <Typography variant="body2"  align={'left'} >
                                        <Tag categories={categories}/>
                                    </Typography>

                                </Grid>
                                <Grid item>
                                    <Button className={classes.learnMoreButton} endIcon={<ChevronRightIcon/>} href={link} target = "_blank">
                                        Read more
                                    </Button>
                                    <Button className={classes.learnMoreButton} endIcon={<FavoriteBorderIcon/>}>
                                        Like
                                    </Button>

                                </Grid>

                            </Grid>
                        </Grid>
                    </Grid>
            </div>
        </Card>
    )

}