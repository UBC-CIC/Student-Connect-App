

const initialBlogs =[]

export const blogsReducer = (blog = initialBlogs, action) => {
    let blogsList = [...blog];
    switch (action.type) {
        case "FETCH_BLOGS_SUCCESS": {
            return (action.payload);
        }
        default:
            return blogsList;
    }

};


const initialAllBlogs =[]

export const allBlogsReducer = (blog = initialAllBlogs, action) => {
    let blogsList = [...blog];
    switch (action.type) {
        case "FETCH_ALL_BLOGS_SUCCESS": {
            return (action.payload);
        }
        default:
            return blogsList;
    }

};
