import {combineReducers} from "redux";
import {allNewsReducer, allSportsNewsReducer, newsReducer, sportsNewsReducer} from "./newsReducer";
import {allEventsReducer, eventsReducer} from "./eventsReducer";
import {allBlogsReducer, blogsReducer} from "./blogsReducer";
import {allClubsReducer, clubsReducer} from "./clubsReducer";
import {preferenceReducer} from "./userReducer";
import {currentCredsReducer, currentUserReducer, loginReducer} from "./loginReducer";
import {savedItemReducer} from "./savedItemReducer";

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
    userPreference: preferenceReducer,
    loginState: loginReducer,
    currentUser:currentUserReducer,
    savedItems:savedItemReducer,
    currentCredentials:currentCredsReducer

});