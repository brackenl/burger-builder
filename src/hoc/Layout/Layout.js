import React, { useState } from "react";
import { connect } from "react-redux";

import Aux from "../Aux/Aux";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const sideDrawerOpenHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };

  return (
    <Aux>
      <Toolbar
        openDrawer={sideDrawerOpenHandler}
        isAuth={props.isAuthenticated}
      />
      <SideDrawer
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
        isAuth={props.isAuthenticated}
      />
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className={classes.content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
  };
};

export default connect(mapStateToProps)(layout);
