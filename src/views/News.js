import Container from "@material-ui/core/Container";

import {Lduh} from '../components/Tags/Tag'
import IconLabelTabs from '../components/Tabs/Tabs'
import {HomePageNewsCard} from "../components/Cards/NewsCard";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Divider} from "@material-ui/core";
import React from "react";
import {NewsBlogsClubs} from "./Survey/SurveySections";
import NewsBlogsTab from "../components/Tabs/NewsBlogsTab";
import {connect} from "react-redux";
const category = ['lduh','aldo','dddd']
const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider:{
        marginTop:'30px',
        marginBottom:'30px',

    },
    title:{
        fontWeight: 600,
        color:"#0055B7"

    }

}));

function News(props){
    const classes = useStyles()
    const {allNews,allBlogs} = props
    return(
        <div>
            <Container maxWidth={'xl'} >
                <Typography align={'left'} variant="h4" className={classes.title}>
                    News and Blogs
                </Typography>
                <Divider className={classes.divider}/>
            </Container>
            <Container maxWidth={'xl'} >
                <NewsBlogsTab allNews={allNews} allBlogs={allBlogs}/>

            </Container>

        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        allNews: state.allNews,
        allBlogs:state.allBlogs
    };
};

export default connect(mapStateToProps)(News);
