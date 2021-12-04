import Auth from "@aws-amplify/auth";
import { connect } from "react-redux";
import {updateCredentials} from "../../actions/loginActions";

async function getTokens() {
    const location = window.location;
    const client_id = process.env.REACT_APP_CLIENTID;
    const callback_uri = process.env.REACT_APP_CALLBACK_URI;
    const cognito_app_url = process.env.REACT_APP_COGNITO_APP_URL;
    const token_url = `https://${cognito_app_url}/oauth2/token`;

    const code = new URLSearchParams(location.search).get('code');

    const params = {
        "grant_type": "authorization_code",
        "client_id": client_id,
        "code": code,
        "redirect_uri": callback_uri
    }

    await fetch(token_url, {
        method: 'POST',
        headers: { 
			'Content-Type': 'application/x-www-form-urlencoded' //; charset=utf-8
		},
        body: new URLSearchParams(params)
    })
    .then(response => response.text())
    .then(response => JSON.parse(response))
    .then(async (result) => {
        console.log(result)
        // updateCredentials(result)
        const user = await Auth.currentAuthenticatedUser();
        console.log("the user is", user)
    })
    .catch(error => console.log('error', error));

}

const mapDispatchToProps = {
    updateCredentials
};

export default connect(null, mapDispatchToProps)(getTokens);