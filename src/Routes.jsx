import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { ResultsPage } from "./pages/ResultsPage";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route path="/results" component={ResultsPage} />
      </Switch>
    </BrowserRouter>
  );
};
