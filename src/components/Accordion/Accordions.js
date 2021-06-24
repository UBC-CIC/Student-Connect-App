
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',

    },
    accordion:{
        boxShadow:"none",
        paddingLeft:'0'

    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    title:{
        fontWeight:"500",
        float:'left'
    }
}));

export function NewsCardAccordion(props) {
    const classes = useStyles();
    const {content,title, date} = props

    return (
        <div className={classes.root}>
            <Accordion className={classes.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />} className={classes.accordion}
                >
                    <Typography className={classes.title} gutterBottom variant="subtitle1" align={'left'}>
                        {title}
                    </Typography>
                </AccordionSummary>
                    <Typography variant="caption"  align={'left'} >
                        {content}
                    </Typography>

                <Typography variant="caption"  align={'left'} >
                    {date}
                </Typography>

            </Accordion>
        </div>
    );
}
export function ClubCardAccordion(props) {
    const classes = useStyles();
    const {content,title} = props

    return (
        <div className={classes.root}>
            <Accordion className={classes.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography className={classes.title} gutterBottom variant="subtitle1" align={'left'}>
                        {title}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant="caption"  >
                        {content}
                    </Typography>

                </AccordionDetails>
            </Accordion>
        </div>
    );
}

export function EventCardAccordion(props) {
    const classes = useStyles();
    const {description,title, location, cost,startDate,endDate} = props

    return (
        <div className={classes.root}>
            <Accordion className={classes.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />} className={classes.accordion}
                >
                    <Typography className={classes.title} gutterBottom variant="subtitle1" align={'left'}>
                        {title}
                    </Typography>
                </AccordionSummary>
                    <Grid item xs={12}>
                        <Typography variant="caption"  align={'left'} >
                            {description}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="caption"  align={'left'} >
                            {location} • {cost}
                        </Typography>
                    </Grid>


            </Accordion>
        </div>
    );
}
