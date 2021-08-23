import React, { useState, useEffect } from "react";
import { Button, makeStyles, Typography } from "@material-ui/core";
import DataTable from "react-data-table-component";
import { request } from "../util";

const useStyles = makeStyles((theme) => ({
    text: {
        color: "white",
    },
    button: {
        margin: "20px"
    }
}));

export default function Portfolio() {
    const classes = useStyles();
    const [log, setLog] = useState({});
    const columns = [
        {
            name: "Event Name",
            selector: "event_name",
            sortable: true
        },
        {
            name: "Role",
            selector: "role",
            sortable: false,
            grow: 2
        },
        {
            name: "Prep Hours",
            selector: "prep_hours",
            sortable: false,
        },
        {
            name: "Event Hours",
            selector: "event_hours",
            sortable: false
        },
        {
            name: "Comments",
            selector: "comments",
            sortable: false,
            grow: 3,
        }
    ];

    const updateLog = async () => {
        let response = await request({
            type: "GET",
            path: "log/serena.zeng@ja.org" // change to any user
        })
        setLog(response);
        console.log(response);
    };

    useEffect(() => {
        if (Object.keys(log).length !== 0) {
            const interval = setInterval(updateLog, 300000);
            return () => {
                clearInterval(interval);
            }
        }
        else {
            updateLog();
        }
    });

    return (
        <div >
            <Typography variant="h4" className={classes.text}>Portfolio</Typography>
            <Button variant="contained" color="secondary" className={classes.button}>Add New Event</Button>
            <Button variant="contained" color="secondary" className={classes.button}>Download</Button>
            <br /><br />
            <DataTable
                className={classes.table}
                columns={columns}
                data={log}
                pagination
                persistTableHead
                paginationRowsPerPageOptions={[5, 10, 20, 30, 50]}
                noHeader
            />
        </div>
    )
}