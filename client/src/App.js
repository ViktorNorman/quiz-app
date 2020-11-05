import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import './App.css';
import Answers from './components/Answers';
import Banner from './components/Banner';
import InputField from './components/InputField';
import Quiz from './components/Quiz';
import Landing from './components/Landing';


function App() {
  // let clientSystem = navigator.appVersion;
  // clientSystem = clientSystem.split(" ");
  // console.log(clientSystem[3]);
  return (
    <Router>
      <div className="app">
        <Switch>
        <Route path="/host">
          <Banner />
          <Quiz />
          <InputField />
          <Answers />
        </Route>
        <Route path="/join">
          <Banner />
          <Quiz />
          <InputField />
          <Answers />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

// {/* {clientSystem[3] !== 'Mac' ? <p>ISTONE</p> : ''} */}