import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import NextLink from 'next/link'
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';


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
                <NextLink href={`/orders/${params.row.orderId}`} passHref >
                    <Link>
                        Ver orden
                    </Link>
                </NextLink>
            );
        },

    },

]


interface Props {
    orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({ orders }) => {



    const rows = orders.map((order, idx) => {
        const { firstName, lastName } = order.shippingAddress
        const fullName = `${firstName} ${lastName}`
        return {
            id: idx + 1,
            paid: order.isPaid,
            fullname: fullName,
            orderId: order._id
        }

    })
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


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const session: any = await getSession({ req })
    if (!session) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/history`,
                permanent: false
            }
        }
    }

    const orders = await dbOrders.getOrderByUser(session.user._id)

    return {
        props: {
            orders
        }
    }
}


export default HistoryPage