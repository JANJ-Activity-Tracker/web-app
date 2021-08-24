import React, { useState, useEffect } from "react";
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

export default function Stats({ log }) {
    const classes = useStyles();
    const [numVolunteerEvents, setNumVolunteerEvents] = useState("Loading...");
    const [numParticipantEvents, setNumParticipantEvents] = useState("Loading...");
    const [hours, setHours] = useState("Loading...");

    function updateStats() {
        setNumVolunteerEvents(log.filter(event => event.role === "Volunteer" || event.role === "volunteer").length);
        setNumParticipantEvents(log.filter(event => event.role === "Participant" || event.role === "participant").length);
        let totalHours = 0;
        for (let i = 0; i < log.length; i++) {
            totalHours += parseFloat(log[i].prep_hours);
            totalHours += parseFloat(log[i].event_hours);
        }
        setHours(totalHours);
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
        <div className={classes.root}>
            <div align="left" >
                <Typography variant="h2" className={classes.text}>Stats</Typography>
                <br />
                <Typography variant="h3" className={classes.text}>Volunteer Events: {numVolunteerEvents} </Typography>
                <Typography variant="h3" className={classes.text}>Participant Events: {numParticipantEvents} </Typography>
                <Typography variant="h3" className={classes.text}>Hours: {hours} </Typography>
            </div>
        </div>
    )
}