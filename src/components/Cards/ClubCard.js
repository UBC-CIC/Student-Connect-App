import React from 'react'
import {makeStyles} from "@material-ui/core/styles";
import {ButtonBase, Card, Icon, IconButton, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import EmailIcon from '@material-ui/icons/Email';
import FacebookIcon from '@material-ui/icons/Facebook';
import LanguageIcon from '@material-ui/icons/Language';
import TwitterIcon from '@material-ui/icons/Twitter';
import {Tag} from "../Tags/Tag";
import {HomePageNewsCard} from "./NewsCard";
import {NewsCardAccordion} from "../Accordion/Accordions";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
function ClubCard (props){
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            marginTop:'20px',
            boxShadow: "0 3px 5px 0 rgba(0,0,0,0.2)",
            '&:hover':{
                boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)"
            }

        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
        },
        image: {
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
            width: 128,
        },
        categories:{
            marginLeft:"10px"
        },
        facebookIcon:{
            fill:"#4267B2"
        },
        twitterIcon:{
            fill:"#1DA1F2"
        },
        emailIcon:{
            color:"#DB4437"
        }
    }));

    const {title,logo,description, email, website, facebook, twitter,categories} = props

    const classes = useStyles();
    return(
        <div>
            <Card className={classes.root}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <img className={classes.img} src={logo}/>
                            </Grid>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                        <NewsCardAccordion title={title} content={description}/>
                                    <Grid item className={classes.categories}>
                                        <Tag categories = {categories}/>
                                    </Grid>

                                    <Grid item alignItems={'left'}>
                                        {email ?
                                            <IconButton href={`mailto:${email}`} target = "_blank">
                                                <MailOutlineIcon className={classes.emailIcon}/>
                                            </IconButton>
                                            : null}

                                        {facebook ? <IconButton href={facebook} target = "_blank">
                                                <FacebookIcon className={classes.facebookIcon}/>
                                            </IconButton>
                                            : null}
                                        {twitter ?
                                            <IconButton href={twitter} target = {"_blank"}>
                                                <TwitterIcon className={classes.twitterIcon}/>
                                            </IconButton>

                                            : null}
                                        {website ?
                                            <IconButton href={website} target = "_blank">
                                                <LanguageIcon/>
                                            </IconButton>

                                            : null}



                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
            </Card>
        </div>
    )


}
export default ClubCard