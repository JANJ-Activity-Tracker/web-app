import { useState, useEffect, Fragment } from 'react';
import { request } from "../util";
import 'bootstrap/dist/css/bootstrap.min.css';
import DateFnsUtils from '@date-io/date-fns';
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
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
    modal: {
        width: "60vw",
        maxWidth: "60vw",
        paddingLeft: "10px",
    },
    label: {
        paddingLeft: "10px",
        paddingRight: "10px",
    },
}));


export default function EditLog({ show, handleClose, log_info, editing, setEditing, updateLog }) {
    const classes = useStyles();
    const [eventName, setEventName] = useState("");
    const [role, setRole] = useState("");
    const [hours, setHours] = useState(0);
    const [comments, setComments] = useState("");
    const [date, setDate] = useState("");

    const [error, setError] = useState("");


    useEffect(() => {
        if (editing) {
            setEventName(log_info.event_name);
            setRole(log_info.role);
            setHours(log_info.hours);
            setComments(log_info.comments);
            if (date === "") {
                setDate(new Date());
            }
            else {
                setDate(log_info.date);
            }
            setEditing(false)
        }
    }, [editing])

    function handleHoursChange(event) {
        if (event.target.value < 0) {
            event.target.value = 0;
        }
        setHours(event.target.value);
    }

    const editLog = async () => {
        console.log(log_info);

        let response = await request({
            type: "PATCH",
            path: `edit-log/${log_info.id}/`,
            body: {
                event_name: eventName,
                user_email: localStorage.getItem("email"),
                role: role,
                hours: hours,
                comments: comments,
                date: date,
            }
        });

        console.log(response);

        if (response.response !== "Successfully edited log entry.") {
            if (response.event_name) {
                setError("Event Name: " + response.comments);
                return;
            }
            else if (response.user_email) {
                setError("Error with user email");
                return;
            }
            else if (response.role) {
                setError("Role: " + response.role);
                return;
            }
            else if (response.hours) {
                setError("Hours: " + response.hours);
                return;
            }
            else if (response.comments) {
                setError("Comments: " + response.comments);
                return;
            }
            else if (response.date) {
                setError("Comments: " + response.date);
                return;
            }
        }
        else {
            setEventName("");
            setRole("");
            setHours(0);
            setComments("");
            setDate(new Date());
        }

        console.log(response);
        setError("");
        updateLog();
        handleClose();
    }



    return (
        <Dialog onHide={() => handleClose()} open={show} onClose={handleClose} aria-labelledby="form-dialog-title">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DialogTitle id="form-dialog-title">Edit Log Entry</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="event_name"
                        label="Event Name"
                        value={eventName}
                        fullWidth
                        onChange={(e) => setEventName(e.target.value)}
                    /><br /><br />
                    <Fragment>
                        <KeyboardDatePicker
                            autoOk
                            margin="dense"
                            variant="inline"
                            label="Volunteer Date"
                            helperText="Date of JA volunteering event."
                            format="MM/dd/yyyy"
                            value={date}
                            InputAdornmentProps={{ position: "end" }}
                            fullWidth
                            onChange={date => setDate(date)}
                        />
                    </Fragment>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="role"
                        label="Role"
                        helperText="Describe what you did as a volunteer."
                        value={role}
                        fullWidth
                        onChange={(e) => setRole(e.target.value)}
                    />
                    <br />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="hours"
                        label="Volunteer Hours"
                        helperText="Include preparation, training, event, meeting times etc."
                        fullWidth
                        value={hours}
                        type="number"
                        onChange={(event) => handleHoursChange(event)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="comments"
                        label="Comments"
                        value={comments}
                        fullWidth
                        onChange={(e) => setComments(e.target.value)}
                    />
                    <Typography variant="body1" color="error">
                        {error}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={editLog} color="primary">
                        Edit
                    </Button>
                </DialogActions>
            </MuiPickersUtilsProvider>
        </Dialog>
    )
}

