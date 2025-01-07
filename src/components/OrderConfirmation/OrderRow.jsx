import { TableRow, TableCell, IconButton, Collapse } from '@mui/material';
import { KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowUp as KeyboardArrowUpIcon } from '@mui/icons-material';
import { useState } from 'react';



const OrderRow = ({ order }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{order.id}</TableCell>
        <TableCell>{new Date(order.fecha_creacion).toLocaleDateString()}</TableCell>
        <TableCell>{new Date(order.fecha_entrega).toLocaleDateString()}</TableCell>
        <TableCell align="right">Q {order.total_orden.toFixed(2)}</TableCell>
        <TableCell>
          <OrderStatus status={order.estado} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <OrderSummary items={order.detalles} total={order.total_orden} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderRow;