import {Button, withStyles} from "@material-ui/core";
import React from "react";

const StyledButton = withStyles({
    root: {
        background: '#40B4E5',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 20,
        padding: '15px',
        marginRight:'5px',
        marginTop:'10px',
    },
    label: {
        textTransform: 'capitalize',
        fontSize:'11px'
    },
})(Button);

export function Tag(props){
    const {categories} = props
    return(
            categories ?
                    <div>
                    {categories.map(category =>
                        <StyledButton>{category}</StyledButton>)}
                    </div>
                : null

    )


}


