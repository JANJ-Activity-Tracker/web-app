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
            main: "#39815a", // dark green
        },
        secondary: {
            main: "#98c354", // light green
        },
        textPrimary: {
            light: "#636466", // dark grey
            main: "black"
        }
    },
});

export default theme;
