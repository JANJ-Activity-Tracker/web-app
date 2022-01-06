import React, { useState, Fragment } from "react";
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
import DateFnsUtils from '@date-io/date-fns';
import DataTable from "react-data-table-component";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { request } from "../util";

const useStyles = makeStyles((theme) => ({
    text: {
        color: "white",
    },
    button: {
        margin: "20px"
    },
    input: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        marginLeft: "-5px",
        paddingLeft: "5px",
        minWidth: "300px"
    },
}));

export default function AdminPortfolio() {
    const classes = useStyles();
    const [log, setLog] = useState({});
    const [email, setEmail] = useState("");

    // User volunteer and participation log 
    const updateLog = async () => {
        if (email != "") {
            let response = await request({
                type: "GET",
                path: `log/${email}` // change to any user
            })
            if (response) {
                setLog(response);
            }
            else {
                setLog({});
            }
            console.log(response);
        }
        console.log(email);
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
            sortable: false,
            grow: 2
        },
        {
            name: "Date",
            selector: "date",
            sortable: true,
        },
        {
            name: "Hours",
            selector: "hours",
            sortable: true,
        },
        {
            name: "Comments",
            selector: "comments",
            sortable: false,
            grow: 3,
        }
    ];

    // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
    function convertArrayOfObjectsToCSV(array) {
        let result;

        const columnDelimiter = ',';
        const lineDelimiter = '\n';

        const keys = Object.keys(array[0]);
        const headers = ['User Email', 'Event Name', 'Role', 'Hours', 'Comments', 'Date'];

        result = '';
        result += headers.join(columnDelimiter);
        result += lineDelimiter;

        array.forEach(item => {
            let ctr = 0;
            keys.forEach(key => {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];

                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
    async function downloadCSV() {
        console.log(email);
        let array = await request({
            type: "GET",
            path: `log/${email}`
        })

        let profile = await request({
            type: "GET",
            path: `profile/${email}`
        })

        const link = document.createElement('a');
        let csv = convertArrayOfObjectsToCSV(array);
        if (csv == null) return;

        const filename = profile.first_name + ' ' + profile.last_name + ' JANJ Volunteer Log.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;
        }

        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
    }

    const Export = ({ onExport }) => <Button onClick={e => onExport(e.target.value)}>Export</Button>;
    const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV()} />, [email]);

    return (
        <div >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Typography variant="h4" className={classes.text}>Volunteer Logs</Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Student email"
                    color="secondary"
                    value={email}
                    InputProps={{
                        className: classes.input
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button variant="contained" color="secondary" className={classes.button} onClick={(e) => updateLog(e)}>Search</Button>
                <br /><br />
                <DataTable
                    className={classes.table}
                    columns={columns}
                    data={log}
                    pagination
                    persistTableHead
                    noHeader={Object.keys(log).length === 0 || log.length == 0 || log[0] === undefined || log[0] === null ? true : false}
                    paginationRowsPerPageOptions={[5, 10, 20, 30, 50]}
                    actions={actionsMemo}
                />
            </MuiPickersUtilsProvider>
        </div >
    )
}