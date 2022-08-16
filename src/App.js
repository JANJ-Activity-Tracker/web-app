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
import Footer from './components/Footer';

const useStyles = makeStyles((theme) => ({
  dashboard: {
    position: "absolute",
    zIndex: 1,
    textAlign: "center",
    width: "100vw",
    background: 'linear-gradient(to right bottom, #00C0CA, #C3EDEF, #F3F2B3, #E3E24F)',
  }
}));

function App() {
  const [page, setPage] = useState("dashboard");
  const [token, setToken] = useState(localStorage.getItem("token") || null)
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("is_admin") === "true" ? true : false);
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.dashboard}>
        {page === "register" ? <Register setPage={setPage} setToken={setToken} setIsAdmin={setIsAdmin} /> :
          (page === "dashboard" || page === "profile") && token && !isAdmin ? <Dashboard page={page} setPage={setPage} /> :
            (page === "dashboard") && token && isAdmin ? <AdminDashboard page={page} setPage={setPage} /> :
              <Login setPage={setPage} setToken={setToken} setIsAdmin={setIsAdmin} />}
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
