import { Route, Switch, withRouter } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import SubmissionForm from "./Pages/SubmissionForm";


function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={Homepage} exact/>
        <Route path="/add-profile" component={SubmissionForm} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
