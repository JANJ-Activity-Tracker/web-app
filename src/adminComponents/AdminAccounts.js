import React from "react";
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import DataTable from "react-data-table-component";
import { URL, BACKEND_URL } from "../constants";
import { request } from "../util";

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
    }
}));

export default function AdminAccounts({ accounts }) {
    const classes = useStyles();

    const columns = [
        {
            name: "First Name",
            selector: "first_name",
            sortable: true,
            grow: 2
        },
        {
            name: "Last Name",
            selector: "last_name",
            sortable: true,
            grow: 2
        },
        {
            name: "Email",
            selector: "email",
            sortable: true,
            grow: 2
        },
        {
            name: "Graduation Year",
            selector: "grad_year",
            sortable: true
        },
        {
            name: "School",
            selector: "school",
            sortable: true,
            grow: 2
        },
        {
            name: "Township",
            selector: "township",
            sortable: true,
            grow: 2
        }
    ];


    // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
    function convertArrayOfObjectsToCSV(array) {
        let result;

        const columnDelimiter = ',';
        const lineDelimiter = '\n';

        const keys = Object.keys(array[0]);
        const headers = ['', 'First Name', 'Last Name', 'Email', 'High School Graduation Year', 'School', 'Township', 'Username'];

        result = '';
        result += headers.join(columnDelimiter);
        result += lineDelimiter;

        let account_ctr = 1;

        array.forEach(item => {
            let ctr = 0;
            result += account_ctr;
            keys.forEach(key => {
                result += columnDelimiter;
                result += item[key];
                ctr++;
            });
            account_ctr++;
            result += lineDelimiter;
        });

        return result;
    }

    // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
    async function downloadCSV() {

        let array;
        let profile;

        array = await request({
            type: "GET",
            path: `all-accounts/`
        })

        const link = document.createElement('a');
        let csv = convertArrayOfObjectsToCSV(array);
        if (csv == null) return;

        const filename = "JANJ Activity Tracker Accounts";

        if (!csv.match(/^data:text\/csv/i)) {
            csv = `data:text/csv;charset=utf-8,${csv}`;
        }

        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
    }

    const Export = ({ onExport }) => <Button onClick={e => onExport(e.target.value)}>Export</Button>;
    const actionsMemo = React.useMemo(() => <Export onExport={() => downloadCSV()} />, []);

    return (
        <div>
            <Typography variant="h4" className={classes.text}> Volunteer Accounts </Typography>
            <br />
            <Button variant="contained" color="secondary" href={BACKEND_URL + "/core/account/"} style={{ textDecoration: 'none', color: "black" }}>
                Manage Accounts
            </Button>
            <br /><br /><br />
            <DataTable
                columns={columns}
                data={accounts}
                pagination
                persistTableHead
                noHeader={Object.keys(accounts).length === 0 || accounts.length == 0 || accounts[0] === undefined || accounts[0] === null ? true : false}
                paginationRowsPerPageOptions={[5, 10, 20, 30, 50]}
                actions={actionsMemo}
            />
        </div>
    )
}