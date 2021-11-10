import ClubCard from "../Cards/ClubCard";
import React, {useEffect, useState} from "react";
import Carousel from "react-material-ui-carousel";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    divider: {
        marginTop: "30px",
        marginBottom: "30px",
    },
    contentLink: {
    borderBottom: "1px solid"
    }
}));

function ClubsCarousel(props){
    const {clubs}=props
    const classes = useStyles();
    const [clubLength,setClubLength]= useState(clubs.length)
    useEffect(()=>{
        setClubLength(clubs.length)
    })
    return (
        <div>
            { clubLength===0 ? (
                <div>
                    <Typography variant={"h6"} className={classes.divider}>
                        Sorry, there are currently no clubs that match your preferences. 
                        Please make sure your preferences are up to date.
                        <br/>
                        In the meanwhile, you can <Link className={classes.contentLink} to='/clubs'>check out clubs here</Link>.
                    </Typography>
                </div>
            ) : (
                <Carousel animation={'slide'} autoPlay={false} >
                    {clubs.map( (item, i) =><ClubsItem key={i} item={item}/>)}
                </Carousel>
            )}
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
