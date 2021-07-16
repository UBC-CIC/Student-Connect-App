import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Divider} from "@material-ui/core";
import React from "react";
import NewsBlogsTab from "../components/Tabs/NewsBlogsTab";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {HomePageNewsCard} from "../components/Cards/NewsCard";
import SavedItemCard from "../components/Cards/SavedItemCard";

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

    },
    grid:{
        display: 'flex'
    }


}));

function SavedItems(props){
    const classes = useStyles()
    const {savedItems}=props
    const savedItemsList = savedItems.savedItems.map((item) => {
        return(
            <Grid item xs={12} sm={6} className={classes.grid}>
                <SavedItemCard title={item.title}
                                  photo={item.image}
                                  link={item.link}
                />
            </Grid>
        )
    });

    return(
        <div>
            <Container maxWidth={'xl'} >
                <Typography align={'left'} variant="h4" className={classes.title}>
                    Saved Items
                </Typography>
                <Divider className={classes.divider}/>
            </Container>
            <Container maxWidth={'xl'} >
                <Grid container spacing={3}>
                    {savedItemsList}
                </Grid>

            </Container>

        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        savedItems:state.savedItems
    };
};

export default connect(mapStateToProps)(SavedItems);
