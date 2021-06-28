import {Button} from "@material-ui/core";

export default function SignIn(){
    return(
        <Button href={process.env.REACT_APP_SignInUrl}> Sign in </Button>
    )
}