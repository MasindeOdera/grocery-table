// GroceryTableComponent.tsx
import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, Box,
} from '@mui/material';
import { GroceryItem } from '../types';
import { visuallyHidden } from '@mui/utils';

interface GroceryTableComponentProps {
    items: GroceryItem[];
    order: 'asc' | 'desc';
    orderBy: keyof GroceryItem;
    handleRequestSort: (property: keyof GroceryItem) => (event: React.MouseEvent<unknown>) => void;
    page: number;
    rowsPerPage: number;
}

const GroceryTableComponent: React.FC<GroceryTableComponentProps> = ({ items, order, orderBy, handleRequestSort, page, rowsPerPage }) => {

    return (
        <TableContainer sx={{ flexGrow: 1, maxHeight: 53 * 10, overflowY: 'auto' }}>
            <Table stickyHeader aria-label="groceries table">
                <caption style={visuallyHidden}>List of groceries and their details</caption>
                <TableHead>
                    <TableRow>
                        <TableCell sortDirection={orderBy === 'name' ? order : false} sx={{ border: '1px solid rgba(224, 224, 224, 1)', color: '#71717A' }}>
                            <TableSortLabel
                                active={orderBy === 'name'}
                                direction={orderBy === 'name' ? order : 'asc'}
                                onClick={handleRequestSort('name')}
                                sx={{ color: '#71717A', '&.Mui-active': { color: '#71717A !important' }, '& .MuiTableSortLabel-icon': { color: '#71717A !important' } }}
                            >
                                Name
                                {orderBy === 'name' ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                        <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', color: '#71717A' }}>Section</TableCell>
                        <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', color: '#71717A' }}>Price (€)</TableCell>
                        <TableCell sortDirection={orderBy === 'weight' ? order : false} sx={{ border: '1px solid rgba(224, 224, 224, 1)', color: '#71717A' }}>
                            <TableSortLabel
                                active={orderBy === 'weight'}
                                direction={orderBy === 'weight' ? order : 'asc'}
                                onClick={handleRequestSort('weight')}
                                sx={{ color: '#71717A', '&.Mui-active': { color: '#71717A !important' }, '& .MuiTableSortLabel-icon': { color: '#71717A !important' } }}
                            >
                                Price / 100g (€)
                                {orderBy === 'weight' ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                        <TableRow key={item.id}>
                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{item.name}</TableCell>
                            <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{item.section}</TableCell>
                            <TableCell align="right" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{item.price.toFixed(2)}</TableCell>
                            <TableCell align="right" sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>{item.weight}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default GroceryTableComponent;
