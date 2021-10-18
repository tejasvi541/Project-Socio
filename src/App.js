import './App.css';
import Home from './Pages/Home/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/home/signin">
          <Home in={true} up={false} />
        </Route>
        <Route exact path="/home/signup">
          <Home up={true} in={false} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
