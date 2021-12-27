import {makeStyles} from "@material-ui/core/styles";
import {Container, Divider, Grid, Typography} from "@material-ui/core";
import React from "react";
import NewsBlogsTab from "../components/Tabs/NewsBlogsTab";
import {connect} from "react-redux";

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
    const {allNews,allBlogs,allSportsNews} = props
    return(
        <div>
            <Container maxWidth={'xl'} >
                <Grid container spacing={2} direction={"column"}>
                    <Grid item>
                        <Typography align={'left'} variant="h4" className={classes.title}>
                            News and Blogs
                        </Typography>
                    </Grid>
                    <Grid item> 
                        <Typography align={'left'} variant="h5">
                            Explore all campus news, sports news and blogs here
                        </Typography>
                    </Grid>
                </Grid>
            </Container>

            <NewsBlogsTab allNews={allNews} allBlogs={allBlogs} allSportsNews={allSportsNews}/>


        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        allNews: state.allNews,
        allBlogs:state.allBlogs,
        allSportsNews:state.allSportsNews
    };
};

export default connect(mapStateToProps)(News);
