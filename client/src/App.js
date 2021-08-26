import "./App.css";
import { Switch, Route } from "react-router-dom";
import { LandingPage, DashBoardPage, MenuPage } from "./pages";

function App() {
  return (
    <Switch>
      <Route path="/" exact={true} component={LandingPage} />
      <Route path="/menu" exact={true} component={MenuPage} />
      <Route path="/dashboard/:id" exact={true} component={DashBoardPage} />
    </Switch>
  );
}

export default App;
