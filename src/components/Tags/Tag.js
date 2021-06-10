
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import {Button, withStyles} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
const StyledButton = withStyles({
    root: {
        background: '#0055B7',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 20,
        padding: '0 15px',
        marginLeft:'5px'
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
        <div>

            {categories.map(category => <StyledButton  >
                {category}</StyledButton>)}
        </div>
        // <StyledButton>{categories[0]}</StyledButton>
    )


}


export function Lduh(props){
    const {categories} = props
    console.log(categories)

    return(
        <div>
        {categories.map(category => <StyledButton  >
            {category}</StyledButton>)}
        </div>
    )

}