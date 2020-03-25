import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";


// features
import { StyleTreeItem, TreeViewItem } from "./feature";
import { ScrollItem } from "./style";

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
      <ScrollItem>
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
            <TreeViewItem nodeId="2" labelText="All" />
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
        </TreeView>
      </ScrollItem>
    </>
  );
};

export default SideBar;
