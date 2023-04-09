import React, { useEffect } from 'react'

import {
    Dialog, DialogTitle, DialogContent, TextField, FormHelperText,
    MenuItem, Stack, DialogActions, Button
} from '@mui/material'

import { useCreateTruck } from '../../hooks/Trucks/useCreateTruck'
import { useUpdateTruck } from '../../hooks/Trucks/useUpdateTruck'


const TruckForm = ({ open, onClose, currTruck = null }) => {
    const { createTruck } = useCreateTruck();
    const { updateTruck } = useUpdateTruck();
    const [form, setForm] = React.useState(!(!currTruck) ? { cap: currTruck.cap, load: currTruck.load.$numberDecimal }
        : { cap: 0, load: 0 });

    const handleSubmit = (e) => {
        if (currTruck) {
            updateTruck(currTruck._id, form);
        } else {
            createTruck(form);
        }
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle align='center' variant="h5">Truck Form</DialogTitle>
            <DialogContent>
                <Stack alignItems='center' spacing={1}  >
                    <TextField label="Sức chứa hiện tại" required type='number' fullWidth variant="outlined"
                        sx={{ m: 1 }}
                        value={form.load} onChange={(e) => setForm({ ...form, load: e.target.value })} />
                    <TextField label="Sức chứa tối đa" required type='number' fullWidth variant="outlined"
                        value={form.cap} onChange={(e) => setForm({ ...form, cap: e.target.value })} />
                    <FormHelperText>phải lớn hơn sức chứa hiện tại</FormHelperText>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>Xác nhận</Button>
            </DialogActions>
        </Dialog>
    )
}

export default TruckForm