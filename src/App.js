import React, { useEffect, Suspense, lazy } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import Spinner from "./components/UI/Spinner/Spinner";

const AsyncCheckout = lazy(() => {
  return import("./containers/Checkout/Checkout");
});

const AsyncOrders = lazy(() => {
  return import("./containers/Orders/Orders");
});

const AsyncAuth = lazy(() => {
  return import("./containers/Auth/Auth");
});

const app = (props) => {
  const { onTryAutoSignUp } = props;
  useEffect(() => {
    onTryAutoSignUp();
  }, [onTryAutoSignUp]);

  let routes = (
    <Suspense fallback={<Spinner />}>
      <Switch>
        <Route path="/auth" component={AsyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
  if (props.isAuthenticated) {
    routes = (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/checkout" component={AsyncCheckout} />
          <Route path="/orders" component={AsyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={AsyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );
  }

  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
