
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',

    },
    accordion:{
        boxShadow:"none",
        paddingRight:"20px"

    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    title:{
        fontWeight:"500"
    }
}));

export function NewsCardAccordion(props) {
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
                    <Typography variant="caption"  align={'left'} >
                        {content}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
