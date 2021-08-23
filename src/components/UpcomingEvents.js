import React, { useState, useEffect } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import { request } from "../util";
import DataTable from "react-data-table-component";

const useStyles = makeStyles((theme) => ({
    text: {
        color: "white",
    }
}));

export default function UpcomingEvents() {
    const classes = useStyles();
    const [events, setEvents] = useState({});
    const columns = [
        {
            name: "Name",
            selector: "event_name",
            sortable: true
        },
        {
            name: "Summary",
            selector: "event_summary",
            sortable: false,
            grow: 3
        },
        {
            name: "Role Description",
            selector: "role_description",
            sortable: false,
            grow: 2
        },
        {
            name: "Location",
            selector: "location",
            sortable: false
        },
        {
            name: "Time",
            selector: "time",
            sortable: false
        }
    ];

    const updateEvents = async () => {
        let response = await request({
            type: "GET",
            path: "events/"
        })
        setEvents(response);
        console.log(response);
    }

    useEffect(() => {
        if (Object.keys(events).length !== 0) {
            const interval = setInterval(updateEvents, 300000);
            return () => {
                clearInterval(interval);
            }
        }
        else {
            updateEvents();
        }
    })

    return (
        <div>
            <Typography variant="h4" className={classes.text}>Upcoming Events</Typography>
            <br /><br />
            <DataTable
                columns={columns}
                data={events}
                pagination
                persistTableHead
                paginationRowsPerPageOptions={[5, 10, 20, 30, 50]}
                noHeader
            />
        </div>
    )
}