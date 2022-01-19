import { useState, useEffect } from 'react';
import { Modal, Form, InputGroup } from 'react-bootstrap'
import { Button, makeStyles } from '@material-ui/core'
import { request } from "../util";
import 'bootstrap/dist/css/bootstrap.min.css';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

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


export default function EditEvent({ show, handleClose, event_info, editing, setEditing, updateEvents }) {
	const classes = useStyles();
	const [event_name, setEventName] = useState("");
	const [contact_name, setContactName] = useState("");
	const [contact_email, setContactEmail] = useState("");
	const [contact_number, setContactNumber] = useState("");
	const [event_summary, setEventSummary] = useState("");
	const [role_description, setRoleDescription] = useState("");
	const [max_hours, setMaxHours] = useState("");
	const [start_datetime, setStartDateTime] = useState(new Date());
	const [end_datetime, setEndDateTime] = useState(new Date());
	const [location, setLocation] = useState("");
	const [link, setLink] = useState("");
	const [active, setActive] = useState(true);
	const [upcoming, setUpcoming] = useState(true);

	const [error, setError] = useState("");


	useEffect(() => {
		if (editing) {
			setEventName(event_info.event_name)
			setContactName(event_info.contact_name)
			setContactEmail(event_info.contact_email)
			setContactNumber(event_info.contact_number)
			setEventSummary(event_info.event_summary)
			setRoleDescription(event_info.role_description)
			setMaxHours(event_info.max_hours)
			setStartDateTime(event_info.start_datetime)
			setEndDateTime(event_info.end_datetime)
			setLocation(event_info.location)
			setLink(event_info.link)
			setActive(event_info.active)
			setUpcoming(event_info.upcoming)

			setEditing(false)
		}

	}, [editing])

	const editEvent = async () => {
		console.log(event_info.id)

		let response = await request({
			type: "PATCH",
			path: `edit-event/${event_info.id}/`,
			body: {
				event_name,
				contact_name,
				contact_email,
				contact_number,
				event_summary,
				role_description,
				max_hours,
				start_datetime: moment(start_datetime).format('MM/DD/YYYY, h:mm:ss a'),
				end_datetime: moment(start_datetime).format('MM/DD/YYYY, h:mm:ss a'),
				location,
				link,
				active,
				upcoming,
			}
		});

		console.log(response);

		if (response.response !== "Successfully edited event.") {
			if (response.response === "Wrong parameters.") {
				setError("Event name, event summary, and role description cannot be blank.");
			}
			if (response.event_name) {
				setError("Event Name: " + response.event_name);
				return;
			}
			else if (response.contact_name) {
				setError("Contact Name: " + response.contact_name);
				return;
			}
			else if (response.contact_email) {
				setError("Contact Email: " + response.contact_email);
				return;
			}
			else if (response.contact_number) {
				setError("Contact Number: " + response.contact_number);
				return;
			}
			else if (response.event_summary) {
				setError("Event Summary: " + response.event_summary);
				return;
			}
			else if (response.role_description) {
				setError("Role Description: " + response.role_description);
				return;
			}
			else if (response.max_hours) {
				setError("Max Hours: " + response.max_hours);
				return;
			}
			else if (response.start_datetime) {
				setError("Start Date/Time: " + response.start_datetime);
				return;
			}
			else if (response.end_datetime) {
				setError("End Date/Time: " + response.end_datetime);
				return;
			}
			else if (response.location) {
				setError("Location: " + response.location);
				return;
			}
			else if (response.link) {
				setError("Link: " + response.link);
				return;
			}
			else if (response.active) {
				setError("Active: " + response.active);
				return;
			}
			else if (response.upcoming) {
				setError("Upcoming: " + response.upcoming);
				return;
			}
		}
		else {
			setEventName("");
			setContactName("");
			setContactEmail("");
			setContactNumber("");
			setEventSummary("");
			setRoleDescription("");
			setMaxHours("");
			setStartDateTime(new Date());
			setEndDateTime(new Date());
			setLocation("");
			setLink("");
			setActive(false);
			setUpcoming(false);
			setError("");

			handleClose();
			updateEvents();
		}

	}



	return (
		<Modal
			dialogClassName={classes.modal}
			show={show}
			onHide={() => handleClose()}
			backdrop="static"
			keyboard={false}
		>
			<Modal.Header closeButton>
				<Modal.Title>Edit Event</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group >
					<Form.Label>Event Name: </Form.Label>
					<Form.Control type="text" value={event_name} onChange={(e) => setEventName(e.target.value)} placeholder="Enter event name" />
					<br />
					<Form.Label>JA Contact Name: </Form.Label>
					<Form.Control type="text" value={contact_name} onChange={(e) => setContactName(e.target.value)} placeholder="Enter JA contact name" />
					<br />
					<Form.Label>JA Contact Email: </Form.Label>
					<Form.Control type="text" value={contact_email} onChange={(e) => setContactEmail(e.target.value)} placeholder="Enter JA contact email" />
					<br />
					<Form.Label>JA Contact Number: </Form.Label>
					<Form.Control type="text" value={contact_number} onChange={(e) => setContactNumber(e.target.value)} placeholder="Enter JA contact number" />
					<br />
					<Form.Label>Event Summary: </Form.Label>
					<Form.Control type="text" value={event_summary} as="textarea" onChange={(e) => setEventSummary(e.target.value)} placeholder="Enter event summary" />
					<br />
					<Form.Label>Role Description: </Form.Label>
					<Form.Control type="text" value={role_description} as="textarea" onChange={(e) => setRoleDescription(e.target.value)} placeholder="Enter volunteer role description" />
					<br />
					<Form.Label>Max Hours: </Form.Label>
					<Form.Control type="text" value={max_hours} onChange={(e) => setMaxHours(e.target.value)} placeholder="Enter maximum number of hours that can be logged by volunteers for this event" />
					<br />
					<Form.Label>Start Date/Time: </Form.Label>
					<DateTimePicker
						onChange={setStartDateTime}
						value={start_datetime}
						className={classes.label}
					/>
					<br /><br />
					<Form.Label>End Date/Time: </Form.Label>
					<DateTimePicker
						onChange={setEndDateTime}
						value={end_datetime}
						className={classes.label}
					/>
					<br /><br />
					<Form.Label>Location: </Form.Label>
					<Form.Control type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter location" />
					<br />
					<Form.Label>Link: </Form.Label>
					<InputGroup className="mb-3">
						<InputGroup.Text id="basic-addon3">
							https://
						</InputGroup.Text>
						<Form.Control type="text" value={link} onChange={(e) => setLink('https://' + e.target.value)} placeholder="Enter link" />
					</InputGroup>
					<br />
					<InputGroup >
						<Form.Label className={classes.label} >Active (Students can log hours under this event): </Form.Label>
						<InputGroup.Checkbox checked={active} onChange={(e) => setActive(e.target.value)} defaultChecked={active} />
						<Form.Label className={classes.label}>Upcoming (Looking for volunteers): </Form.Label>
						<InputGroup.Checkbox checked={upcoming} onChange={(e) => setUpcoming(e.target.value)} defaultChecked={upcoming} />
					</InputGroup>
					<br />
				</Form.Group>
				{error.length === 0 ? "" : "Error "}{error}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="contained" color="secondary" onClick={editEvent}>
					Update
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

