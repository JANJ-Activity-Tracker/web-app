import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import DataTable from "react-data-table-component";
import { request } from "../util";

const useStyles = makeStyles((theme) => ({
    root: {
        position: "relative",
        align: "left",
        height: "100%"
    },
    form: {
        width: "300px",
        marginBottom: "50px",
        backgroundColor: "white",
    },
    select: {
        paddingLeft: "5px",
    },
    button: {
        marginLeft: "20px",
        marginTop: "-5px"
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
    const [gradYear, setGradYear] = useState("All Students");
    const d = new Date();
    const [years, setYears] = useState({});

    useEffect(() => {
        let year = d.getFullYear();
        let arr = [];
        for (var i = 5; i >= -5; i--) {
            arr.push(year + i);
        }
        setYears(arr);
    }, [])

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

    const filterLeaderboard = async () => {
        if (gradYear === "All Students") {
            let response = await request({
                type: "GET",
                path: `leaderboard/` // change to any user
            })
            setLeaderboard(response);
            console.log(response);
        }
        else {
            let response = await request({
                type: "GET",
                path: `leaderboard/${gradYear}/` // change to any user
            })
            setLeaderboard(response);
            console.log(response);
        }
    };

    return (
        <div className={classes.root}>
            <div align="center">
                <Typography variant="h4" className={classes.text}>Leaderboard</Typography>
                <br /><br />
                <FormControl className={classes.form}>
                    <Select
                        labelId="event_name"
                        align="left"
                        value={gradYear}
                        onChange={(e) => setGradYear(e.target.value)}
                        className={classes.select}
                    >
                        {years[0] ?
                            years.map(y => <MenuItem value={y}>{"Class of " + y}</MenuItem>)
                            : <MenuItem value={d}>{"Class of " + d}</MenuItem>}
                        <MenuItem value={"All Students"}>{"All Students"}</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="secondary" className={classes.button} onClick={(e) => filterLeaderboard(e)}>Search</Button>
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