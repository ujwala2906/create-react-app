import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import EditIcon from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";

// features
import { StyleTreeItem, TreeViewItem } from "./feature";

const SideBar = () => {
  const useStyles = makeStyles({
    root: {
      height: 264,
      flexGrow: 1,
      maxWidth: 400
    }
  });
  const classes1 = useStyles();

  return (
    <>
      <TreeView
        className={classes1.root}
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
      >
        <StyleTreeItem
          nodeId="1"
          labelText="Browse Tools"
          labelIcon={DashboardIcon}
        >
          <Link to="/all" style={{ textDecoration: "none" }}>
            <TreeViewItem nodeId="2" labelText="All" />
          </Link>
          <TreeViewItem nodeId="3" labelText="Insight Type">
            <TreeViewItem nodeId="4" labelText="Audience" />
            <TreeViewItem nodeId="5" labelText="Business Intelligence" />
            <TreeViewItem nodeId="6" labelText="Category & Competitive" />
            <TreeViewItem nodeId="7" labelText="Culture & Trends" />
            <TreeViewItem nodeId="8" labelText="Media" />
          </TreeViewItem>
        </StyleTreeItem>
        <StyleTreeItem
          nodeId="9"
          labelText="Saved Tools"
          labelIcon={BookmarkIcon}
        />
        <StyleTreeItem nodeId="10" labelText="Admin Suit" labelIcon={EditIcon}>
          <Link to="/manage-tool" style={{ textDecoration: "none" }}>
            <TreeViewItem nodeId="11" labelText="Manage Tool" />
          </Link>
          <TreeViewItem nodeId="12" labelText="Manage Waitlist" />
        </StyleTreeItem>
      </TreeView>
    </>
  );
};

export default SideBar;
