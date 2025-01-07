import { Box, Card, CardContent, Typography } from "@mui/material";


export const CustomerInfoCard = ({ customer }) => {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Información del Cliente
          </Typography>
          <Box sx={{ display: 'grid', gap: 1 }}>
            {Object.entries(customer).map(([key, value]) => (
              <Typography key={key} variant="body2">
                <strong>{key}:</strong> {value}
              </Typography>
            ))}
          </Box>
        </CardContent>
      </Card>
    );
  };