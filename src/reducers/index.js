import { combineReducers } from "redux";
import {newsReducer, allNewsReducer, allSportsNewsReducer, sportsNewsReducer} from "./newsReducer";
import {eventsReducer,allEventsReducer} from "./eventsReducer";
import {blogsReducer,allBlogsReducer} from "./blogsReducer";
import {clubsReducer,allClubsReducer} from "./clubsReducer";
import {preferenceReducer} from "./userReducer";

export default combineReducers({
    news: newsReducer,
    events:eventsReducer,
    blogs:blogsReducer,
    clubs:clubsReducer,
    allClubs:allClubsReducer,
    allEvents:allEventsReducer,
    allNews:allNewsReducer,
    allBlogs:allBlogsReducer,
    sportsNews:sportsNewsReducer,
    allSportsNews:allSportsNewsReducer,
    userPreference: preferenceReducer

});