import React, { useState } from "react";
import { AppBar, Avatar, IconButton, makeStyles, Link, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import { BACKEND_URL } from "../constants";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
        height: "100vh",
        width: "100vw",
        zIndex: 0,
        flexGrow: 1,
    },
    logo: {
        width: "200px",
        [theme.breakpoints.down('sm')]: {
            width: "100px",
        },
        marginTop: "10px",
        marginBottom: "10px",
    },
    title: {
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: {
            fontSize: 15
        },
    },
    text: {
        color: "white",
    },
}));

export default function AdminHeader({ setPage }) {
    const classes = useStyles();
    const [menuSelect, setMenuSelect] = useState(null);
    const menuOpen = Boolean(menuSelect);

    const handleMenu = (event) => {
        setMenuSelect(event.currentTarget);
    };

    const handleClose = () => {
        setMenuSelect(null);
    };

    const logout = () => {
        setPage("login");
        localStorage.setItem("token", "");
        localStorage.setItem("email", "");
        localStorage.setItem("is_admin", false);
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <img src="/JANJ-logo-white.png" className={classes.logo} />
                    <Typography variant="h5" gutterBottom className={classes.title}>JANJ Activity Tracker Admin Dashboard</Typography>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        className={classes.avatar} >
                        <Avatar alt="profile" src="/menu.png" />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={menuSelect}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={menuOpen}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => setPage("dashboard")}>Dashboard</MenuItem>
                        <Link href={BACKEND_URL + "/"} style={{ textDecoration: 'none', color: "black" }}>
                            <MenuItem>
                                Manage Database
                            </MenuItem>
                        </Link>
                        <MenuItem onClick={logout}>Log Out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    )
}