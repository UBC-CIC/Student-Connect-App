import { combineReducers } from "redux";
import {newsReducer, allNewsReducer}from "./newsReducer";
import {eventsReducer,allEventsReducer} from "./eventsReducer";
import {blogsReducer,allBlogsReducer} from "./blogsReducer";
import clubsReducer from "./clubsReducer";
import allClubsReducer from "./allClubsReducer";

export default combineReducers({
    news: newsReducer,
    events:eventsReducer,
    blogs:blogsReducer,
    clubs:clubsReducer,
    allClubs:allClubsReducer,
    allEvents:allEventsReducer,
    allNews:allNewsReducer,
    allBlogs:allBlogsReducer

});