import React, { useState } from "react";
import { AppBar, Avatar, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";

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
    },
    title: {
        flexGrow: 1,
    },
    text: {
        color: "white",
    },
}));

export default function Header({ setPage, setToken }) {
    const classes = useStyles();
    const [menuSelect, setMenuSelect] = useState(null);
    const menuOpen = Boolean(menuSelect);

    const handleMenu = (event) => {
        setMenuSelect(event.currentTarget);
    };

    const handleClose = () => {
        setMenuSelect(null);
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <img src="/JANJ-logo-white.png" className={classes.logo} />
                    <Typography variant="h5" gutterBottom className={classes.title}>JANJ Activity Tracker</Typography>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        className={classes.avatar} >
                        <Avatar alt="profile" src="/profile_default.png" />
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
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Log Out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div>
    )
}