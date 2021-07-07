import {GridList, GridListTile} from "@material-ui/core";
import {GridListEventCard} from "../Cards/EventCard";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        minHeight: '330px'
    },
    gridListTile:{
        minHeight: '300px'

    }

}));

 function EventGridList(props){
    const classes = useStyles();
    return(
        <GridList className={classes.gridList} cols={3}>
            <GridListTile className={classes.gridListTile}>
                <GridListEventCard title={"Cover Letter Workshop"}
                           photo={'https://events.cms.ok.ubc.ca/wp-content/uploads/sites/121/2021/05/CoverLetter-FBTwitter-1.jpg'}
                           location={'Online'} date={'2021-06-07 12:00:00'} category={'College of Graduate Studies'} link={'https://events.ok.ubc.ca/event/cover-letter-workshop/'}/>
            </GridListTile>
            <GridListTile className={classes.gridListTile}>
                <GridListEventCard title={"Event"} date={'2021/05/20'} location={"Vancouver, BC"} photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}/>
            </GridListTile>
            <GridListTile className={classes.gridListTile}>
                <GridListEventCard title={"Event"} date={'2021/05/20'} location={"Vancouver, BC"} photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}/>
            </GridListTile>
            <GridListTile className={classes.gridListTile}>
                <GridListEventCard title={"Event"} date={'2021/05/20'} location={"Vancouver, BC"} photo={'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722_960_720.jpg'}/>
            </GridListTile>
        </GridList>
    )
}

export default (EventGridList)