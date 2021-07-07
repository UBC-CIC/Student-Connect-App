

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

