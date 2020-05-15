import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { Route } from "react-router-dom";

import SideBar from "../sideBar";
import ManageTool from "../manageTool";
import AddTool from "../manageTool/feature";
import Tools from "../manageTool/feature/tools";
import Endorsement from "../endorsements";
import Task from "../taskManagement";


import useStyles from "./style";


const Dashboard = (props) => {
  const { match } = props;
  const { path } = match;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="default">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <div className={classes.toolbar} />
            <Divider />
            <SideBar />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Route path="/all" exact component={Task} />
        <Route path={`${path}manage-tool`} exact component={ManageTool} />
        <Route path="/manage-tool/add-tool" exact component={Tools} />
      </main>
    </div>
  );
}

export default Dashboard;
