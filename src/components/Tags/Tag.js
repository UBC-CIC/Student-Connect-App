
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import {Button, IconButton, withStyles} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import TwitterIcon from "@material-ui/icons/Twitter";
import React from "react";
const StyledButton = withStyles({
    root: {
        background: '#40B4E5',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 20,
        padding: '0 15px',
        marginRight:'5px'
    },
    label: {
        textTransform: 'capitalize',
        fontSize:'9px'
    },
})(Button);

// function createTags(categories){
//     for(var i =0;i<categories.length;i++){
//
//     }
// }
export function Tag(props){
    const {categories} = props
    return(
            categories ?
                    <div>
                    {categories.map(category =>
                        <StyledButton>{category}</StyledButton>)}
                    </div>
                : null

        // <StyledButton>{categories[0]}</StyledButton>
    )


}


export function Lduh(props){
    const {categories} = props

    return(
        <div>
        {categories.map(category => <StyledButton  >
            {category}</StyledButton>)}
        </div>
    )

}