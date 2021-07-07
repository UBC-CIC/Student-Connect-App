import {connect} from "react-redux";
import React from "react";
import Carousel from "react-material-ui-carousel";
import {HomeEventCard} from "../Cards/EventCard";

function EventsCarousel(props){
        const {events} = props
        return (

            <Carousel animation={'slide'} autoPlay={false}>
                {
                    events.map( (item, i) => <EventItem key={i} item={item} /> )
                }
            </Carousel>
        )

}

function EventItem(props)
{
    if(props.item._source.cost === ""){
        props.item._source.cost="Free"
    }
    return (
        <HomeEventCard title={props.item._source.title}
                  categories={props.item._source.categories}
                       link={props.item._source.link}
                       location={props.item._source.eventLocation.venue}
                       photo={props.item._source.thumbnailImage}
                       description={props.item._source.excerpt}
                       startDate={props.item._source.startDate}
                       endDate={props.item._source.endDate}
                       cost={props.item._source.cost}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        events: state.events,
    }
};

export default connect(mapStateToProps)(EventsCarousel);
