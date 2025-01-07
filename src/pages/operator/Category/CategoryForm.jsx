import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { SwitchElement } from "react-hook-form-mui";
import { FormContainer } from "react-hook-form-mui";
import { TextFieldElement } from "react-hook-form-mui";


const defaultValues = {
    nombre: '',
    activo: true
};


const CategoryForm = ({ open, category, onClose, onSubmit }) => {

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                {category ? 'Editar Categoría' : 'Nueva Categoría'}
            </DialogTitle>
            <FormContainer onSuccess={(data) => {
                onSubmit(data)
            }}
                defaultValues={category || defaultValues}
            >
                <DialogContent>
                    <TextFieldElement
                        name="nombre"
                        label="Nombre"
                        required
                        validation={{ required: 'El nombre es requerido' }}
                        fullWidth
                        margin="normal"
                    />
                    <SwitchElement
                        name="activo"
                        label="Activo"
                        required
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancelar</Button>
                    <Button type="submit" variant="contained" color="primary">
                        {category ? 'Actualizar' : 'Crear'}
                    </Button>
                </DialogActions>
            </FormContainer>
        </Dialog>
    )

}

export default CategoryForm;
