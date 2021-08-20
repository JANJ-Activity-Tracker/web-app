import React, { useState } from "react";
import { Button, Link, makeStyles, Paper, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        height: "100vh",
        width: "100%",
        zIndex: 0,
    },
    paper: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "fit-content",
        padding: "30px",
        paddingBottom: "50px",
        boxShadow: "2px 2px 10px 0",
    }
}));

export default function Login({ setPage, setToken }) {
    const classes = useStyles();

    return (
        <div align="center" className={classes.root}>
            <Paper className={classes.paper}>
                <Typography variant="h4" className={classes.title}>
                    Welcome!
                </Typography>
            </Paper>
        </div>
    )
}