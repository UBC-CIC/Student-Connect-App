import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./views/Home";
import Survey from "./views/Survey/Survey";
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';
import Clubs from './views/Clubs'
import Events from "./views/Events";
import Settings from "./views/Settings";
import News from './views/News'
import {Container, IconButton} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Explore from "./views/Explore";
import AWS from 'aws-sdk';
import React, {useEffect, useRef, useState} from "react";
import {fetchAllNews, fetchAllSportsNews, fetchNews, fetchSportsNews} from "./actions/newsActions";
import {connect} from "react-redux";
import {fetchAllEvents, fetchEvents} from "./actions/eventsAction";
import {fetchAllBlogs, fetchBlogs} from "./actions/blogsAction";
import {fetchAllClubs, fetchClubs} from "./actions/clubAction";
import {Amplify, API, Auth, graphqlOperation} from 'aws-amplify';
import {AmplifySignOut} from "@aws-amplify/ui-react";
import {createUserDataAction, getUserPreferenceAction} from "./actions/userAction";
import SignIn from "./views/SignIn";
import awsConfig from '../src/aws-exports'
import { useHistory } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import {getUserPreference} from "./graphql/queries";
import {listToString} from "./helpers/PreferenceListToString";
import LoadingScreen from "./views/LoadingScreen";
const useStyles = makeStyles((theme) => ({
  container:{
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },

    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(1),

  },
  app:{
    backgroundColor:"#fafafa"
  }

}));



function App(props) {
  const classes = useStyles();
  const{fetchNews, fetchEvents,fetchBlogs,fetchClubs,fetchAllClubs,fetchAllEvents,
    fetchAllNews,fetchAllBlogs,fetchSportsNews, fetchAllSportsNews,getUserPreferenceAction,currentUser,
    userPreference,createUserDataAction}= props
  const signInUrl = process.env.REACT_APP_SignInUrl
  let history = useHistory();
  const [UID,setUID] =  useState(null)
  const [firstTime,setFirstTime] = useState(null)
  const [user, setUser] = useState(null)
  const [preference,setPreference]=useState(null)
  let pref

  async function checkUserLogInFirstTime(Id){
    await API.graphql(graphqlOperation(getUserPreference, {id: UID})).then((response) => {
      if (response.data.getUserPreference !== null) {
        pref=response.data.getUserPreference

        setFirstTime(false)
      } else {
        setFirstTime(true)
      }
    })
  }


  useEffect( async () => {
    Amplify.configure(awsConfig);
    if (currentUser) {
      let credentials = await Auth.currentCredentials()
      AWS.config.update({
        credentials,
        region: 'ca-central-1',
      });
      setUID(currentUser.attributes['custom:SP-PUID'])
      if (UID) checkUserLogInFirstTime(UID)
    }
    getUserPreferenceAction(currentUser.attributes['custom:SP-PUID'])
    setUser(currentUser)

    setPreference(userPreference)



    fetchAllClubs()
    fetchAllEvents()
    fetchAllNews()
    fetchAllBlogs()
    fetchAllSportsNews()


  }, [UID,user,preference]);

  return (
    <div className={classes.app}>
      {firstTime && (
      <div>
            <Redirect to={'/survey'}/>
            <Route
                path='/survey'
                render={(props) => (
                    <Survey {...props} UID={UID} user={user} />
                )}
            />
          </div>
          )}
      {(!firstTime)&&(
          <div>
            <Redirect to={'/'}/>
            <Navbar/>
            <Container className={classes.container} >
              <Route
                  path='/'
                  render={(props) => (
                      <LoadingScreen {...props} preference={userPreference} user={user} />
                  )} exact component={LoadingScreen}
              />

              <Route path ='/explore' exact component={Explore}/>
              <Route path ='/clubs' exact component={Clubs}/>
              <Route path ='/events' exact component={Events}/>
              <Route path ='/settings' exact component={Settings}/>
              <Route path ='/news' exact component={News}/>
            </Container>
            <Footer/>
          </div>
      )}


      }



    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userPreference: state.userPreference,
    currentUser:state.currentUser
  };
};

const mapDispatchToProps = {
  fetchNews,
  fetchEvents,
  fetchBlogs,
  fetchClubs,

  fetchAllClubs,
  fetchAllEvents,
  fetchAllNews,
  fetchAllBlogs,
  fetchSportsNews,
  fetchAllSportsNews,
  getUserPreferenceAction,
  createUserDataAction
};

export default (connect(mapStateToProps, mapDispatchToProps)(App));