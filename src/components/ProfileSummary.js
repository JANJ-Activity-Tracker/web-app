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
        width: "150px",
        [theme.breakpoints.down('md')]: {
            width: "140px"
        },
        [theme.breakpoints.down('sm')]: {
            width: "100px"
        },
        [theme.breakpoints.down('xs')]: {
            width: "75px"
        },
    },
    text: {
        color: "white",
        [theme.breakpoints.down('md')]: {
            fontSize: 20
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 12
        },
    },
    nameText: {
        color: "white",
        [theme.breakpoints.down('md')]: {
            fontSize: 35
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: 30
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: 15
        },
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
                    <Typography variant="h3" className={classes.nameText}>{profile.first_name + " " + profile.last_name}</Typography>
                    <Typography variant="h5" className={classes.text}>Class of {profile.grad_year}</Typography>
                    <Typography variant="h5" className={classes.text}>{profile.school}</Typography>
                    <Typography variant="h5" className={classes.text}>{profile.township}</Typography>
                </Grid>
            </Grid>
        </div>
    )
}