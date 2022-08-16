import { createTheme } from '@material-ui/core/styles';
import '@fontsource/roboto';

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    palette: {
        primary: {
            main: "#275f74", // boundless blue
        },
        secondary: {
            main: "#00a0ae", // resilient turquoise
        },
        textPrimary: {
            light: "#636466", // dark grey
            main: "black"
        }
    },
});

export default theme;
