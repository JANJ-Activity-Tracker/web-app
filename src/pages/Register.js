import React, { useState } from "react";
import {
    Button,
    CircularProgress,
    Link,
    makeStyles,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import { requestRegister } from "../util";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        zIndex: 0,
        alignItems: "center"
    },
    image: {
        width: "400px",
        [theme.breakpoints.down('sm')]: {
            width: "200px"
        },
        marginLeft: "20px",
        marginRight: "20px",
    },
    paper: {
        width: "fit-content",
        padding: "30px",
        paddingBottom: "30px",
        boxShadow: "2px 2px 10px 0",
        [theme.breakpoints.down('xs')]: {
            minWidth: "200px",
            top: "0px",
            transform: "translate(-50%, 0)",
        },
        marginTop: "40px",
        marginBottom: "100px",
    },
    title: {
        marginTop: "20px",
        marginBottom: "20px",
        [theme.breakpoints.down('sm')]: {
            fontSize: 25,
            marginTop: "20px"
        },
    },
    input: {
        minWidth: "300px",
        width: "80%",
        maxWidth: "500px",
        marginBottom: "20px",
        [theme.breakpoints.down('xs')]: {
            minWidth: "300px",
        },
    },
    button: {
        margin: "20px",
    }
}));

export default function Register({ setPage, setToken, setIsAdmin }) {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [gradYear, setGradYear] = useState("");
    const [school, setSchool] = useState("");
    const [township, setTownship] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const classes = useStyles();
    const login = (e) => {
        e.preventDefault();
        setPage("login");
    }

    const register = async (e) => {
        if (password !== password2) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setLoading(true);
        let response = await requestRegister(firstname, lastname, email, gradYear, school, township, password, password2);
        setLoading(false);

        if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('email', email);
            if (response.is_admin) {
                setIsAdmin(true);
                localStorage.setItem('is_admin', true);
            }
            else {
                setIsAdmin(false);
                localStorage.setItem('is_admin', false);
            }
            setError("");
            setPage("dashboard");
            setToken(localStorage.getItem("token"));
        }
        else if (response && response.first_name) {
            setError(response.first_name);
        }
        else if (response && response.last_name) {
            setError(response.last_name);
        }
        else if (response && response.email) {
            setError(response.email);
        }
        else if (response && response.grad_year) {
            setError(response.grad_year);
        }
        else if (response && response.school) {
            setError(response.school);
        }
        else if (response && response.username) {
            setError(response.username);
        }
        else if (response && response.township) {
            setError(response.township);
        }
        else {
            setError("Error creating account. Contact admin at adptechchallenge@gmail.com.");
        }
    }

    return (
        <div align="center" className={classes.root}>
            <Paper className={classes.paper}>
                <img src="/JANJ-logo.png" className={classes.image} />
                <Typography variant="h4" className={classes.title}>
                    Create New Account
                </Typography>
                <form>
                    <TextField id="firstname" label="First Name" className={classes.input} onChange={(e) => setFirstname(e.target.value)} />
                    <br />
                    <TextField id="lastname" label="Last Name" className={classes.input} onChange={(e) => setLastname(e.target.value)} />
                    <br />
                    <TextField id="email" label="Email" className={classes.input} onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <TextField id="password" label="Password" className={classes.input} type="password" onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <TextField id="password2" label="Retype Password" className={classes.input} type="password" onChange={(e) => setPassword2(e.target.value)} />
                    <br />
                    <TextField id="gradYear" label="High School Graduation Year" className={classes.input} onChange={(e) => setGradYear(e.target.value)} />
                    <br />
                    <TextField id="school" label="School" className={classes.input} onChange={(e) => setSchool(e.target.value)} />
                    <br />
                    <TextField id="township" label="Township" className={classes.input} onChange={(e) => setTownship(e.target.value)} />
                    <br />
                    <Typography variant="body1">
                        {error}
                    </Typography>
                    <br />
                    {loading ? <div><CircularProgress /></div> : ""}
                    <Button variant="contained" color="secondary" className={classes.button} onClick={(e) => register(e)}>
                        Register
                    </Button>
                </form>
                <Typography variant="overline">
                    <Link href="#" onClick={(e) => login(e)}>
                        <u>Login</u>
                    </Link>
                </Typography>
            </Paper>
        </div>
    )
}