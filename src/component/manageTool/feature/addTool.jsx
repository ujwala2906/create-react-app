import React, { useState } from "react";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import {
  IconButton,
  Typography,
  Container,
  CardActions
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Tool, Subscription } from "./subFeature";

const AddTool = () => {
  const [stage, setStage] = useState(false);

  const handlePage = () => setStage(prevState => !prevState);

  const Footer = () => {
    return (
      <>
        <IconButton color="primary" style={{ marginLeft: "auto" }} onClick={handlePage}>
          {!stage && (
            <NavigateNextIcon style={{ fontSize: 40 }}  />
          )}
        </IconButton>
        <IconButton color="primary"  onClick={handlePage}>
          {stage && (
            <NavigateBeforeIcon style={{ fontSize: 40 }} />
          )}
        </IconButton>
      </>
    );
  };

  const useStyles = makeStyles(() => ({
    expand: {
      marginLeft: "auto"
    }
  }));

  const classes = useStyles();

  return (
    <>
      <Container>
        {!stage && <Tool />}
        {stage && <Subscription />}
        <CardActions>
          <Footer className={classes.expand} />
        </CardActions>
      </Container>
    </>
  );
};
export default AddTool;
