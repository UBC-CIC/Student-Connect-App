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
import {Icon} from "@material-ui/core";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    iconArea:{
        height: 35,
        alignItems:"left",
        paddingTop: theme.spacing(5)
    }
}));


export default function EventCard (props){
    const {category,title,location,date,photo,description} = props
    const classes = useStyles();

    return (
        <Card className={classes.root} >
                <Container className={classes.iconArea}>
                <Icon>
                    <LocalOfferIcon color={'primary'}></LocalOfferIcon>
                </Icon>
                </Container>
                <CardMedia
                    component="img"
                    height="140"
                    image={photo}

                    title="Event image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" align={'left'}>
                        {title}
                    </Typography>
                    <Typography color={'error'} variant="body2"  align={'left'} >
                        {date}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="p" align={'left'}>
                        {"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque scelerisque eget ligula elementum ultrices. Duis pulvinar tincidunt est eu feugiat. Nam feugiat lacus eu maximus commodo. Lorem ipsum dolor sit "}
                    </Typography>
                </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Interested
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );


}
