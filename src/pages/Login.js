import React, { useState } from "react";
import { Button, CircularProgress, Link, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import { requestLogin } from "../util";

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        width: "100%",
    },
    image: {
        width: "400px",
        marginLeft: "30px",
        marginRight: "30px",
        marginTop: "10px",
        [theme.breakpoints.down('sm')]: {
            width: "300px",
        },
    },
    paper: {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "fit-content",
        padding: "30px",
        paddingBottom: "50px",
        boxShadow: "2px 2px 10px 0",
    },
    title: {
        marginTop: "50px",
        marginBottom: "20px",
        [theme.breakpoints.down('sm')]: {
            fontSize: 30
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 25
        },
    },
    input: {
        minWidth: "300px",
        width: "80%",
        marginBottom: "20px",
    },
    button: {
        margin: "20px",
    }
}));

export default function Login({ setPage, setToken, setIsAdmin }) {
    const classes = useStyles();
    const [email, setEmail] = useState(""); // same as username
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const register = (e) => {
        e.preventDefault();
        setPage("register");
    }

    const login = async (e) => {
        setLoading(true);
        let response = await requestLogin(email, password);
        setLoading(false);
        // console.log(response);
        if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('email', email);

            setError("");
            if (response.is_admin) {
                setIsAdmin(true);
                localStorage.setItem('is_admin', true);
            }
            else {
                setIsAdmin(false);
                localStorage.setItem('is_admin', false);
            }
            setPage("dashboard");
            setToken(localStorage.getItem("token"));
        }
        else if (response && response.username) {
            setError(response.username);
        }
        else if (response && response.password) {
            setError(response.password);
        }
        else if (response && response.non_field_errors) {
            setError(response.non_field_errors);
        }
    }

    return (
        <div align="center" className={classes.root}>
            <Paper className={classes.paper}>
                <img src="/JANJ-logo.png" className={classes.image} />
                <Typography variant="h4" className={classes.title}>
                    Activity Tracker Login
                </Typography>
                <form autoComplete="off">
                    <TextField id="standard-basic" label="Email" className={classes.input} onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <TextField id="standard-basic" label="Password" className={classes.input} type="password" onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <Typography variant="body1">
                        {error}
                    </Typography>
                    <br />
                    {loading ? <div><CircularProgress /></div> : ""}
                    <Button variant="contained" color="secondary" className={classes.button} onClick={(e) => login(e)}>
                        Sign In
                    </Button>
                </form>
                <Typography variant="overline">
                    <Link href="#" onClick={(e) => register(e)}>
                        <u>Register</u>
                    </Link>
                    <br />
                    <Link href="https://forms.gle/pCFPfReRj94H25gh6">
                        <u>Give us Feedback!</u>
                    </Link>
                </Typography>
            </Paper>
        </div>
    )
}