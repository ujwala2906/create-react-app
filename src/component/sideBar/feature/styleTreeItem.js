import React from 'react';
import TreeItem from "@material-ui/lab/TreeItem";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

import { useTreeItemStyles } from "../style";

const StyleTreeItem = (props) => {
    const classes = useTreeItemStyles();
    const { labelText, labelIcon: LabelIcon, ...other } = props;

    return (
        <>
            <TreeItem
                label={
                    <div className={classes.labelRoot}>
                        <LabelIcon color="inherit" className={classes.labelIcon} />
                        <Typography variant="subtitle1" className={classes.labelText}>
                            {labelText}
                        </Typography>
                    </div>
                }
                classes={{
                    root: classes.root,
                    content: classes.content,
                    expanded: classes.expanded,
                    selected: classes.selected,
                    group: classes.group,
                    label: classes.label
                }}
                {...other}
            />
        </>
    )
};
StyleTreeItem.defaultProps = {
    labelText: "",
    labelIcon: [{}]
};


StyleTreeItem.propTypes = {
    labelText:PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
};

export default StyleTreeItem;