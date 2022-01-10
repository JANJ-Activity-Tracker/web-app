import { useState } from 'react';
import { Modal, Form, InputGroup } from 'react-bootstrap'
import { Button, makeStyles } from '@material-ui/core'
import { request } from "../util";
import 'bootstrap/dist/css/bootstrap.min.css';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
	modal: {
		width: "75vw",
		maxWidth: "75vw",
	},
	label: {
		paddingLeft: "10px",
		paddingRight: "10px",
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
	const [start_datetime, setStartDateTime] = useState(new Date());
	const [end_datetime, setEndDateTime] = useState(new Date());
	const [location, setLocation] = useState("");
	const [link, setLink] = useState("");
	const [active, setActive] = useState(false);
	const [upcoming, setUpcoming] = useState(false);
	const [error, setError] = useState("");


	const addEvent = async () => {
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
				start_datetime: moment(start_datetime).format('MM/DD/YYYY, h:mm:ss a'),
				end_datetime: moment(start_datetime).format('MM/DD/YYYY, h:mm:ss a'),
				location,
				link,
				active,
				upcoming,
			}
		});

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
				<Modal.Title>Add New Event</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group >
					<Form.Label>Event Name: </Form.Label>
					<Form.Control type="text" onChange={(e) => setEventName(e.target.value)} placeholder="Enter event name" />
					<br />
					<Form.Label>JA Contact Name: </Form.Label>
					<Form.Control type="text" onChange={(e) => setContactName(e.target.value)} placeholder="Enter JA contact name" />
					<br />
					<Form.Label>JA Contact Email: </Form.Label>
					<Form.Control type="text" onChange={(e) => setContactEmail(e.target.value)} placeholder="Enter JA contact email" />
					<br />
					<Form.Label>JA Contact Number: </Form.Label>
					<Form.Control type="text" onChange={(e) => setContactNumber(e.target.value)} placeholder="Enter JA contact number" />
					<br />
					<Form.Label>Event Summary: </Form.Label>
					<Form.Control type="text" as="textarea" onChange={(e) => setEventSummary(e.target.value)} placeholder="Enter event summary" />
					<br />
					<Form.Label>Role Description: </Form.Label>
					<Form.Control type="text" as="textarea" onChange={(e) => setRoleDescription(e.target.value)} placeholder="Enter volunteer role description" />
					<br />
					<Form.Label>Max Hours: </Form.Label>
					<Form.Control type="text" onChange={(e) => setMaxHours(e.target.value)} placeholder="Enter number of max hours" />
					<br />
					<Form.Label>Start Date/Time: </Form.Label>
					<DateTimePicker
						onChange={setStartDateTime}
						value={start_datetime}
					/>
					<br /><br />
					<Form.Label>End Date/Time: </Form.Label>
					<DateTimePicker
						onChange={setEndDateTime}
						value={end_datetime}
					/>
					<br /><br />
					<Form.Label>Location: </Form.Label>
					<Form.Control type="text" onChange={(e) => setLocation(e.target.value)} placeholder="Enter location" />
					<br />
					<Form.Label>Link: </Form.Label>
					<InputGroup className="mb-3">
						<InputGroup.Text id="basic-addon3">
							https://
						</InputGroup.Text>
						<Form.Control type="text" onChange={(e) => setLink('https://' + e.target.value)} placeholder="Enter link" />
					</InputGroup>
					<br />
					<InputGroup >
						<Form.Label className={classes.label}>Active: </Form.Label>
						<InputGroup.Checkbox onChange={(e) => setActive(e.target.value)} />
						<Form.Label className={classes.label}>Upcoming: </Form.Label>
						<InputGroup.Checkbox onChange={(e) => setUpcoming(e.target.value)} />
					</InputGroup>
					<br />
				</Form.Group>
			</Modal.Body>
			{error}
			<Modal.Footer>
				<Button variant="secondary" onClick={() => addEvent()}>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	)
}
