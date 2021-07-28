import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {Divider} from "@material-ui/core";
import ClubsTabs from "../components/Tabs/Tabs";
import Typography from "@material-ui/core/Typography";
import React from "react";

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
function Clubs(props){
    const classes = useStyles()

    return(
        <div>
            <Container maxWidth={'xl'} >
                <Typography align={'left'} variant="h4" className={classes.title}>
                    Clubs
                </Typography>
                <Typography align={'left'} variant="h5">
                    Explore all the clubs here
                </Typography>
                <Divider className={classes.divider}/>

            </Container>
            <Container>
                <ClubsTabs/>
            </Container>

        </div>

    )

}

export default Clubs