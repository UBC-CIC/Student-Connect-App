import {GridList, GridListTile} from "@material-ui/core";
import {HomePageNewsCard} from "../Cards/NewsCard";
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
        // minHeight: '300px'

    }

}));

export default function NewsGridList(){
    const classes = useStyles();

    return(
        <GridList className={classes.gridList} cols={2}>
            <GridListTile className={classes.gridListTile}>
                <HomePageNewsCard title={'UBCO researchers examine how pandemics impact the homeless'}
                                  photo={'https://news.ok.ubc.ca/wp-content/uploads/2021/01/homeless-man-1200-225x225.jpg'}
                                  link={'https://news.ok.ubc.ca/?p=19223'}
                                  date={'May 25, 2021'} categories={['Faculty of Health and Social Development']}/>
            </GridListTile>
            <GridListTile className={classes.gridListTile}>
                <HomePageNewsCard categories={['Category']} title={'News title'}
                                  photo={'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg'}
                                  date={'date'}/>
            </GridListTile>
            <GridListTile className={classes.gridListTile}>
                <HomePageNewsCard categories={['Category']} title={'News title'}
                                  photo={'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_960_720.jpg'}
                                  date={'date'}/>
            </GridListTile>

        </GridList>

    )
}
