

const initialNews =[]

export const newsReducer = (news = initialNews, action) => {
    let newsList = [...news];
    switch (action.type) {
        case "FETCH_NEWS_SUCCESS": {
            return (action.payload);
        }
        default:
            return newsList;
    }

};


const initialAllNews =[]

export const allNewsReducer = (news = initialAllNews, action) => {
    let newsList = [...news];
    switch (action.type) {
        case "FETCH_ALL_NEWS_SUCCESS": {
            return (action.payload);
        }
        default:
            return newsList;
    }

};

const sportsNews =[]

export const sportsNewsReducer = (news = sportsNews, action) => {
    let newsList = [...news];
    switch (action.type) {
        case "FETCH_SPORTS_NEWS_SUCCESS": {
            return (action.payload);
        }
        default:
            return newsList;
    }

};

const allSportsNews =[]

export const allSportsNewsReducer = (news = allSportsNews, action) => {
    let newsList = [...news];
    switch (action.type) {
        case "FETCH_ALL_SPORTS_NEWS_SUCCESS": {
            return (action.payload);
        }
        default:
            return newsList;
    }

};
