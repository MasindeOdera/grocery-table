// Header.tsx
import React from 'react';
import {
    Box, Typography, FormControl, Select, MenuItem, InputAdornment,
} from '@mui/material';
import { TuneSharp as TuneSharpIcon } from '@mui/icons-material';
import { GroceryItem } from '../types';
import { SelectChangeEvent } from '@mui/material';

interface HeaderProps {
    section: string;
    items: GroceryItem[];
    handleSectionChange: (event: SelectChangeEvent<string>) => void;
}

const Header: React.FC<HeaderProps> = ({ section, items, handleSectionChange }) => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
            <Typography variant="h6" component="div">
                Today's groceries
            </Typography>
            <FormControl sx={{ minWidth: 200 }}>
                <Select 
                    value={section} 
                    onChange={handleSectionChange}
                    displayEmpty
                    startAdornment={
                        <InputAdornment position="start">
                            <TuneSharpIcon />
                        </InputAdornment>
                    }
                    renderValue={(selected) => {
                        if (selected === '') {
                            return <em>Filter by section</em>;
                        }
                        return selected;
                    }}
                    aria-label="Filter by section"
                >
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    {[...new Set(items.map(item => item.section))].map((section) => (
                        <MenuItem key={section} value={section}>{section}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default Header;
