import './App.css';
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./views/Home";
import Survey from "./views/Survey/Survey";
import {BrowserRouter as Router, Switch,Route,Redirect} from 'react-router-dom';
import Clubs from './views/Clubs'
import Events from "./views/Events";
import Settings from "./views/Settings";
import News from './views/News'
import {Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Explore from "./views/Explore";
import AWS from 'aws-sdk';
import {useEffect} from "react";
import {fetchNews} from "./actions/newsActions";
import { connect } from "react-redux";

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

  const params = {
    FunctionName: process.env.REACT_APP_FunctionName,
    Payload:JSON.stringify({
      'index': "news",
      'categories': "Health",
    }),
  };
  const result = await (new AWS.Lambda().invoke(params).promise());
  console.log('Success!');
  let data = JSON.parse(result.Payload);
  console.log(data.hits.hits)

};

main().catch(error => console.error(error));

function App(props) {
  const classes = useStyles();
  const{fetchNews}= props

  useEffect(() => {
    main()
    console.log("hello")
    fetchNews()
  }, []);

  return (
    <div className={classes.app}>
      <Router>
        <Redirect to="/home" />
        <Navbar/>
        <Container className={classes.container} >
          <Route path ='/home' exact component={Home}/>
          <Route path ='/explore' exact component={Explore}/>
          <Route path ='/clubs' exact component={Clubs}/>
          <Route path ='/events' exact component={Events}/>
          <Route path ='/settings' exact component={Settings}/>
          <Route path ='/news' exact component={News}/>
          <Route path = '/survey' exact component={Survey}/>

        </Container>
        <Footer/>
        </Router>



    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    // isLoading: state.applicationStatus.startupLoading,
  };
};

const mapDispatchToProps = {
  fetchNews
};

export default (connect(mapStateToProps, mapDispatchToProps)(App));