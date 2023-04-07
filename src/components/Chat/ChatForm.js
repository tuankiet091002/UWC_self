import React, { useEffect } from 'react'

import {
    Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select,
    MenuItem, Chip, Box, OutlinedInput, Stack, DialogActions, Button
} from '@mui/material'

import { useAuthContext } from '../../hooks/Auth/useAuthContext'
import { useEmpContext } from '../../hooks/Emps/useEmpContext'
import { useGetEmps } from '../../hooks/Emps/useGetEmps'
import { useCreateChat } from '../../hooks/Chat/useCreateChat'
import { useUpdateChat } from '../../hooks/Chat/useUpdateChat'  

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: '10rem',
            width: 250,
        },
    },
};

const ChatForm = ({ open, onClose, currChat }) => {
    const {user} = useAuthContext();
    const { emps } = useEmpContext();
    const { getEmps } = useGetEmps();
    const { createChat } = useCreateChat();
    const { updateChat } = useUpdateChat();

    const [form, setForm] = React.useState(!(!currChat) ? { name: currChat.name, users: currChat.users.map(x => x._id) }
        : { name: '', users: [] });

    useEffect(() => {
        setForm(!(!currChat) ? { name: currChat.name, users: currChat.users.map(x => x._id) }
            : { name: '', users: [] });
    }, [currChat])

    useEffect(() => {
        getEmps();
    }, [])

    const handleChange = (e) => {
        const { target: { value }, } = e;
        setForm({ ...form, users: value })
    };

    const handleSubmit = (e) => {
        !(!currChat) ? updateChat(currChat._id, form) : createChat(form);
        setForm({name: '', users: []});
        onClose();
    }
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle align='center' variant="h5">Chat Form</DialogTitle>
            <DialogContent>
                <Stack alignItems='center' spacing={3}  >
                    <TextField label="Tên nhóm" required fullWidth variant="outlined"
                        sx={{m:1}}
                        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-chip-label">Chọn thành viên</InputLabel>
                        <Select
                            labelId="demo-multiple-chip-label"
                            multiple
                            value={form.users.filter((emp) => emp !== user._id)}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Chọn thành viên" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={emps.find(x => x._id === value).name} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {emps.filter((emp) => emp._id !== user._id).map((emp) => (
                                <MenuItem
                                    key={emp._id}
                                    value={emp._id}
                                >
                                    {emp.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>Xác nhận</Button>
                <Button onClick={() => setForm({ name: '', users: [] })} color="error">Clear</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ChatForm