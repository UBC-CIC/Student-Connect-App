import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {Link} from "@material-ui/core";

function Copyright() {
    const classes = useStyles();

    return (
        <Typography variant="body2" className={classes.link} align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://cic.ubc.ca/" target = "_blank" >
                UBC CIC
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
        backgroundColor:"#002145",
        bottom:"0",
        width:"100%",

    },
    link:{
        color:"white"
    }
}));
const footers = [
    {
        title: 'UBC CIC',
        link: 'https://cic.ubc.ca/'
    },
    {
        title: 'MIT License',
        link: 'https://github.com/UBC-CIC/UBCO-StudentEngagementApp/blob/frontend/LICENSE'
    },
    {
        title: 'Attribution',
        link: 'https://github.com/UBC-CIC/UBCO-StudentEngagementApp/blob/frontend/ATTRIBUTIONS'
    }
];

export default function Footer() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            {/* Footer */}
            <Container maxWidth="xl" component="footer" className={classes.footer}>
                <Container maxWidth="md">
                    <Grid container spacing={4} justify="space-evenly">
                        {footers.map((footer) => (
                            <Grid item md={4} xs={2} key={footer.title}>
                                <Typography variant="body1"  gutterBottom align={'center'}  >
                                    <Link href={footer.link} className={classes.link} target = "_blank" align={'center'} >
                                        {footer.title}
                                    </Link>
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                    <Box mt={5}>
                        <Copyright />
                    </Box>

                </Container>
            </Container>
            {/* End footer */}
        </React.Fragment>
    );
}