import React, { useState } from "react";
import { AppBar, Avatar, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
        height: "100vh",
        width: "100%",
        zIndex: 0,
        flexDirection: "column"
    },
    logo: {
        width: "200px",
        [theme.breakpoints.down('sm')]: {
            width: "100px",
        },
        marginTop: "10px",
        marginBottom: "10px",
    },
    space: {
        flexGrow: 1
    },
    menu: {
        alignContent: "flex-end",
    },
    text: {
        color: "white",
    },
}));

export default function Header({ setPage }) {
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
                    <div className={classes.space} />
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        className={classes.avatar} >
                        <Avatar alt="profile" src="/menu.png" />
                    </IconButton>
                    <Menu
                        className={classes.menu}
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
                        <MenuItem onClick={() => setPage("profile")}>Edit Profile</MenuItem>
                        <MenuItem onClick={logout}>Log Out</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </div >
    )
}