import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header";
import { connect } from "react-redux";
import * as actions from "./store/actions/authAction";

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => (
  <React.Fragment>
    <h2>Landing</h2>
    <a href="/auth/google">
      <button>Sign in with Google</button>
    </a>
  </React.Fragment>
);

const App = props => {
  useEffect(() => {
    props.fetchUser();
  });

  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Route path="/" exact component={Landing}></Route>
        <Route path="/surveys" exact component={Dashboard}></Route>
        <Route path="/surveys/new" component={SurveyNew}></Route>
      </BrowserRouter>
    </div>
  );
};

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchUser: () => dispatch(authActions.fetchUser())
//   };
// };

export default connect(null, actions)(App);
