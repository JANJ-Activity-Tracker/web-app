import React, { useState, useEffect } from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        align: "left",
        height: "100%",
        minHeight: "300px",
        [theme.breakpoints.down('sm')]: {
            minHeight: "250px"
        },
    },
    body: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -40%)",
    },
    text: {
        color: "white",
    },
    bodyText: {
        color: "white",
        [theme.breakpoints.down('md')]: {
            fontSize: 30
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 20
        },
    },
    divider: {
        color: "white"
    }
}));

export default function Stats({ log }) {
    const classes = useStyles();
    const [numEvents, setNumEvents] = useState("Loading...");
    const [hours, setHours] = useState("Loading...");

    function updateStats() {
        setNumEvents(log.length);
        let totalHours = 0;
        for (let i = 0; i < log.length; i++) {
            totalHours += parseFloat(log[i].hours);
        }
        setHours(totalHours);
        console.log("update stats");
    }

    useEffect(() => {
        if (log.length !== undefined && log.length >= 0) {
            updateStats();
            const interval = setInterval(updateStats, 300000);
            return () => {
                clearInterval(interval);
            }
        }
    })

    return (
        <div className={classes.root} align="center">
            <Typography variant="h4" className={classes.text}>Stats</Typography>
            <br />
            <div align="left" className={classes.body} >
                <Typography variant="h5" className={classes.bodyText}>Number of Events: </Typography>
                <Typography variant="h3" className={classes.bodyText}> <b>{numEvents} </b></Typography>
                <hr class="solid" className={classes.divider}></hr>
                <Typography variant="h5" className={classes.bodyText}>Total Hours: </Typography>
                <Typography variant="h3" className={classes.bodyText}><b>{hours} </b></Typography>
            </div>
        </div>
    )
}