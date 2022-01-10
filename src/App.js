import './App.css';
import React, { useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import '@fontsource/roboto';
import theme from './styles.js';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from "@material-ui/core";
import AdminDashboard from './pages/AdminDashboard';

const useStyles = makeStyles((theme) => ({
  bg1: {
    width: "80%",
    position: "absolute",
    top: "-50px",
    left: "-300px",
    zIndex: 0,
  },
  bg2: {
    width: "80%",
    position: "absolute",
    bottom: "-50px",
    right: "-400px",
    zIndex: 0,
  },
  bg3: {
    width: "80%",
    position: "absolute",
    bottom: "-400px",
    left: "0px",
    zIndex: 0,
  },
  dashboard: {
    position: "absolute",
    zIndex: 1,
    textAlign: "center",
    height: "100vh",
    width: "100vw",
  }

}));

function App() {
  const [page, setPage] = useState("dashboard");
  const [token, setToken] = useState(localStorage.getItem("token") || null)
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("is_admin") === "true" ? true : false);
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <img src="/bg1.png" className={classes.bg1} />
      <img src="/bg2.png" className={classes.bg2} />
      <img src="/bg3.png" className={classes.bg3} />
      <div className={classes.dashboard}>
        {page === "register" ? <Register setPage={setPage} setToken={setToken} /> :
          (page === "dashboard" || page === "profile") && token && !isAdmin ? <Dashboard page={page} setPage={setPage} /> :
            (page === "dashboard") && token && isAdmin ? <AdminDashboard page={page} setPage={setPage} /> :
              <Login setPage={setPage} setToken={setToken} setIsAdmin={setIsAdmin} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
