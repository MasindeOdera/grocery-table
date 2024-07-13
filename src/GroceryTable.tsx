import React, { useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Paper, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent
} from '@mui/material';
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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, sortedItems.length - page * rowsPerPage);

    return (
        <Paper>
            <FormControl fullWidth margin="normal">
                <InputLabel>Section</InputLabel>
                <Select value={section} onChange={handleSectionChange}>
                    <MenuItem value="">
                        <em>All</em>
                    </MenuItem>
                    {[...new Set(items.map(item => item.section))].map((section) => (
                        <MenuItem key={section} value={section}>{section}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sortDirection={orderBy === 'name' ? order : false}>
                                <TableSortLabel
                                    active={orderBy === 'name'}
                                    direction={orderBy === 'name' ? order : 'asc'}
                                    onClick={handleRequestSort('name')}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Section</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Weight</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.section}</TableCell>
                                <TableCell>${item.price.toFixed(2)}</TableCell>
                                <TableCell>{item.weight} kg</TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={4} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                component="div"
                count={sortedItems.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default GroceryTable;
