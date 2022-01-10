import React, { useState, useEffect } from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        height: "100%",
        minHeight: "600px",
        [theme.breakpoints.down('sm')]: {
            minHeight: "500px"
        },
    },
    body: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    text: {
        color: "white",
        paddingBottom: "20px"
    },
    bodyText: {
        color: "white",
        [theme.breakpoints.down('md')]: {
            fontSize: 27
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 20
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 17
        },
    },
    divider: {
        color: "white"
    }
}));

export default function AdminStats({ stats }) {
    const classes = useStyles();

    return (
        <div className={classes.root} align="center">
            <Typography variant="h4" className={classes.text}>Stats</Typography>
            <br /><br />
            <div align="left" className={classes.body}>
                <Typography variant="h5" className={classes.bodyText}>Number of Accounts: </Typography>
                <Typography variant="h3" className={classes.bodyText}> <b>{stats && stats.num_accounts ? stats.num_accounts : "0"}</b></Typography>
                <hr class="solid" className={classes.divider}></hr>
                <Typography variant="h5" className={classes.bodyText}>Number of Active Volunteers: </Typography>
                <Typography variant="h3" className={classes.bodyText}> <b>{stats && stats.num_active_volunteers ? stats.num_active_volunteers : "0"}</b></Typography>
                <hr class="solid" className={classes.divider}></hr>
                <Typography variant="h5" className={classes.bodyText}>Total Volunteer Hours: </Typography>
                <Typography variant="h3" className={classes.bodyText}> <b>{stats && stats.total_hours
                    ? stats.total_hours : "0"}</b> </Typography>
                <hr class="solid" className={classes.divider}></hr>
                <Typography variant="h5" className={classes.bodyText}>Number of Logs:  </Typography>
                <Typography variant="h3" className={classes.bodyText}><b>{stats && stats.num_logs ? stats.num_logs : "0"}</b></Typography>
            </div>
        </div>
    )
}