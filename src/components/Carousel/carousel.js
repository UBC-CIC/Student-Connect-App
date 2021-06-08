import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'
import {HomePageNewsCard} from "../Cards/NewsCard";
import {GridListEventCard} from "../Cards/EventCard";
import ClubCard from "../Cards/ClubCard";
import News from "../../views/News";

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

        <Carousel>
            {
                clubs.map( (item, i) => <ClubsItem key={i} item={item} /> )
            }
        </Carousel>
    )


}

export function BlogsCarousel(props)
    {
        var items = [
            {
                name: "6 ways you might be accidentally committing academic misconduct",
                photo: "https://students.ok.ubc.ca/wp-content/uploads/sites/90/2020/11/blog-header.jpg",
                link:"https://students.ok.ubc.ca/2020/11/18/6-ways-you-might-be-accidentally-committing-academic-misconduct/",
                date:"Nov 18, 2020",
                categories:['Academic'],

            },
            {
                name: "Tips for living your greenest life",
                photo: "https://students.ok.ubc.ca/wp-content/uploads/sites/90/2021/04/blog-header-1.jpg",
                link:"https://students.ok.ubc.ca/2021/04/22/tips-for-living-your-greenest-life/",
                date:"April 22, 2021",
                categories:['Health','Sustainbility']

            },

        ]
        return (

            <Carousel>
                {
                    items.map( (item, i) => <NewsItem key={i} item={item} /> )
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

        <Carousel>
            {
                items.map( (item, i) => <NewsItem key={i} item={item} /> )
            }
        </Carousel>
    )
}

 function NewsItem(props)
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
function ClubsItem(props)
{
    return (
        <Paper>
            <ClubCard title={props.item.title}
                              logo={props.item.logo}
                              email={props.item.email}
                              description={props.item.description} categories={props.item.categories}
            />

        </Paper>
    )
}
