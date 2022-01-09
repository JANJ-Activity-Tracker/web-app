import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap'
import { Button, makeStyles, CircularProgress } from '@material-ui/core'
import { request } from "../util";
import 'bootstrap/dist/css/bootstrap.min.css'

const useStyles = makeStyles((theme) => ({
	modal: {
		width: "75vw",
		maxWidth: "75vw",
	},
}));

export default function AddEvent({ show, handleClose }) {
	const classes = useStyles();

	const [event_name, setEventName] = useState("");
	const [contact_name, setContactName] = useState("");
	const [contact_email, setContactEmail] = useState("");
	const [contact_number, setContactNumber] = useState("");
	const [event_summary, setEventSummary] = useState("");
	const [role_description, setRoleDescription] = useState("");
	const [max_hours, setMaxHours] = useState("");
	const [start_datetime, setStartDateTime] = useState("");
	const [end_datetime, setEndDateTime] = useState("");
	const [location, setLocation] = useState("");
	const [link, setLink] = useState("");
	const [active, setActive] = useState(false);
	const [upcoming, setUpcoming] = useState(false);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);


	const addEvent = async () => {

		setLoading(true);

		let response = await request({
			type: "POST",
			path: "events/",
			body: {
				event_name,
				contact_name,
				contact_email,
				contact_number,
				event_summary,
				role_description,
				max_hours,
				start_datetime,
				end_datetime,
				location,
				link,
				active,
				upcoming,
			}
		});

		setLoading(false);
		console.log("sending");
		console.log(response);
		console.log(response.response);

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
				<Modal.Title>Add a New Event</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group >
					<Form.Label>Event Name: </Form.Label>
					<Form.Control type="text" onChange={(e) => setEventName(e.target.value)} />
					<Form.Label>Contact Name: </Form.Label>
					<Form.Control type="text" onChange={(e) => setContactName(e.target.value)} />
					<Form.Label>Contact Email: </Form.Label>
					<Form.Control type="text" onChange={(e) => setContactEmail(e.target.value)} />
					<Form.Label>Contact Number: </Form.Label>
					<Form.Control type="text" onChange={(e) => setContactNumber(e.target.value)} />
					<Form.Label>Event Summary: </Form.Label>
					<Form.Control type="text" onChange={(e) => setEventSummary(e.target.value)} />
					<Form.Label>Role Description: </Form.Label>
					<Form.Control type="text" onChange={(e) => setRoleDescription(e.target.value)} />
					<Form.Label>Max Hours: </Form.Label>
					<Form.Control type="text" onChange={(e) => setMaxHours(e.target.value)} />
					<Form.Label>Start Date/Time: </Form.Label>
					<Form.Control type="text" onChange={(e) => setStartDateTime(e.target.value)} />
					<Form.Label>End Date/Time: </Form.Label>
					<Form.Control type="text" onChange={(e) => setEndDateTime(e.target.value)} />
					<Form.Label>Location: </Form.Label>
					<Form.Control type="text" onChange={(e) => setLocation(e.target.value)} />
					<Form.Label>Link: </Form.Label>
					<Form.Control type="text" onChange={(e) => setLink(e.target.value)} />
					<Form.Label>Active?: </Form.Label>
					<Form.Control type="text" onChange={(e) => setActive(e.target.value)} />
					<Form.Label>Upcoming?: </Form.Label>
					<Form.Control type="text" onChange={(e) => setUpcoming(e.target.value)} />
				</Form.Group>
			</Modal.Body>
			{loading ? <div><CircularProgress /></div> : ""}
			{error}
			<Modal.Footer>
				<Button variant="secondary" onClick={() => addEvent()}>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
