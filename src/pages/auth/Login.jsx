
import { useAuth } from "../../hooks/useAuth"
import { FormContainer, set, TextFieldElement, useWatch } from "react-hook-form-mui"
import { Stack, Button, styled, Alert, CircularProgress } from "@mui/material"
import MuiCard from '@mui/material/Card';


const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
}));


const MySubmitButton = ({ isDisabled }) => {
    // const [username, password] = useWatch({
    //     name: ["username", "password"], // Campo a observar
    // });
    // console.log("Watched name:", username, password);

    return (
        <Button type={'submit'} variant="contained" color={'primary'} disabled={isDisabled} >
            Iniciar sesión
        </Button>)

};

export const Login = () => {
    const { handleLogin, loading, error } = useAuth()

    // const [username, setUsername] = useState('')
    // const [rol, setRol] = useState('')
    // const roles = ['Cliente', 'Operador']


    const handleSuccess = async (data) => {
        console.log("Login")
        console.log(data)
        try {

            const response = await handleLogin(data)

            console.log("Response")
            console.log(response)
        } catch (error) {
            //si existe data en el error, es un error de validación
            if (error.data?.success === false) {
                error.message = error.data.message
            } else {
                console.log("Error en login")
                console.log(error)
            }


        }


    }


    return (

        loading ? <CircularProgress /> :



            <Card sx={{ border: '1px dashed grey' }} >


                <FormContainer defaultValues={{ username: '', password: '' }} onSuccess={handleSuccess} >
                    <h1>Login</h1>
                    <Stack spacing={3} mb={6}>
                        <TextFieldElement name="email" label="Email" required type="email" autoFocus />
                        <TextFieldElement name="password" label="Contraseña" required type="password" />
                        {error && <Alert severity="error"> {error.message} </Alert>}
                        <MySubmitButton isDisabled={false} />
                    </Stack>
                </FormContainer >

            </Card>

    )
}