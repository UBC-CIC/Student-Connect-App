

const initialNews =[]

 const newsReducer = (news = initialNews, action) => {
    let newsList = [...news];
    switch (action.type) {
        case "FETCH_NEWS_SUCCESS": {
            return (action.payload);
        }
        default:
            return newsList;
    }

};


export default newsReducer