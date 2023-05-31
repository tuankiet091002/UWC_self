import React, { useEffect } from 'react'

import {
    Dialog, DialogTitle, DialogContent, TextField, Stack, DialogActions, Button, Snackbar, Typography
} from '@mui/material'

import { useCreateMCP } from '../../hooks/MCPs/useCreateMCP';

const MCPForm = ({ open, onClose }) => {
    const { createMCP, isLoading, error } = useCreateMCP();

    const [form, setForm] = React.useState({ x: 0, y: 0, load: 0, cap: 0 });
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
    useEffect(() => {
        if (isSuccess) {
            setShowSuccessMessage(true);
        }
    }, [isSuccess]);
    const handleSubmit = (e) => {
        e.preventDefault();

        createMCP(form).then(() => {
            setIsSuccess(true);
        });

        onClose();
    }
    const handleClose = (e) => {
        e.preventDefault();
        onClose();
    }
    const handleClear = (e) => {
        e.preventDefault();
        setForm({ x: 0, y: 0, load: 0, cap: 0 });
    }
    const handleCloseSuccessMessage = () => {
        setShowSuccessMessage(false);
    }
    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle align='center' variant="h5">MCP Form
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogTitle>
                <Typography color='error'>{error}</Typography>
                <DialogContent>
                    <Stack alignItems='center' spacing={1}  >
                        <TextField label="Lat" required type='number' fullWidth variant="outlined"
                            sx={{ m: 1 }}
                            value={form.x} onChange={(e) => setForm({ ...form, x: e.target.value })} />
                        <TextField label="Lng" required type='number' fullWidth variant="outlined"
                            sx={{ m: 1 }}
                            value={form.y} onChange={(e) => setForm({ ...form, y: e.target.value })} />
                        <TextField label="Load" required type='number' fullWidth variant="outlined"
                            sx={{ m: 1 }}
                            value={form.load} onChange={(e) => setForm({ ...form, load: e.target.value })} />
                        <TextField label="Capacity" required type='number' fullWidth variant="outlined"
                            value={form.cap} onChange={(e) => setForm({ ...form, cap: e.target.value })} />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClear}>Clear</Button>
                    <Button onClick={handleSubmit} disabled={isLoading}>{isLoading ? 'Loading...' : 'Create'}</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={showSuccessMessage}
                autoHideDuration={3000}
                onClose={handleCloseSuccessMessage}
                message='Success!'
            />
        </>
    )
}
export default MCPForm;