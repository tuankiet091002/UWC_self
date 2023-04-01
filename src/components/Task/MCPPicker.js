import React from 'react'

import { Card, CardHeader, Checkbox, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'


const MCPPicker = ({ mcps, mcpChecked, setMCPChecked, unCheckMCP}) => {
    const handleToggle = (value) => () => {
        const currentIndex = mcpChecked.indexOf(value);
        const newChecked = [...mcpChecked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
            unCheckMCP(value)
        }

        setMCPChecked(newChecked);
    };

    const numberOfChecked = () => mcpChecked.length

    const handleToggleAll = () => () => {
        if (numberOfChecked() === mcps.length) {
            unCheckMCP(-1)
            setMCPChecked([]);
        } else {
            setMCPChecked(mcps);
        }
    };


    return (
        <Card>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll()}
                        checked={numberOfChecked() === mcps.length && mcps.length !== 0}
                        indeterminate={
                            numberOfChecked() !== mcps.length && numberOfChecked() !== 0
                        }
                        disabled={mcps.length === 0}
                        inputProps={{
                            'aria-label': 'all items selected',
                        }}
                    />
                }
                title="MCP"
                subheader={`${numberOfChecked()}/${mcps.length} selected`}
            />
            <Divider />
            <List
                sx={{
                    width: 200,
                    height: 230,
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {mcps.map((mcp) => {
                    return (
                        <ListItem
                            key={mcp}
                            role="listitem"
                            onClick={handleToggle(mcp)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={mcpChecked.indexOf(mcp) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary={`MCP số ${mcp}`} />
                        </ListItem>
                    );
                })}
            </List>
        </Card>

)};


export default MCPPicker