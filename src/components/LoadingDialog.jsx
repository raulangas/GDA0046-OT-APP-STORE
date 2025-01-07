import { Box, CircularProgress, Dialog, DialogContent } from "@mui/material";

const LoadingDialog = ({ open }) => {
    return (
        <Dialog open={open} maxWidth="sm" fullWidth>
            <DialogContent>
                <Box display="flex" justifyContent="center" alignItems="center" p={3}>
                    <CircularProgress />
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default LoadingDialog;