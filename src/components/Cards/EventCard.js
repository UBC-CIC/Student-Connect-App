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
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
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
    }
}));


export default function EventCard (props){
    const {category,title,location,date,photo,description} = props
    const classes = useStyles();

    return (
        <Card className={classes.root} >
                {/*<Container className={classes.iconArea}>*/}
                {/*<Icon>*/}
                {/*    <LocalOfferIcon color={'primary'}></LocalOfferIcon>*/}
                {/*</Icon>*/}
                {/*</Container>*/}
                <CardMedia
                    component="img"
                    height="140"
                    image={photo}

                    title="Event image"
                />
                <CardContent>
                    <Grid container>
                        <Grid item xs={7}>

                        <Typography gutterBottom variant="h5" component="h2" align={'left'} className={classes.heartIcon}>
                            {title}
                        </Typography>
                        </Grid>
                        <Grid item xs={5} className={classes.icons} >
                            <IconButton >
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
            <CardActions>
            </CardActions>
        </Card>
    );


}
