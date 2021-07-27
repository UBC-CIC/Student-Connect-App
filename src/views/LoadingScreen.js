import Home from "./Home/Home";
import {useEffect, useState} from "react";
import {fetchNews, fetchSportsNews} from "../actions/newsActions";
import {fetchEvents} from "../actions/eventsAction";
import {fetchBlogs} from "../actions/blogsAction";
import {fetchClubs} from "../actions/clubAction";
import {connect} from "react-redux";
import {listToString} from "../helpers/PreferenceListToString";

function LoadingScreen(props) {
    const {userPreference,fetchNews,
        fetchEvents,
        fetchBlogs,
        fetchClubs,
        fetchSportsNews}=props
    useEffect(  () => {
        if(userPreference){
            let academicCategory=listToString(userPreference.academicPreference)
            let newsBlogClubsCategory=listToString(userPreference.newsBlogsClubsPreference)
            let mensSportsCategory=listToString(userPreference.sportsPreference.mensSportsList)
            let womensSportsCategory=listToString(userPreference.sportsPreference.womensSportsList)
            fetchNews(academicCategory+newsBlogClubsCategory)
            fetchEvents(academicCategory+newsBlogClubsCategory)
            fetchBlogs(academicCategory+newsBlogClubsCategory)
            fetchClubs(academicCategory+newsBlogClubsCategory)
            fetchSportsNews(mensSportsCategory+womensSportsCategory)


        }

    },[userPreference])
    return(
        <div>

        {(!userPreference)&&(
            <h1>loading</h1>
        )}
            {(userPreference)&&(

                <Home/>
            )}

</div>

)
}
const mapStateToProps = (state) => {
    return {
        userPreference: state.userPreference
    };
};

const mapDispatchToProps = {
    fetchNews,
    fetchEvents,
    fetchBlogs,
    fetchClubs,
    fetchSportsNews,
};

export default (connect(mapStateToProps, mapDispatchToProps)(LoadingScreen));