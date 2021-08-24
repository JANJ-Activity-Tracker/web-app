import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
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

export default function Portfolio({ events }) {
    const classes = useStyles();
    const [log, setLog] = useState({});
    const [eventName, setEventName] = useState("");
    const [role, setRole] = useState("");
    const [prepHours, setPrepHours] = useState(0);
    const [eventHours, setEventHours] = useState(0);
    const [comments, setComments] = useState("");

    const [openDialog, setOpenDialog] = useState(false);
    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleClose = () => {
        setOpenDialog(false);
    };

    const columns = [
        {
            name: "Event Name",
            selector: "event_name",
            sortable: true,
            grow: 2
        },
        {
            name: "Role",
            selector: "role",
            sortable: false
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
            path: `log/${localStorage.getItem("email")}` // change to any user
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

    function handlePrepHoursChange(event) {
        if (event.target.value < 0) {
            event.target.value = 0;
        }
        setPrepHours(event.target.value);
    }

    function handleEventHoursChange(event) {
        if (event.target.value < 0) {
            event.target.value = 0;
        }
        setEventHours(event.target.value);
    }

    async function addEvent() {
        handleClose();
        let event = events.filter(function (item) {
            return item.event_name == eventName;
        });
        let id = event[0].id;
        console.log(id);
        let response = await request({
            type: "POST",
            path: "log/add/", // change to any user
            body: {
                event_name: eventName,
                user_email: localStorage.getItem("email"),
                event_id: id,
                role: role,
                prep_hours: prepHours,
                event_hours: eventHours,
                comments: comments
            }
        });

        console.log(response);
        updateLog();
    }

    return (
        <div >
            <Typography variant="h4" className={classes.text}>Portfolio</Typography>
            <Button variant="contained" color="secondary" className={classes.button} onClick={handleClickOpen}>Add New Event</Button>
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
            <Dialog open={openDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add New Event</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="event_name">Event Name</InputLabel>
                        <Select
                            labelId="event_name"
                            align="left"
                            onChange={(e) => setEventName(e.target.value)}
                        >
                            {Object.keys(events).length !== 0 ?
                                events.map(event => <MenuItem value={event.event_name}>{event.event_name}</MenuItem>)
                                : <TextField
                                    autoFocus
                                    margin="dense"
                                    id="event_name"
                                    label="Event Name"
                                    fullWidth
                                    onChange={(e) => setEventName(e.target.value)}
                                />}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="role">Role</InputLabel>
                        <Select
                            labelId="role"
                            align="left"
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <MenuItem value="Volunteer" >Volunteer</MenuItem>
                            <MenuItem value="Participant" >Participant</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="prep_hours"
                        label="Preparation Hours"
                        fullWidth
                        type="number"
                        onChange={(event) => handlePrepHoursChange(event)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="event_hours"
                        label="Event Hours"
                        fullWidth
                        type="number"
                        onChange={(event) => handleEventHoursChange(event)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="comments"
                        label="Comments"
                        fullWidth
                        onChange={(e) => setComments(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={addEvent} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}