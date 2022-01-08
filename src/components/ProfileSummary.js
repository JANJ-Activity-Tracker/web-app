import React from "react";
import { makeStyles, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        align: "center",
        height: "100%"
    },
    image: {
        width: "150px"
    },
    text: {
        color: "white",
    },
}));

export default function ProfileSummary({ profile }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container className={classes.root} spacing={4}>
                <Grid item xs={3} align="right">
                    <img src="/profile_default.png" className={classes.image} />
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={6} align="left">
                    <Typography variant="h3" className={classes.text}>{profile.first_name + " " + profile.last_name}</Typography>
                    <Typography variant="h5" className={classes.text}>Class of {profile.grad_year}</Typography>
                    <Typography variant="h5" className={classes.text}>{profile.school}</Typography>
                    <Typography variant="h5" className={classes.text}>{profile.township}</Typography>
                </Grid>
            </Grid>
        </div>
    )
}