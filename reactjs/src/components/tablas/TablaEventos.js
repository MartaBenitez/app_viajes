import React from 'react';
import { useTable, usePagination } from 'react-table';
import { Box, Table, Thead, Button, Tbody, Tr, Th, Td } from '@chakra-ui/react';

function PaginatedTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 3 },
    },
    usePagination
  );

  const { pageIndex } = state;

  return (
    <>
      <Box overflowX="auto">
        <Table {...getTableProps()} size='sm' variant="simple" colorScheme="teal">
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
                ))}
                <Th>Acciones</Th>
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>;
                  })}
                  <Td><Button>Editar</Button><Button>Borrar</Button></Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>

      <Box display="flex" justifyContent="center" mt={4}>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Anterior
        </button>
        <span>
          Página{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Siguiente
        </button>
      </Box>
    </>
  );
}

export default PaginatedTable;
