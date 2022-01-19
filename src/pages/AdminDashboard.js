import React, { useState, useEffect } from "react";
import AdminHeader from "../adminComponents/AdminHeader";
import AdminUpcomingEvents from "../adminComponents/AdminUpcomingEvents";
import AdminPortfolio from "../adminComponents/AdminPortfolio";
import AdminAccounts from "../adminComponents/AdminAccounts";
import AdminLeaderboard from "../adminComponents/AdminLeaderboard";
import AdminStats from "../adminComponents/AdminStats";
import { Grid, makeStyles } from "@material-ui/core";
import { request } from "../util";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        width: "100vw",
        zIndex: 0,
        flexGrow: 1,
    },
    box: {
        backgroundColor: theme.palette.primary.main,
        paddingTop: "20px",
        paddingLeft: "20px",
        paddingRight: "20px",
        borderRadius: "20px",
        height: "100%",
        paddingBottom: "20px"
    },
    container: {
        marginTop: "30px",
        paddingLeft: "20px",
        paddingRight: "20px"
    },
    grid: {
        marginBottom: "20px"
    }
}));

export default function AdminDashboard({ page, setPage }) {
    const classes = useStyles();
    const [events, setEvents] = useState({});
    const [editingEvent, setEditingEvent] = useState({});
    const [accounts, setAccounts] = useState({});
    const [leaderboard, setLeaderboard] = useState({});
    const [stats, setStats] = useState({});
    const [noEvents, setNoEvents] = useState(false);

    function logout() {
        setPage("login");
        localStorage.setItem("token", "");
        localStorage.setItem("email", "");
        localStorage.setItem("is_admin", "");
    }

    // Admin Stats
    const updateStats = async () => {
        let response = await request({
            type: "GET",
            path: `admin-stats/`
        })
        setStats(response);
        console.log(response);
    };

    useEffect(() => {
        if (Object.keys(stats).length !== 0) {
            const interval = setInterval(updateStats, 300000);
            return () => {
                clearInterval(interval);
            }
        }
        else {
            updateStats();
        }
    })

    // Volunteer Hours Leaderboard  
    const updateLeaderboard = async () => {
        let response = await request({
            type: "GET",
            path: `leaderboard/` // change to any user
        })
        setLeaderboard(response);
        console.log(response);
    };

    useEffect(() => {
        if (Object.keys(leaderboard).length !== 0) {
            const interval = setInterval(updateLeaderboard, 300000);
            return () => {
                clearInterval(interval);
            }
        }
        else {
            updateLeaderboard();
        }
    })

    // JANJ events
    const updateEvents = async () => {
        let response = await request({
            type: "GET",
            path: "events/all/"
        })

        if (response.detail === "Invalid token.") {
            console.log("logout");
            logout();
        }
        else if (response.response === "No events have been added.") {
            console.log(response);
            setNoEvents(true);
        }
        else {
            setEvents(response);
            setNoEvents(false);
        }
    }

    useEffect(() => {
        if (Object.keys(events).length !== 0 || noEvents) {
            const interval = setInterval(updateEvents, 300000);
            return () => {
                clearInterval(interval);
            }
        }
        else {
            updateEvents();
        }
    })

    // JANJ specific event
    const getEvent = async (id) => {
        let response = await request({
            type: "GET",
            path: `events/${id}/`
        })
        setEditingEvent(response);
    }


    // User accounts
    const updateAccounts = async () => {
        let response = await request({
            type: "GET",
            path: "all-accounts/"
        })
        console.log(response);
        setAccounts(response);
    }

    useEffect(() => {
        if (Object.keys(accounts).length !== 0) {
            const interval = setInterval(updateAccounts, 300000);
            return () => {
                clearInterval(interval);
            }
        }
        else {
            updateAccounts();
        }
    })

    return (
        <div align="center" className={classes.root}>
            <AdminHeader setPage={setPage} />
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={3}
                className={classes.container}>
                <Grid item xs={12} sm={12} md={12} lg={10} xl={10} className={classes.grid}>
                    <div className={classes.box}>
                        <AdminPortfolio />
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={5} xl={5} className={classes.grid}>
                    <div className={classes.box}>
                        <AdminLeaderboard leaderboard={leaderboard} />
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={5} xl={5} className={classes.grid}>
                    <div className={classes.box}>
                        <AdminStats stats={stats} />
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={10} xl={10} className={classes.grid}>
                    <div className={classes.box}>
                        <AdminUpcomingEvents getEvent={getEvent} updateEvents={() => updateEvents()} events={Object.keys(events).length !== 0 ? events.filter(event => (event.upcoming === true)) : events} />
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={10} xl={10} className={classes.grid}>
                    <div className={classes.box}>
                        <AdminAccounts accounts={accounts} />
                    </div>
                </Grid>
            </Grid>
            <br /><br /><br />
        </div>
    )
}