import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'
import {HomePageNewsCard} from "../Cards/NewsCard";
import {GridListEventCard} from "../Cards/EventCard";

export function NewsCarousel(props)
{
    var items = [
        {
            name: "Parental consumption shapes how teens think about and use cannabis",
            photo: "https://news.ok.ubc.ca/wp-content/uploads/2021/05/cannabis-1200-225x225.jpg",
            link:"https://news.ok.ubc.ca/?p=19214",
            date:"May 19, 2021",
            categories:['Health','Research']

        },
            {
                name: "UBCO researchers examine how pandemics impact the homeless",
                photo: "https://news.ok.ubc.ca/wp-content/uploads/2021/01/homeless-man-1200-225x225.jpg",
                link:"https://news.ok.ubc.ca/?p=19223",
                date:"May 25, 2021",
                categories:['Faculty of Health and Social Development']

            },

        ]
    return (

        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

 function Item(props)
{
    return (
        <Paper>
            <HomePageNewsCard title={props.item.name}
                              photo={props.item.photo}
                              link={props.item.link}
                              date={props.item.date} categories={props.item.categories}
            />

        </Paper>
    )
}
