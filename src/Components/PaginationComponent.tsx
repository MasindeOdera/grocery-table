// PaginationComponent.tsx
import React from 'react';
import { TablePagination, Box } from '@mui/material';

interface PaginationComponentProps {
    count: number;
    rowsPerPage: number;
    page: number;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
    count, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage,
}) => {
    return (
        <Box display="flex" justifyContent="flex-start">
            <TablePagination
                rowsPerPageOptions={[10, 20, 50]}
                component="div"
                count={count}
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
    );
};

export default PaginationComponent;
