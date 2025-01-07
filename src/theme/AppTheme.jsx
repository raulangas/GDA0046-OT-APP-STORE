import { CssBaseline, ThemeProvider } from "@mui/material"
import { appTheme } from "../config/appTheme.js"


const AppTheme = ({ children }) => {
    return (
        <ThemeProvider theme={appTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )

}

export default AppTheme