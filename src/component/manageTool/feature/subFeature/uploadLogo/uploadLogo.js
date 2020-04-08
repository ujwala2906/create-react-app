import React, { useState } from "react";
import { Grid, Box, Button, IconButton, Avatar } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

import { toolCms, placeholder } from "../../../cms";

const UploadLogo = (props) => {

    const { renderTextField, onClick, error, message, } = props;

    const [name, setName] = useState();
    const [img, setImg] = useState();

    const handleChange = (event) => {
        const fileData = event.target.files;
        var reader = new FileReader();
        reader.readAsDataURL(fileData[0]);
        reader.onloadend = function (e) {
            setImg(reader.result);
        }

        const fileName = fileData[0].name;
        setName(fileName);
    };

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        large: {
            width: theme.spacing(15),
            height: theme.spacing(15),
        },
    }));

    const ok =()=>{
        alert("ok")
    }

    const renderImage = () => {
        return (
            <>

                <Avatar sizes="" alt="Remy Sharp" src={img} className={classes.large} variant="square">
                    <IconButton aria-label="delete" onClick={ok}>
                        <CloseIcon />
                    </IconButton>
                </Avatar>
            </>
        )
    };

    const classes = useStyles();

    return (
        <>
            <Grid item xs={2}>
                {renderImage()}
            </Grid>
            <Grid item xs={2}>
                <Button
                    variant="contained"
                    component="label"
                    style={{ borderRadius: 20, marginTop: 35 }}
                >
                    {toolCms.chooseLogo}
                    <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleChange}
                    />
                </Button>
            </Grid>
            <Grid item xs={8}>
                {renderTextField(placeholder.noFileChosen, name, onClick, error, message, {
                    style: { marginTop: 35 }
                })}
            </Grid>
        </>
    )
}
export default UploadLogo;