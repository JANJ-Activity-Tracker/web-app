import React, { useState, useEffect } from "react";
import { makeStyles, Typography, Grid } from "@material-ui/core";
import { request } from "../util";
import DataTable from "react-data-table-component";

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
    bodyText: {
        color: "white",
        [theme.breakpoints.down('md')]: {
            fontSize: 45
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 40
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 30
        },
    }
}));

export default function AdminLeaderboard({ leaderboard, setLeaderboard }) {
    const classes = useStyles();
    const columns = [
        {
            name: "",
            selector: "place",
            sortable: false,
            grow: 0.1,
        },
        {
            name: "User",
            selector: "user",
            sortable: false,
        },
        {
            name: "Total Volunteer Hours",
            selector: "total_hours",
            sortable: false,
        },
    ]

    // User profile 
    const updateLeaderboard = async () => {
        let response = await request({
            type: "GET",
            path: `leaderboard/` // change to any user
        })
        setLeaderboard(response);
        console.log(response);
    };

    useEffect(() => {
        if (leaderboard.length !== undefined && leaderboard.length >= 0) {
            updateLeaderboard();
            const interval = setInterval(updateLeaderboard, 300000);
            return () => {
                clearInterval(interval);
            }
        }
        else {
            updateLeaderboard();
        }
    })

    return (
        <div className={classes.root}>
            <div align="center">
                <Typography variant="h4" className={classes.text}>Leaderboard</Typography>
                <br /><br />
                <DataTable
                    columns={columns}
                    data={leaderboard}
                    pagination
                    persistTableHead
                    noHeader
                    paginationRowsPerPageOptions={[5, 10]}
                />
            </div>
        </div>
    )
}