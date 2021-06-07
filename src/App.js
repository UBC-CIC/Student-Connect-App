import logo from './logo.svg';
import './App.css';
import EventCard from "./components/Cards/EventCard";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./views/Home";
import {BrowserRouter as Router, Switch,Route,Redirect} from 'react-router-dom';
import Clubs from './views/Clubs'
import Events from "./views/Events";
import Settings from "./views/Settings";
import News from './views/News'
function App() {
  return (
    <div className="App">
      <Router>
        <Redirect to="/home" />
        <Navbar/>
          <Route path ='/home' exact component={Home}/>
          <Route path ='/clubs' exact component={Clubs}/>
          <Route path ='/events' exact component={Events}/>
          <Route path ='/settings' exact component={Settings}/>
          <Route path ='/news' exact component={News}/>
        <Footer/>
        </Router>



    </div>
  );
}

export default App;
