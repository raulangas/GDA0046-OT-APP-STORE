import { createTheme } from "@mui/material";
import { red } from '@mui/material/colors';

export const appTheme = createTheme({
    // palette: {
    //   mode: 'dark'
    // },

    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
    components: {
        MuiTableCell: {
            styleOverrides: {
                head: {
                    backgroundColor: '#f5f5f5',
                    color: '#333', 
                    fontWeight: 'bold', 
                    textAlign: 'left', 
                },
            },
        },
    },
});

