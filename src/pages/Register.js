import React, { useState } from "react";
import {
    Button,
    FormControl,
    InputLabel,
    Link,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import { requestRegister } from "../util";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        height: "100vh",
        width: "100%",
        zIndex: 0,
    },
    image: {
        width: "500px"
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
        marginBottom: "20px"
    },
    input: {
        minWidth: "300px",
        width: "80%",
        maxWidth: "500px",
        marginBottom: "20px"
    },
    button: {
        margin: "20px",
    }
}));

export default function Register({ setPage }) {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [grade, setGrade] = useState("");
    const [school, setSchool] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");

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
        let response = await requestRegister(firstname, lastname, email, grade, school, password, password2);

        if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('email', email);
            setError("");
            setPage("dashboard");
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
        else if (response && response.grade) {
            setError(response.grade);
        }
        else if (response && response.school) {
            setError(response.school);
        }
        else if (response && response.username) {
            setError(response.username);
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
                    Activity Tracker Registration
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
                    <FormControl className={classes.input}>
                        <InputLabel id="grade">Grade</InputLabel>
                        <Select
                            labelId="grade"
                            value={grade}
                            align="left"
                            onChange={(e) => setGrade(e.target.value)}>
                            <MenuItem value="Kindergarten" >Kindergarten</MenuItem>
                            <MenuItem value="Grade 1" >Grade 1</MenuItem>
                            <MenuItem value="Grade 2" >Grade 2</MenuItem>
                            <MenuItem value="Grade 3" >Grade 3</MenuItem>
                            <MenuItem value="Grade 4" >Grade 4</MenuItem>
                            <MenuItem value="Grade 5" >Grade 5</MenuItem>
                            <MenuItem value="Grade 6" >Grade 6</MenuItem>
                            <MenuItem value="Grade 7" >Grade 7</MenuItem>
                            <MenuItem value="Grade 8" >Grade 8</MenuItem>
                            <MenuItem value="Grade 9" >Grade 9</MenuItem>
                            <MenuItem value="Grade 10" >Grade 10</MenuItem>
                            <MenuItem value="Grade 11" >Grade 11</MenuItem>
                            <MenuItem value="Grade 12" >Grade 12</MenuItem>
                            <MenuItem value="College" >College</MenuItem>
                        </Select>
                    </FormControl>
                    <br />
                    <TextField id="school" label="School" className={classes.input} onChange={(e) => setSchool(e.target.value)} />
                    <br />
                    <Typography variant="body1">
                        {error}
                    </Typography>
                    <br />
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