import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import {connect} from "react-redux";
import {updateSavedItems} from "../../actions/savedItemsAction";

const useStyles = makeStyles((theme) => ({
    learnMoreButton:{
        textTransform:"none",
        backgroundColor:"#0055B7",
        color:"white",
        fontSize:'11px',
        borderRadius:"3",
        marginRight:theme.spacing(1)

    }


}));
 function CardFooterButtons(props){
    const classes = useStyles();
     const {savedItems}=props

    const {link,title,photo,updateSavedItems} = props

     function duplicatesExist(){
         for(let i =0;i<savedItems.savedItems.length;i++){
             if(savedItems.savedItems[i].link===link){
                 return true
             }
         }
         return false

     }
     function addItemIntoSaved(){
         if(!duplicatesExist()){
             savedItems.savedItems.push({
                 title:title,
                 image:photo,
                 link:link,
             })
             updateSavedItems(savedItems)

         }
     }

     return (
        <div>
            <Button className={classes.learnMoreButton} endIcon={<ChevronRightIcon/>} href={link} target = "_blank">
                Read more
            </Button>
            <Button className={classes.learnMoreButton} endIcon={<BookmarkIcon/>} onClick={addItemIntoSaved}>
                Save
            </Button>
        </div>


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

export default connect(mapStateToProps,mapDispatchToProps)(CardFooterButtons);