import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {Divider} from "@material-ui/core";
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

function SavedItems(props){
    const classes = useStyles()
    return(
        <div>
            <Container maxWidth={'xl'} >
                <Typography align={'left'} variant="h4" className={classes.title}>
                    Saved Items
                </Typography>
                <Divider className={classes.divider}/>
            </Container>
            <Container maxWidth={'xl'} >

            </Container>

        </div>
    )

}

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(SavedItems);
