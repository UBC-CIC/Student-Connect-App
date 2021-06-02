import {GridList, GridListTile} from "@material-ui/core";
import EventCard from "../Cards/EventCard";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {HomePageNewsCard} from "../Cards/NewsCard";


const useStyles = makeStyles((theme) => ({
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        minHeight: '300px'
    },
    gridListTile:{
        minHeight: '250px'

    }

}));


export function EventGridList(){
    const classes = useStyles();
    return(
        <GridList className={classes.gridList} cols={3}>
            <GridListTile className={classes.gridListTile}>
                <EventCard title={"Event"} date={'2021/05/20'} location={"Vancouver, BC"} photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}/>
            </GridListTile>
            <GridListTile className={classes.gridListTile}>
                <EventCard title={"Event"} date={'2021/05/20'} location={"Vancouver, BC"} photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}/>
            </GridListTile>
            <GridListTile className={classes.gridListTile}>
                <EventCard title={"Event"} date={'2021/05/20'} location={"Vancouver, BC"} photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}/>
            </GridListTile>
            <GridListTile className={classes.gridListTile}>
                <EventCard title={"Event"} date={'2021/05/20'} location={"Vancouver, BC"} photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}/>
            </GridListTile>
            <GridListTile className={classes.gridListTile}>
                <EventCard title={"Event"} date={'2021/05/20'} location={"Vancouver, BC"} photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}/>
            </GridListTile>
        </GridList>
    )
}
export function NewsGridList(){
    const classes = useStyles();

    return(
        <GridList className={classes.gridList} cols={2}>
            <GridListTile className={classes.gridListTile}>
                <HomePageNewsCard title={'News title'} photo={'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg'}/>
            </GridListTile>
            <GridListTile className={classes.gridListTile}>
                <HomePageNewsCard title={'News title'} photo={'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg'}/>
            </GridListTile>
            <GridListTile className={classes.gridListTile}>
                <HomePageNewsCard title={'News title'} photo={'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg'}/>
            </GridListTile>

        </GridList>

    )
}