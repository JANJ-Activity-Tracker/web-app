import React, { useState, useEffect } from "react";
import {
    Button,
    FormControl,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import DataTable from "react-data-table-component";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { request } from "../util";
import { BACKEND_URL } from "../constants";

const useStyles = makeStyles((theme) => ({
    text: {
        color: "white",
    },
    button: {
        margin: "20px"
    },
    input: {
        backgroundColor: "rgba(255, 255, 255)",
        marginLeft: "-5px",
        paddingLeft: "5px",
        minWidth: "300px",
        marginTop: "17px",
    },
    dropdown: {
        marginLeft: "10px",
        marginTop: "25px",
        backgroundColor: "rgba(255, 255, 255)",
        minWidth: "200px"
    },
}));

export default function AdminPortfolio() {
    const classes = useStyles();
    const [log, setLog] = useState({});
    const [searchKey, setSearchKey] = useState("");
    const [searchBy, setSearchBy] = useState("user_email")
    const [error, setError] = useState("")

    // User volunteer and participation log 
    const updateLog = async () => {
        if (searchBy === "user_email" && searchKey != "") {
            let response = await request({
                type: "GET",
                path: `log/${searchKey}` // change to any user
            })
            if (response) {
                setLog(response);
            }
            else {
                setLog({});
            }
        }
        else if (searchBy === "event_name" && searchKey != "") {
            let response = await request({
                type: "GET",
                path: `event-log/${searchKey}` // change to any user
            })
            if (response) {
                setLog(response);
            }
            else {
                setLog({});
            }
        }
        else {
            let response = await request({
                type: "GET",
                path: `log/all` // change to any user
            })
            if (response) {
                setLog(response);
            }
            else {
                setLog({});
            }
        }
        console.log(log);
    };

    // User volunteer and participation log 
    const searchLog = async () => {
        if (searchKey === "") {
            setError("Enter value to search by.")
        }
        else {
            setError("")
        }
        updateLog();
    };

    useEffect(() => {
        if (Object.keys(log).length !== 0) {
            const interval = setInterval(updateLog, 300000);
            return () => {
                clearInterval(interval);
            }
        }
        else if (searchKey === "") {
            updateLog();
        }
    })

    const columns = [
        {
            name: "Volunter Email",
            selector: "user_email",
            sortable: true,
            grow: 1.5
        },
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
        const headers = ['', 'User Email', 'Event Name', 'Role', 'Hours', 'Comments', 'Date'];

        result = '';
        result += headers.join(columnDelimiter);
        result += lineDelimiter;

        let total_hours = 0;
        let entry_ctr = 1;

        array.forEach(item => {
            let ctr = 0;
            result += entry_ctr;
            keys.forEach(key => {
                result += columnDelimiter;
                result += ('"' + (item[key] + "").replace(/\"/g, "\"\"") + '"');
                ctr++;
                if (key === 'hours') {
                    total_hours += item[key];
                }
            });
            entry_ctr++;
            result += lineDelimiter;
        });

        result += lineDelimiter;
        result += "Total Hours: ";
        result += columnDelimiter;
        result += total_hours;

        return result;
    }

    // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
    async function downloadCSV() {

        let array;
        let profile;
        if (searchBy === "user_email" && searchKey !== "") {
            array = await request({
                type: "GET",
                path: `log/${searchKey}`
            })
            profile = await request({
                type: "GET",
                path: `profile/${searchKey}`
            })
        }
        else if (searchBy === "event_name" && searchKey !== "") {
            array = await request({
                type: "GET",
                path: `event-log/${searchKey}`
            })
        }
        else {
            array = await request({
                type: "GET",
                path: `log/all`
            })
        }


        const link = document.createElement('a');
        let csv = convertArrayOfObjectsToCSV(array);
        if (csv == null) return;

        const filename = searchBy === "user_email" && searchKey !== "" ? profile.first_name + ' ' + profile.last_name + ' JANJ Volunteer Log.csv' : searchKey !== "" ? searchKey + ' JANJ Volunteer Log.csv' : 'JANJ Volunteer Log.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;
        }

        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
    }

    const Export = ({ onExport }) => <Button onClick={e => onExport(e.target.value)}>Export</Button>;
    const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV()} />, [searchKey, searchBy]);

    return (
        <div >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Typography variant="h4" className={classes.text}>Volunteer Logs</Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="search_key"
                    color="secondary"
                    value={searchKey}
                    InputProps={{
                        className: classes.input
                    }}
                    onChange={(e) => setSearchKey(e.target.value)}
                />
                <FormControl className={classes.dropdown}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={searchBy}
                        color="secondary"
                        margin="dense"
                        onChange={(e) => setSearchBy(e.target.value)}
                    >
                        <MenuItem value={"user_email"}>Volunteer Email</MenuItem>
                        <MenuItem value={"event_name"}>Event</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="secondary" className={classes.button} onClick={(e) => searchLog(e)}>Search</Button>
                {!(Object.keys(log).length === 0 || log.length == 0 || log[0] === undefined || log[0] === null) ?
                    <Button variant="contained" color="secondary" href={BACKEND_URL + "/core/log/?q=" + searchKey.replace("@", "%40").replaceAll(" ", "+").replaceAll("_", "+")} style={{ textDecoration: 'none', color: "black" }}>
                        Manage Volunteer Logs
                    </Button> : ""}
                <br />
                <Typography className={classes.text}>
                    {error}
                </Typography>
                <br />
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