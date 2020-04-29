import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import { manageToolCms } from "./cms";

import { Table } from "../index";

const ManageTool = props => {
  const { match } = props;
  const { path } = match;

  return (
    <>
      <Link to={`${path}/add-tool`} style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddIcon fontSize="small" />}
        >
          {manageToolCms.addNewTool}
        </Button>
        <br />
      </Link>
      <br />
      <Table />
    </>
  );
};
export default ManageTool;
