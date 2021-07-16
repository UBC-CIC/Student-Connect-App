import {Card} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {NewsCardAccordion} from "../Accordion/Accordions";
import Typography from "@material-ui/core/Typography";
import {Tag} from "../Tags/Tag";
import CardFooterButtons from "../Button/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {connect} from "react-redux";
import {updateSavedItems} from "../../actions/savedItemsAction";
const useStyles = makeStyles((theme) => ({
    root: {

    },
    bigCard:{
        padding: theme.spacing(2),
        height: "100%",
        margin:'none',
        boxShadow: "0 3px 5px 0 rgba(0,0,0,0.2)",
        '&:hover':{
            boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)"
        }

    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        width: 128,

    },
    learnMoreButton:{
        textTransform:"none",
        backgroundColor:"#0055B7",
        color:"white",
        fontSize:'11px',
        borderRadius:"3",
        marginRight:theme.spacing(1)

    },
    title:{
        fontWeight:"500",
        float:'left'
    },

}));

function SavedItemCard(props){

    const classes = useStyles();
    const {title, photo, link,savedItems,updateSavedItems} = props
    function deleteItem(){
        for(let i=0;i<savedItems.savedItems.length;i++){
            if(savedItems.savedItems[i].link===link){
                savedItems.savedItems.splice(i, 1)
            }
        }
        updateSavedItems(savedItems)


    }
    return(
        <Card className={classes.bigCard}>
            <div className={classes.root} >
                <Grid container spacing={2}>
                    <Grid item>
                        <img className={classes.img} alt="img" src={photo} />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>

                            <Grid item>
                                <Typography className={classes.title} gutterBottom variant="subtitle1" align={'left'}>
                                    {title}
                                </Typography>

                            </Grid>
                            <Grid item>
                                <Button className={classes.learnMoreButton} endIcon={<ChevronRightIcon/>} href={link} target = "_blank">
                                    Read more
                                </Button>
                                <Button className={classes.learnMoreButton} endIcon={<DeleteIcon/>} onClick={deleteItem} target = "_blank">
                                    Remove
                                </Button>

                            </Grid>

                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Card>
    )

}
const mapStateToProps = (state) => {
    return {
        savedItems:state.savedItems
    };
};
const mapDispatchToProps = {
    updateSavedItems,
};

export default connect(mapStateToProps,mapDispatchToProps)(SavedItemCard);
