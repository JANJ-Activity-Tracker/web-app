import { React, useState } from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import DataTable from "react-data-table-component";
import { URL, BACKEND_URL } from "../constants";
import AddEvent from "../adminComponents/AddEvent";


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
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
    },
    container: {
        padding: "30px"
    },
    grid: {
        marginBottom: "20px"
    },
    text: {
        color: "white"
    },
    image: {
        marginTop: "10px",
        minWidth: "100px",
        maxWidth: "500px",
        maxHeight: "200px"
    },
    button: {
        marginRight: "20px",
    }
}));

export default function AdminUpcomingEvents({ events, updateEvents }) {
    const classes = useStyles();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const columns = [
        {
            name: "Name",
            selector: "event_name",
            sortable: true,
            grow: 2
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
            name: "Start Date/Time",
            selector: "start_datetime",
            sortable: true
        },
        {
            name: "End Date/Time",
            selector: "end_datetime",
            sortable: false
        }
    ];

    const ExpandedComponent = ({ data }) => {
        return (
            <div className={classes.root}>
                <Grid container className={classes.container}>
                    <Grid item align="left" xs={6}>
                        <Typography variant="h6" >
                            {data.event_name}
                        </Typography>
                        <Typography variant="body1" xs={12}>
                            Event Summary: {data.event_summary} <br />
                            Volunteer Role: {data.role_description} <br />
                            Location: {data.location} <br />
                            Start: {data.start_datetime}<br />
                            End: {data.end_datetime} <br /><br />
                            {data.contact_name !== "" && data.contact_name !== undefined ?
                                "JA contact: " + data.contact_name
                                : (data.contact_email !== "" && data.contact_email !== undefined) || (data.contact_number !== "" && data.contact_number !== undefined)
                                    ? "Contact: " : ""}
                            {(data.contact_email !== "" && data.contact_email !== undefined) || (data.contact_number !== "" && data.contact_number !== undefined) ? <br /> : ""}
                            {data.contact_email !== "" && data.contact_email !== undefined ? data.contact_email : ""}
                            {(data.contact_email !== "" && data.contact_email !== undefined) && (data.contact_number !== "" && data.contact_number !== undefined) ? <br /> : ""}
                            {data.contact_number !== "" && data.contact_number !== undefined ? data.contact_number : ""}
                            {(data.contact_email !== "" && data.contact_email !== undefined) || (data.contact_number !== "" && data.contact_number !== undefined) ? <br /> : ""}
                        </Typography>
                        {data.link !== "" && data.link !== undefined ?
                            <Grid item>
                                <br />
                                <Button variant="contained" color="secondary" href={data.link}>More Information</Button>
                            </Grid> : ""}
                    </Grid>
                    <Grid item xs={6}>
                        {data.image ? <img src={URL + data.image} className={classes.image} /> : ""}
                    </Grid>
                </Grid>
            </div>
        );
    }

    return (
        <div>
            <Typography variant="h4" className={classes.text}>JANJ Upcoming Events</Typography>
            <br />
            <Button className={classes.button} variant="contained" color="secondary" href={BACKEND_URL + "/core/event/"} style={{ textDecoration: 'none', color: "black" }}>
                Manage Events
            </Button>
            <Button onClick={handleShow} variant="contained" color="secondary" >Add Event</Button>
            <AddEvent show={show} handleClose={handleClose} updateEvents={updateEvents}/>
            <br /><br /><br />
            <DataTable
                columns={columns}
                data={events}
                pagination
                persistTableHead
                paginationRowsPerPageOptions={[5, 10, 20, 30, 50]}
                noHeader
                expandableRows
                expandableRowsComponent={<ExpandedComponent data={events || null} />}
            />
        </div>
    )
}