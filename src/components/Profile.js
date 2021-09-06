import React, { useState } from "react";
import { Button, Grid, makeStyles, TextField, Typography } from "@material-ui/core";
import { request } from "../util";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
        height: "100vh",
        width: "100vw",
        zIndex: 0,
        flexGrow: 1,
    },
    box: {
        borderColor: theme.palette.primary.main,
        borderStyle: "solid",
        paddingTop: "30px",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingBottom: "10px",
        borderRadius: "20px",
        height: "100%",
    },
    container: {
        marginTop: "30px"
    },
    input: {
        minWidth: "300px",
        width: "80%",
        marginBottom: "20px",
    },
    text: {
        color: "white",
    },
}));

export default function Profile({ profile, updateProfile }) {
    const classes = useStyles();
    const [firstname, setFirstname] = useState(profile.first_name || "");
    const [lastname, setLastname] = useState(profile.last_name || "");
    const [email, setEmail] = useState(profile.email || "");
    const [grade, setGrade] = useState(profile.grade || "");
    const [school, setSchool] = useState(profile.school || "");
    const [township, setTownship] = useState(profile.township || "");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");

    async function editProfile() {
        let email = localStorage.getItem("email");
        let response = await request({
            type: "PATCH",
            path: `edit-profile/${email}/`,
            body: {
                first_name: firstname,
                last_name: lastname,
                grade: grade,
                school: school,
                township: township
            }
        })

        updateProfile();
        console.log(response);
    }

    return (
        <div >
            <Grid container
                direction="row"
                justifyContent="center"
                alignItems="stretch"
                spacing={3}
                className={classes.container}>
                <Grid item xs={10}>
                    <div >
                        <Typography variant="h3" >Edit Profile</Typography>
                    </div>
                </Grid>
                <Grid item xs={5}>
                    <div className={classes.box}>
                        <Typography variant="h6" >Personal Information</Typography>
                        <form autoComplete="off">
                            <TextField id="standard-basic" defaultValue={firstname} label="First Name" className={classes.input} onChange={(e) => setFirstname(e.target.value)} />
                            <br />
                            <TextField id="standard-basic" defaultValue={lastname} label="Last Name" className={classes.input} onChange={(e) => setLastname(e.target.value)} />
                            <br />
                            <TextField id="standard-basic" defaultValue={grade} label="Grade" className={classes.input} onChange={(e) => setGrade(e.target.value)} />
                            <br />
                            <TextField id="standard-basic" defaultValue={school} label="School" className={classes.input} onChange={(e) => setSchool(e.target.value)} />
                            <br />
                            <TextField id="standard-basic" defaultValue={township} label="Township" className={classes.input} onChange={(e) => setTownship(e.target.value)} />
                            <br />
                            <Typography variant="body1">
                                {error}
                            </Typography>
                            <br />
                            <Button variant="contained" color="secondary" className={classes.button} onClick={editProfile}>
                                Save
                            </Button>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </div >
    )
}