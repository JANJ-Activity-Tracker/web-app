import React, { useState } from "react";
import { Link, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	footer: {
		bottom: 0,
		left: 0,
		backgroundColor: 'white',
		width: '100%',
		height: '5%',
		position: 'fixed',
		zIndex: 1,
	},
	title: {
		marginTop: "30px",
		paddingLeft: "10px",
		fontSize: 18,
		[theme.breakpoints.down('sm')]: {
			fontSize: 10
		},

	},
	text: {
		marginLeft: "10px",
	},
	image: {
		height: '5%',
		right: 0,
		bottom: 0,
		position: 'fixed',
	},
}));

export default function Footer() {
	const classes = useStyles();

	return (
		<div className={classes.footer}>
			<Typography variant="overline" className={classes.title}>
				Created By:
				<Link className={classes.text} color="inherit" underline="hover" href="https://www.linkedin.com/in/serena-zeng-b57a37180/">
					<u>Serena Zeng</u>
				</Link>
				<Link className={classes.text} color="inherit" underline="hover" href="https://www.linkedin.com/in/swathiparthibha/">
					<u>Swathi Parthibha</u>
				</Link>
				<Link className={classes.text} color="inherit" underline="hover" href="https://www.linkedin.com/in/ria-vora/">
					<u>Ria Vora</u>
				</Link>

				<img src="/DEL_PRI_RGB.jpg" alt="" className={classes.image} />
			</Typography>
		</div>
	)
}