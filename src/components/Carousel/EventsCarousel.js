import {connect} from "react-redux";
import React from "react";
import Carousel from "react-material-ui-carousel";
import {HomeEventCard} from "../Cards/EventCard";

function EventsCarousel(props){
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
        const {events} = props
        return (

            <Carousel animation={'slide'}>
                {
                    events.map( (item, i) => <EventItem key={i} item={item} /> )
                }
            </Carousel>
        )

    }

}

function EventItem(props)
{
    return (
        <HomeEventCard title={props.item._source.title}
                  categories={props.item._source.categories}
                       link={props.item._source.link}
                       location={props.item._source.eventLocation.venue}
                       date={props.item._source.startDate}
                       photo={props.item._source.thumbnailImage[0]}
                       description={props.item._source.excerpt}
        />
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        events: state.events,
    }
};

export default connect(mapStateToProps)(EventsCarousel);
