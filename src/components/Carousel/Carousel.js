import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'
import {HomePageNewsCard} from "../Cards/NewsCard";
import {GridListEventCard, HomeEventCard} from "../Cards/EventCard";
import ClubCard from "../Cards/ClubCard";
import News from "../../views/News";
import {connect} from "react-redux";

export function ClubsCarousel(props){
    var clubs = [
        {
            title: "Ice Cream Club",
            logo: "https://www.ubcsuo.ca/sites/default/files/styles/club_image/public/clubs/ice_cream_club_logo_0.jpg?itok=e3BQq-uv",
            email:"icecreamclububco@gmail.com",
            description:"The Ice Cream Club is UBCO’s fastest growing and soon to be largest club on campus. We know that life is tough, university is hard, and sometimes you just need ice cream. That’s where we come in. Our goal is to improve the life of UBCO’s students through ice cream.",
            categories:['Health','Research']

        },

    ]
    return (

        <Carousel animation={'slide'}>
            {
                clubs.map( (item, i) => <ClubsItem key={i} item={item} /> )
            }
        </Carousel>
    )


}

export function NewsCarousel(props)
{
    var items = [
        {
            name: "Parental consumption shapes how teens think about and use cannabis",
            photo: "https://news.ok.ubc.ca/wp-content/uploads/2021/05/cannabis-1200-225x225.jpg",
            link:"https://news.ok.ubc.ca/?p=19214",
            date:"May 19, 2021",
            categories:['Health','Research'],

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

        <Carousel animation={'slide'} >
            {
                items.map( (item, i) => <NewsItem key={i} item={item} /> )
            }
        </Carousel>
    )
}

 function NewsItem(props)
{
    return (
            <HomePageNewsCard title={props.item.name}
                              photo={props.item.photo}
                              link={props.item.link}
                              date={props.item.date} categories={props.item.categories}
            />
    )
}


function ClubsItem(props)
{
    return (
        <ClubCard title={props.item.title}
                  logo={props.item.logo}
                  email={props.item.email}
                  description={props.item.description} categories={props.item.categories}
        />

    )
}
