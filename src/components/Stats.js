import React, { useState } from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        align: "left",
        height: "100%"
    },
    body: {
        position: "absolute",
        top: "50%",
        transform: "translate(0, -50%)",
    },
    text: {
        color: "white",
    },
}));

export default function Stats() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div align="left" >
                <Typography variant="h2" className={classes.text}>Stats</Typography>
                <br />
                <Typography variant="h3" className={classes.text}>Events</Typography>
                <Typography variant="h3" className={classes.text}>Hours</Typography>
                <Typography variant="h3" className={classes.text}>Level</Typography>
            </div>
        </div>
    )
}