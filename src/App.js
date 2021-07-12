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
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Explore from "./views/Explore";
import AWS from 'aws-sdk';
import React, {useEffect} from "react";
import {fetchAllNews, fetchAllSportsNews, fetchNews, fetchSportsNews} from "./actions/newsActions";
import {connect} from "react-redux";
import {fetchAllEvents, fetchEvents} from "./actions/eventsAction";
import {fetchAllBlogs, fetchBlogs} from "./actions/blogsAction";
import {fetchAllClubs, fetchClubs} from "./actions/clubAction";
import {Amplify, Auth} from 'aws-amplify';
import {AmplifySignOut} from "@aws-amplify/ui-react";
import {getUserPreferenceAction} from "./actions/userAction";
import SignIn from "./views/SignIn";
import awsConfig from '../src/aws-exports'

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

const main = async () => {
  AWS.config.update({
    accessKeyId: process.env.REACT_APP_accessKeyId,
    secretAccessKey: process.env.REACT_APP_secretAccessKey,
    sessionToken:process.env.REACT_APP_sessionToken,
    region: 'ca-central-1',
  });



};

main().catch(error => console.error(error));

function App(props) {
  const classes = useStyles();
  const{fetchNews, fetchEvents,fetchBlogs,fetchClubs,fetchAllClubs,fetchAllEvents,
    fetchAllNews,fetchAllBlogs,fetchSportsNews, fetchAllSportsNews,getUserPreferenceAction,user}= props
  console.log(user)
  const signInUrl = process.env.REACT_APP_SignInUrl

  useEffect(() => {
    Amplify.configure(awsConfig);
    Auth.currentAuthenticatedUser().then((response)=>{
      console.log(response)
    }).catch((err) => {
      console.log(err);
    })

    main()
    fetchNews()
    fetchEvents()
    fetchBlogs()
    fetchClubs()
    fetchAllClubs()
    fetchAllEvents()
    fetchAllNews()
    fetchAllBlogs()
    fetchSportsNews()
    fetchAllSportsNews()
    // getUserPreferenceAction('cyedward')

  }, []);

  return (
    <div className={classes.app}>
        <Navbar/>
        <Container className={classes.container} >
          <Route path ='/' exact component={Home}/>
          <Route path ='/explore' exact component={Explore}/>
          <Route path ='/clubs' exact component={Clubs}/>
          <Route path ='/events' exact component={Events}/>
          <Route path ='/settings' exact component={Settings}/>
          <Route path ='/news' exact component={News}/>
          <Route path = '/survey' exact component={Survey}/>
        </Container>
        <Footer/>
        <AmplifySignOut/>




    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // isLoading: state.applicationStatus.startupLoading,
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
  getUserPreferenceAction
};

export default (connect(mapStateToProps, mapDispatchToProps)(App));