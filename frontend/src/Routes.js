import { lazy, useEffect } from "react";
import { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";

const DashboardContainer = lazy(() => import("./containers/DashBoard"));
const NotFound = lazy(() => import("./containers/NotFound"));
const UserAuth = lazy(() => import("./containers/UserAuth"));
const Routes = () => {
  return (
    <div>
      <Suspense fallback={"loading"}>
        <Router>
          <Switch>
            <Route path="/auth" exact component={UserAuth} />
            <Route path="" component={DashboardContainer} />
            {/* keet that last */}
            <Route path="*" exact component={NotFound} status={404} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
};

export default Routes;
