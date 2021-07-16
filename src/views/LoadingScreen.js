import Home from "./Home";
import {useEffect, useState} from "react";
import {fetchAllNews, fetchAllSportsNews, fetchNews, fetchSportsNews} from "../actions/newsActions";
import {fetchAllEvents, fetchEvents} from "../actions/eventsAction";
import {fetchAllBlogs, fetchBlogs} from "../actions/blogsAction";
import {fetchAllClubs, fetchClubs} from "../actions/clubAction";
import {createUserDataAction, getUserPreferenceAction} from "../actions/userAction";
import {connect} from "react-redux";
import {listToString} from "../helpers/PreferenceListToString";
 function LoadingScreen(props) {
    const [loading,setloading] = useState(true)
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