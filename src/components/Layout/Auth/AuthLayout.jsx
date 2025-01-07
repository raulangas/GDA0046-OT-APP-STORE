import { styled } from "@mui/material";
import { Outlet } from "react-router-dom";

const Wrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.background.default, // Opcional: color de fondo
    padding: theme.spacing(0),
}));

export const AuthLayout = () => {
    return (
        <Wrapper>
            <Outlet />
        </Wrapper>
    )
}
