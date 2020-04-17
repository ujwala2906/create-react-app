import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import { manageToolCms } from "./cms";

const ManageTool = props => {
  const { match } = props;
  const { path } = match;
  
  return (
    <>
      <Link to={`${path}/add-tool`}  style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddIcon fontSize="small" />}
        >
          {manageToolCms.addNewTool}
        </Button>
      </Link>
    </>
  );
};
export default ManageTool;
