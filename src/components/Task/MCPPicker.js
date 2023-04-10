import React from 'react'

import { Card, CardHeader, Checkbox, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

function indexOf(a, b) {
    for (let i = 0; i < a.length; i++) {
        if (a[i]._id === b._id) {
            return i;
        }
    }
    return -1;
}

const MCPPicker = ({ mcps, mcpChecked, setMCPChecked, unCheckMCP }) => {
    
    const handleToggle = (mcp) => () => {
        let currentIndex = indexOf(mcpChecked, mcp)
        const newChecked = [...mcpChecked];
        if (currentIndex === -1) {
            newChecked.push(mcp);
        } else {
            newChecked.splice(currentIndex, 1);
            unCheckMCP(mcp._id)
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
                            key={mcp._id}
                            role="listitem"
                            onClick={handleToggle(mcp)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={indexOf(mcpChecked, mcp) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary={`MCP số ${mcp._id}`} />
                        </ListItem>
                    );
                })}
            </List>
        </Card>

    )
};


export default MCPPicker