import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Banner from './components/Banner';
import Quiz from './components/Quiz';
import Landing from './components/Landing';

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/host">
            <Banner />
            <Quiz />
          </Route>
          <Route path="/join">
            <Banner />
            <Quiz />
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
