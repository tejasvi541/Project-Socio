import "./App.css";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Landing} />
      <div className="App">
        <Switch>
          <Route exact path="/signin">
            <Home in={true} up={false} />
          </Route>
          <Route exact path="/signup">
            <Home up={true} in={false} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
