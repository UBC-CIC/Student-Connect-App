import Carousel from "react-material-ui-carousel";
import React from "react";
import {connect} from "react-redux";
import {HomePageNewsCard} from "../Cards/NewsCard";

function BlogsCarousel(props)
{
    var items = [
        {
            name: "6 ways you might be accidentally committing academic misconduct",
            photo: "https://students.ok.ubc.ca/wp-content/uploads/sites/90/2020/11/blog-header.jpg",
            link:"https://students.ok.ubc.ca/2020/11/18/6-ways-you-might-be-accidentally-committing-academic-misconduct/",
            date:"Nov 18, 2020",
            categories:['Academic'],

        },
        {
            name: "Tips for living your greenest life",
            photo: "https://students.ok.ubc.ca/wp-content/uploads/sites/90/2021/04/blog-header-1.jpg",
            link:"https://students.ok.ubc.ca/2021/04/22/tips-for-living-your-greenest-life/",
            date:"April 22, 2021",
            categories:['Health','Sustainbility']

        },

    ]
    const {blogs} = props

    return (

        <Carousel animation={'slide'} autoPlay={false}>
            {
                blogs.map( (item, i) => <BlogsItem key={i} item={item} /> )
            }
        </Carousel>
    )

}
function BlogsItem(props)
{
    return (
        <HomePageNewsCard title={props.item._source.title}
                          categories={props.item._source.categories}
                          link={props.item._source.link}
                          description={props.item._source.excerpt}
                          photo={props.item._source.mediaImages.mediumImage}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
    }
};

export default connect(mapStateToProps)(BlogsCarousel);
