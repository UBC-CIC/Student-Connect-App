import { combineReducers } from "redux";
import newsReducer from "./newsReducer";
import eventsReducer from "./eventsReducer";
import blogsReducer from "./blogsReducer";
import clubsReducer from "./clubsReducer";

export default combineReducers({
    news: newsReducer,
    events:eventsReducer,
    blogs:blogsReducer,
    clubs:clubsReducer

});