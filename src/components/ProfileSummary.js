import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    image: {
        width: "200px",
        marginBottom: "20px",
    },
    text: {
        color: "white",
    },
}));

export default function ProfileSummary() {
    const classes = useStyles();

    return (
        <div >
            <img src="/profile_default.png" className={classes.image} />
            <Typography variant="body1" className={classes.text}>Name</Typography>
            <Typography variant="body2" className={classes.text}>Grade #</Typography>
            <Typography variant="body2" className={classes.text}>School</Typography>
        </div>
    )
}