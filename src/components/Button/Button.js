import Button from "@material-ui/core/Button";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
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

export function CardFooterButtons(props){
    const classes = useStyles();

    const {link} = props
    return (
        <div>
            <Button className={classes.learnMoreButton} endIcon={<ChevronRightIcon/>} href={link} target = "_blank">
                Read more
            </Button>
            <Button className={classes.learnMoreButton} endIcon={<FavoriteBorderIcon/>}>
                Favourite
            </Button>
        </div>

)
}