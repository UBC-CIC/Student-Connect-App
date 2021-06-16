

const initialBlogs =[]

const blogsReducer = (blog = initialBlogs, action) => {
    let blogsList = [...blog];
    switch (action.type) {
        case "FETCH_BLOGS_SUCCESS": {
            return (action.payload);
        }
        default:
            return blogsList;
    }

};


export default blogsReducer