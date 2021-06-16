import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import {ButtonBase, Icon, IconButton} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Grid from "@material-ui/core/Grid";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {Tag} from '../Tags/Tag'
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        boxShadow: "0 3px 5px 0 rgba(0,0,0,0.2)",
        '&:hover':{
            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)"
        }

    },

    iconArea:{
        height: 35,
        alignItems:"left",
        paddingTop: theme.spacing(5)
    },
    heartIcon:{
        position: "flex", top: "50%",alignItems:'center', margin:'7px 0px 0px 0px '},
    icons:{
        float:'right'
    },
    gridListTile:{
        height: '280px',
    },
    tags:{
        display:'flex', justiyContent:'space-between', flexDirection:'column'    },
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


export function EventCard (props){
    const {categories,title,location,date,photo,description, link} = props
    const classes = useStyles();

    return (
        <div>
        <Card className={classes.root} >
            <CardActions className={classes.tags} >
                <Tag categories={categories}/>
            </CardActions>

            <CardMedia
                    component="img"
                    height="140"
                    image={photo}
                    title="Event image"
                />
                <CardContent>
                    <Grid container>
                        <Grid item md={7}>

                        <Typography gutterBottom variant="h5" component="h2" align={'left'} className={classes.heartIcon}>
                            {title}
                        </Typography>
                        </Grid>
                        <Grid item md={5} className={classes.icons} >
                            <IconButton href={link} target = "_blank">
                                <MoreHorizIcon/>
                            </IconButton>
                            <IconButton >
                                <FavoriteBorderIcon/>
                            </IconButton>

                        </Grid>
                    </Grid>

                    <Typography color={'error'} variant="body2"  align={'left'} >
                        {date}
                    </Typography>
                    <Typography  variant="body2"  align={'left'} >
                        {location}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="p" align={'left'}>
                        {description}
                    </Typography>

                </CardContent>
        </Card>
        </div>
);


}

export function HomeEventCard (props){
    const {categories,title,location,date,photo,description, link} = props
    const classes = useStyles();
    return(
        <div className={classes.root} >
        <Card className={classes.bigCard}>
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
                                   Start time: {date}
                                </Typography>
                                <Typography variant="body2"  align={'left'} >
                                    {location}
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
        </div>

    );


}

export function GridListEventCard (props){
    const {category,title,location,date,photo, link} = props
    const classes = useStyles();

    return (
        <Card className={classes.gridListTile} >
            <CardMedia
                component="img"
                height="140"
                image={photo}

                title="Event image"
            />
            <CardContent>
                <Grid container>
                    <Grid item xs={7}>

                        <Typography gutterBottom variant="h6"  align={'left'} className={classes.heartIcon}>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={5} className={classes.icons} >
                        <IconButton href={link} target = "_blank">
                            <MoreHorizIcon/>
                        </IconButton>
                        <IconButton >
                            <FavoriteBorderIcon/>
                        </IconButton>

                    </Grid>
                </Grid>

                <Typography color={'error'} variant="body2"  align={'left'} >
                    {date}
                </Typography>
                <Typography  variant="body2"  align={'left'} >
                    {location}
                </Typography>
            </CardContent>
        </Card>
    );


}
