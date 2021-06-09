import ClubCard from "../components/Cards/ClubCard";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {Divider, FormControl, Input, InputAdornment} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import EventCard from "../components/Cards/EventCard";
import {ScrollableTabsButtonAuto, ScrollableTabsButtonForce} from "../components/Tabs/Tabs";
import Typography from "@material-ui/core/Typography";
import React from "react";
function Clubs(){
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
    const classes = useStyles()

    return(
        <div>
            <Container maxWidth={'xl'} >
                <Typography align={'left'} variant="h4" className={classes.title}>
                    Clubs
                </Typography>
                <Typography align={'left'} variant="h6">
                    Explore all the clubs here
                </Typography>
                <Divider className={classes.divider}/>

            </Container>
            <Container>
                <ScrollableTabsButtonAuto/>
            </Container>
            <Container className={classes.cardGrid} >
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <ClubCard title="Ice Cream Club" logo={'https://www.ubcsuo.ca/sites/default/files/styles/club_image/public/clubs/ice_cream_club_logo_0.jpg?itok=e3BQq-uv'}
                                  description={"The Ice Cream Club is UBCO’s fastest growing and soon to be largest club on campus. We know that life is tough, university is hard, and sometimes you just need ice cream. That’s where we come in. Our goal is to improve the life of UBCO’s students through ice cream."}
                        email={"icecreamclububco@gmail.com"} facebook={'https://www.facebook.com/groups/693826520823694/about'}
                                  twitter={'https://twitter.com/UBCOICC'}
                                  categories={['Recreation']}
                        />
                        <ClubCard title="Girls in Tech" logo={'https://www.ubcsuo.ca/sites/default/files/styles/club_image/public/clubs/git.jpg?itok=NOv5s3fW'}
                                  description={"The Girls in Tech club is an ACM-W Student Chapter that aims to create opportunities for the women of our campus breaking into the tech field in various ways. We offer both professional and academic events as well as a safe space for everyone that wants to join! "}
                                  email={"ubcogirlsintech@gmail.com"} facebook={'https://www.facebook.com/ubcogit'}
                                  categories={["Science", "Engineering", "Activism"]}
                        />

                    </Grid>
                </Grid>
            </Container>

        </div>

    )

}

export default Clubs