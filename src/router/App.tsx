import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Landing from "../components/templates/Landing";
import Main from "../components/templates/Main";
import Mypage from "../components/templates/Mypage";
import Survey from "../router/Survey";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/main" component={Main} />
        <Route path="/survey" component={Survey} />
        <Route path="/userInfo" component={Mypage} />
        <Redirect path="*" to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
