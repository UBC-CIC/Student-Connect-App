import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import {clubCategories} from "../../assets/ClubCategories";
import {connect} from "react-redux";
import ClubCard from "../Cards/ClubCard";
import Button from "@material-ui/core/Button";
import {Accordion, AccordionDetails} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import CategoryIcon from '@material-ui/icons/Category';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    tabBar:{
        background: '#0055B7',

    },
    indicator:{
        backgroundColor:"#6EC4E8"

    },
    grid:{
        display: 'flex'
    },
    button:{
        backgroundColor:"#0055B7",
        color:"white",
        textTransform:'none',
        float:'left',
        paddingLeft:"20px",
        paddingRight:"20px",
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1)

    },
        title:{
        fontWeight: '400'
        },
        accordion:{
        borderBottom:"10px",
            borderBottomColor:"#00A7E1",
            boxShadow:"none"
        }
    }

));


function ClubsTabs(props) {
    const classes = useStyles();
    const {allClubs} = props
    const [currentCategory,setCurrentCategory] = React.useState("Academics");
    const currentClubs = allClubs.filter((item => item.categories.includes(currentCategory)))
    const sortedCurrentClubs = currentClubs.sort((a, b) => a.title.localeCompare(b.title))


    const clubsList=sortedCurrentClubs.map((item)=>{
        return(
            <Grid item xs={12}>
                <ClubCard title={item.title} categories={item.categories}
                          description={item.description}
                          logo={item.imageLink }
                          facebook={item.facebook}
                          twitter={item.twitter}
                          email={item.email}
                          website={item.website}
                />
            </Grid>
        )
    })

    const getCategories = (index) =>{
        setCurrentCategory(index)
    }

    return (
        <div className={classes.root}>
            <Accordion className={classes.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <CategoryIcon style={{marginRight:"20px", color:"#00A7E1"}}/>
                    <Typography className={classes.title} gutterBottom variant="subtitle1" align={'left'}>
                        Categories
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>

                <Grid container spacing={3}>
                        <Grid item>

                        {clubCategories.map((option,index)=>
                            <Button className={classes.button} label={option} onClick={()=>getCategories(option)} >
                                {option}
                            </Button>
                        )}
                        </Grid>

                    </Grid>
                </AccordionDetails>
            </Accordion>
                <Grid container spacing={4}>
                    {clubsList}
                </Grid>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        allClubs: state.allClubs,
    };
};

export default connect(mapStateToProps)(ClubsTabs);
