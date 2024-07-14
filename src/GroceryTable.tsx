import React, { useState } from 'react';
import {
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    TableSortLabel, 
    TablePagination, 
    Paper, 
    FormControl, 
    Select, 
    MenuItem, 
    SelectChangeEvent, 
    Box, 
    Typography, 
    InputAdornment,
} from '@mui/material';
import { TuneSharp as TuneSharpIcon } from '@mui/icons-material';
import { GroceryItem } from './types';

interface GroceryTableProps {
    items: GroceryItem[];
}

type Order = 'asc' | 'desc';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

const GroceryTable: React.FC<GroceryTableProps> = ({ items }) => {
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof GroceryItem>('name');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [section, setSection] = useState('');

    const handleRequestSort = (property: keyof GroceryItem) => (event: React.MouseEvent<unknown>) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSectionChange = (event: SelectChangeEvent<string>) => {
        setSection(event.target.value as string);
        setPage(0);
    };

    const filteredItems = section ? items.filter(item => item.section === section) : items;

    const sortedItems = filteredItems.sort(getComparator(order, orderBy));

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Paper sx={{ padding: 2, width: '80%', maxWidth: 1200, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
                    <Typography variant="h6" component="div">
                        Today's groceries
                    </Typography>
                    <FormControl sx={{ minWidth: 200 }} margin="normal">
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
                <TableContainer sx={{ flexGrow: 1, maxHeight: 53 * 10, overflowY: 'auto' }}>
                    <Table stickyHeader aria-label='sticky table'>
                        <TableHead>
                            <TableRow>
                                <TableCell sortDirection={orderBy === 'name' ? order : false} sx={{ border: '1px solid rgba(224, 224, 224, 1)', color: '#71717A' }}>
                                    <TableSortLabel
                                        active={orderBy === 'name'}
                                        direction={orderBy === 'name' ? order : 'asc'}
                                        onClick={handleRequestSort('name')}
                                        sx={{ color: '#71717A', '&.Mui-active': {color: '#71717A !important'}, '& .MuiTableSortLabel-icon': {color: '#71717A !important'} }}
                                    >
                                        Name
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', color: '#71717A' }}>Section</TableCell>
                                <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', color: '#71717A' }}>Price (€)</TableCell>
                                <TableCell sortDirection={orderBy === 'name' ? order : false} sx={{ border: '1px solid rgba(224, 224, 224, 1)', color: '#71717A' }}>
                                    <TableSortLabel
                                        active={orderBy === 'weight'}
                                        direction={orderBy === 'weight' ? order : 'asc'}
                                        onClick={handleRequestSort('weight')}
                                        sx={{ color: '#71717A', '&.Mui-active': {color: '#71717A !important'}, '& .MuiTableSortLabel-icon': {color: '#71717A !important'} }}
                                    >
                                        Price / 100g (€)
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
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
                <Box display="flex" justifyContent="flex-start">
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 50]}
                        component="div"
                        count={sortedItems.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{
                            '& .MuiToolbar-root': {
                                paddingLeft: 0,
                                paddingRight: 24,
                            }
                        }}
                    />
                </Box>
            </Paper>
        </Box>
    );
};

export default GroceryTable;
