import React from 'react';
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";

import useTreeItemStyles from "../style";

const TreeViewItem = (props) => {
    const classes = useTreeItemStyles();
    const { labelText, ...other } = props;
    return (
        <>
            <TreeItem
                nodeId="3"
                label={
                    <div className={classes.labelRoot}>
                        <Typography variant="subtitle1" className={classes.labelText}>
                            {labelText}
                        </Typography>
                    </div>
                }
                classes={{
                    root: classes.root,
                    content: classes.content
                }}
                {...other}
            />
        </>
    )
};

export default TreeViewItem;