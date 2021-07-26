import ClubCard from "../Cards/ClubCard";
import React, {useEffect, useState} from "react";
import Carousel from "react-material-ui-carousel";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";

function ClubsCarousel(props){
    const {clubs}=props
    const [clubLength,setClubLength]= useState(clubs.length)
    useEffect(()=>{
        setClubLength(clubs.length)
    })
    return (
        <div>
            <Carousel animation={'slide'} autoPlay={false} >
                {clubs.map( (item, i) =><ClubsItem key={i} item={item}/>)}
            </Carousel>
            {clubLength===0&&
            <Typography variant={"h6"}>
                Sorry, there are currently no clubs that match your preference
            </Typography>}

        </div>

    )


}

function ClubsItem(props)
{
    return (
        <ClubCard title={props.item._source.title}
                  logo={props.item._source.imageLink}
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
    return {
        clubs: state.clubs,
    }
};

export default connect(mapStateToProps)(ClubsCarousel);
