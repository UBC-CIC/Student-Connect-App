export default async function getTokens() {
    const location = window.location;
    const client_id = process.env.REACT_APP_CLIENTID;
    const callback_uri = process.env.REACT_APP_CALLBACK_URI;
    const cognito_app_url = process.env.REACT_APP_COGNITO_APP_URL;
    const token_url = `${cognito_app_url}/oauth2/token`;

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
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

}