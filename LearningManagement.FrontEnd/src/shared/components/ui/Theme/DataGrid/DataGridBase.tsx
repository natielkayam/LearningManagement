import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { Box, Card, CardContent, Typography, useMediaQuery, useTheme, Pagination, TextField, InputAdornment } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useMemo } from "react";
import SearchIcon from '@mui/icons-material/Search';

interface DataGridBaseProps {
  rows: any[];
  columns: GridColDef[];
  searchPlaceholder?: string;
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  borderRadius: '12px',
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
  '& .MuiDataGrid-cell': {
    borderBottom: 'none',
    padding: theme.spacing(3, 4),
    fontSize: '0.9rem',
    fontWeight: 400,
    color: theme.palette.text.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    '&:focus': {
      outline: 'none',
    },
  },
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: 'transparent',
    borderBottom: 'none',
    '& .MuiDataGrid-columnHeader': {
      padding: theme.spacing(2, 3),
      fontWeight: 600,
      fontSize: '0.85rem',
      color: theme.palette.text.secondary,
      textTransform: 'none',
      letterSpacing: '0.025em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      minHeight: '48px',
    },
    '& .MuiDataGrid-columnHeaderTitle': {
      fontWeight: 600,
      fontSize: '0.85rem',
    },
    '& .MuiDataGrid-sortIcon': {
      marginLeft: theme.spacing(0.5),
    },
  },
  '& .MuiDataGrid-row': {
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      transform: 'none',
      boxShadow: 'none',
    },
    '&.Mui-selected': {
      backgroundColor: theme.palette.primary.light + '08',
      '&:hover': {
        backgroundColor: theme.palette.primary.light + '12',
      },
    },
    '&:last-of-type': {
      borderBottom: 'none',
    },
  },
  '& .MuiDataGrid-footerContainer': {
    borderTop: `1px solid ${theme.palette.divider}`,
    backgroundColor: 'transparent',
    padding: '0 !important',
  },
  '& .MuiDataGrid-toolbarContainer': {
    padding: theme.spacing(3, 4),
    backgroundColor: 'transparent',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '& .MuiDataGrid-checkboxInput': {
    color: theme.palette.primary.main,
  },
  '& .MuiDataGrid-selectedRowCount': {
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },
  '& .MuiDataGrid-pagination': {
    color: theme.palette.text.secondary,
  },
  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
    color: theme.palette.text.secondary,
    fontSize: '0.9rem',
    fontWeight: 500,
  },
  '& .MuiIconButton-root': {
    color: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}));

export function DataGridBase({ rows, columns, searchPlaceholder = "Search..." }: DataGridBaseProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Enterprise pagination and search state
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage] = useState(10);
  
  // Enterprise search and pagination logic
  const filteredRows = useMemo(() => {
    if (!searchTerm) return rows;
    
    return rows.filter(row => 
      columns.some(column => {
        const value = row[column.field];
        return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [rows, searchTerm, columns]);
  
  const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedRows = filteredRows.slice(startIndex, endIndex);
  
  // Reset to first page when search changes
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Mobile Card Layout with Enterprise Pagination
  if (isMobile) {
    return (
      <Box sx={{ width: '100%' }}>
        {/* Enterprise Search Bar */}
        <TextField
          fullWidth
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Virtualized Cards - Only render visible cards */}
        {paginatedRows.map((row, index) => (
          <Card 
            key={row.id || index}
            sx={{ 
              mb: 2, 
              cursor: 'pointer',
              '&:hover': {
                boxShadow: theme.shadows[4],
                transform: 'translateY(-2px)',
                transition: 'all 0.2s ease-in-out',
              }
            }}
          >
            <CardContent sx={{ p: 2 }}>
              {columns.map((column) => (
                <Box key={column.field} sx={{ mb: 1, '&:last-child': { mb: 0 } }}>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'text.secondary', 
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      fontSize: '0.75rem'
                    }}
                  >
                    {column.headerName}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mt: 0.5,
                      fontWeight: 500,
                      color: 'text.primary'
                    }}
                  >
                    {column.renderCell ? 
                      column.renderCell({ 
                        value: row[column.field], 
                        row, 
                        id: row.id || index,
                        field: column.field,
                        api: {} as any,
                        rowNode: {} as any,
                        colDef: column as any,
                        cellMode: 'view' as any,
                        hasFocus: false,
                        tabIndex: -1
                      }) : 
                      row[column.field]
                    }
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        ))}
        
        {/* Enterprise Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Box>
    );
  }

  // Desktop Table Layout
  return (
    <Box sx={{ width: '100%' }}>
      {/* Desktop Search Bar */}
      <TextField
        fullWidth
        placeholder={searchPlaceholder}
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      
      <Box sx={{ 
        height: 450,
        width: '100%',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          height: '6px',
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'rgba(0,0,0,0.05)',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,0.2)',
          borderRadius: '3px',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
        },
      }}>
        <StyledDataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 25, 50]}
          density="standard"
          disableColumnResize
          disableColumnMenu
          disableRowSelectionOnClick
          checkboxSelection={false}
          sx={{
            width: '100%',
            height: '100%',
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
            '& .MuiDataGrid-cell:focus-within': {
              outline: 'none',
            },
            '& .MuiDataGrid-main': {
              minWidth: 'max-content',
            },
            '& .MuiDataGrid-virtualScroller': {
              minWidth: 'max-content',
            },
            '& .MuiDataGrid-columnHeaders': {
              minWidth: 'max-content',
            },
            '& .MuiDataGrid-footerContainer': {
              minWidth: 'max-content',
            },
          }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
            filterPanel: {
              filterFormProps: {
                logicOperatorInputProps: { variant: "outlined", size: "small" },
                columnInputProps: { variant: "outlined", size: "small" },
                operatorInputProps: { variant: "outlined", size: "small" },
                valueInputProps: {
                  InputComponentProps: { variant: "outlined", size: "small" },
                },
              },
            },
            pagination: {
              labelRowsPerPage: 'Rows per page:',
              labelDisplayedRows: ({ from, to, count }) => 
                `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`,
            },
          }}
        />
      </Box>
    </Box>
  );
}
