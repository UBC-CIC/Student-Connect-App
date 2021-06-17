import ClubCard from "../Cards/ClubCard";
import React from "react";
import Carousel from "react-material-ui-carousel";
import {connect} from "react-redux";

function ClubsCarousel(props){
    const {clubs}=props
    return (

        <Carousel animation={'slide'}>
            {
                clubs.map( (item, i) => <ClubsItem key={i} item={item} /> )
            }
        </Carousel>
    )


}

function ClubsItem(props)
{
    return (
        <ClubCard title={props.item._source.title}
                  logo={props.item._source.image_link}
                  email={props.item._source.email}
                  description={props.item._source.description}
                  categories={props.item._source.categories}
                  facebook={props.item._source.facebook}
                  twitter={props.item._source.twitter}
                  website={props.item._source.website}

        />

    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        clubs: state.clubs,
    }
};

export default connect(mapStateToProps)(ClubsCarousel);
