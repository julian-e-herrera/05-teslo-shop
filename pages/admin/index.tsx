import { AccessTimeFilledOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, DashboardOutlined, GroupsOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material'
import { Grid, setRef, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import useSWR from 'swr'


import { SummaryTile } from '../../components/admin'
import { AdminLayout } from '../../components/layouts'
import { DashboardSummaryResponse } from '../../interfaces'



const DashboardPage = () => {
    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000
    })

    const [refreshIn, setRefreshIn] = useState(30)


    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Tick')
            setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30)
        }, 1000)

        return () => clearInterval(interval)

    }, [])


    if (!error && !data) {
        return <></>
    }
    if (error) {
        console.log(error)
        return <Typography> Error al cargar la informacion</Typography>
    }


    const {
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        numberWithNoInventory,
        lowInventory,
        notPaidOrders
    } = data!

    return (
        <AdminLayout
            title={'Dashboard'}
            subtitle={'estadisticas generales'}
            icon={<DashboardOutlined />} >
            <Grid container spacing={2}>

                <SummaryTile
                    title={numberOfOrders}
                    subtitle={'Ordenes totales'}
                    icon={<CreditCardOffOutlined
                        color='secondary' sx={{ fontSize: 40 }} />} />
                <SummaryTile
                    title={paidOrders}
                    subtitle={'Ordenes pagadas'}
                    icon={<AttachMoneyOutlined
                        color='success' sx={{ fontSize: 40 }} />} />
                <SummaryTile
                    title={notPaidOrders}
                    subtitle={'Ordenes pendientes'}
                    icon={<CreditCardOffOutlined
                        color='error' sx={{ fontSize: 40 }} />} />
                <SummaryTile
                    title={numberOfClients}
                    subtitle={'Clientes'}
                    icon={<GroupsOutlined
                        color='primary' sx={{ fontSize: 40 }} />} />
                <SummaryTile
                    title={numberOfProducts}
                    subtitle={'Productos'}
                    icon={<CategoryOutlined
                        color='warning' sx={{ fontSize: 40 }} />} />
                <SummaryTile
                    title={numberWithNoInventory}
                    subtitle={'Sin existencia'}
                    icon={<CancelPresentationOutlined
                        color='error' sx={{ fontSize: 40 }} />} />
                <SummaryTile
                    title={lowInventory}
                    subtitle={'Bajo inventario'}
                    icon={<ProductionQuantityLimitsOutlined
                        color='error' sx={{ fontSize: 40 }} />} />
                <SummaryTile
                    title={refreshIn}
                    subtitle={'Actualizacion en :'}
                    icon={<AccessTimeFilledOutlined
                        color='secondary' sx={{ fontSize: 40 }} />} />

            </Grid>

        </AdminLayout>
    )
}

export default DashboardPage