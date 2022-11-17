import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import NextLink from 'next/link'


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre completo', width: 300 },
    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra informacion si esta pagada la orden o no',
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return (
                params.row.paid ?
                    (<Chip
                        sx={{ my: 2 }}
                        label='Pagada'
                        variant='outlined'
                        color='success'

                    />)
                    : (
                        <Chip
                            sx={{ my: 2 }}
                            label='No pagada'
                            variant='outlined'
                            color='error'
                        />)
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Ver orden',
        width: 100,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
                    <Link>
                        Ver orden
                    </Link>
                </NextLink>
            );
        },

    },

]
const rows = [
    { id: 1, paid: true, fullname: 'Julian Herrera', orden: '1' },
    { id: 2, paid: false, fullname: 'Malisa Flores', orden: '2' },
    { id: 3, paid: true, fullname: 'Eduardo Rios', orden: '13' },
    { id: 4, paid: false, fullname: 'Marcelo', orden: '14' },
    { id: 5, paid: true, fullname: 'Laura Herrera', orden: '15' }

]

const HistoryPage = () => {
    return (
        <ShopLayout title={'Historial de ordenes'} pageDescription={'Historial de ordenes del cliente'}>
            <Typography variant='h1' component='h1'>Historila de ordenes</Typography>
            <Grid container>

                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />

                </Grid>
            </Grid>
        </ShopLayout>)
}

export default HistoryPage