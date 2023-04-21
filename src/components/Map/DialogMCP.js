import React, { useEffect } from 'react'

import {
    Dialog, DialogTitle, DialogContent, TextField, Stack, DialogActions, Button, Snackbar
} from '@mui/material'

import { useCreateMCP } from '../../hooks/MCPs/useCreateMCP';
import { useUpdateMCP } from '../../hooks/MCPs/useUpdateMCP';

const DialogMCP = ({ open, onClose, curMCP = null }) => {
    const { createMCP, isLoading, error } = useCreateMCP();
    const { updateMCP } = useUpdateMCP();

    const [form, setForm] = React.useState(!(!curMCP) ? { x: curMCP.x.$numberDecimal, y: curMCP.y.$numberDecimal, load: curMCP.load.$numberDecimal, cap: curMCP.cap } : { x: 0, y: 0, load: 0, cap: 0 });
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
    useEffect(() => {
        if (isSuccess) {
            setShowSuccessMessage(true);
        }
    }, [isSuccess]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (curMCP) {
            updateMCP(curMCP._id, form).then(() => {
                setIsSuccess(true);
            });
        } else {
            createMCP(form).then(() => {
                setIsSuccess(true);
            });
            console.log(form);
        }
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
                <DialogTitle align='center' variant="h5">MCP information
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogTitle>
                {/* {error && <p>Error: {error}</p>}
            {isSuccess &&<p>Success! MCP created.</p>} */}
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
                    <Button onClick={handleSubmit} disabled={isLoading}>{isLoading ? 'Loading...' : 'Create MCP'}</Button>
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
export default DialogMCP;