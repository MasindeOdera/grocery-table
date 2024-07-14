// GroceryTable.tsx
import React, { useState } from 'react';
import { Box, Paper, SelectChangeEvent } from '@mui/material';
import { GroceryItem } from '../types';
import Header from './Header';
import GroceryTableComponent from './GroceryTableComponent';
import PaginationComponent from './PaginationComponent';

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
                <Header section={section} items={items} handleSectionChange={handleSectionChange} />
                <GroceryTableComponent
                    items={sortedItems}
                    order={order}
                    orderBy={orderBy}
                    handleRequestSort={handleRequestSort}
                    page={page}
                    rowsPerPage={rowsPerPage}
                />
                <PaginationComponent
                    count={sortedItems.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
};

export default GroceryTable;
