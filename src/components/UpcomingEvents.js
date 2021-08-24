import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import DataTable from "react-data-table-component";

const useStyles = makeStyles((theme) => ({
    text: {
        color: "white",
    }
}));

export default function UpcomingEvents({ events }) {
    const classes = useStyles();

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

    return (
        <div>
            <Typography variant="h4" className={classes.text}>JANJ Events</Typography>
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