import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import { CartList, OrdenSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import NextLink from 'next/link'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'

const OrderPage = () => {
    return (
        <ShopLayout title={'Resumen de la orden 23333'} pageDescription={'Resumen de la orden'}>
            <Typography variant='h1' component='h1'>
                Orden :3652736
            </Typography>

            {/* <Chip
                sx={{ my: 2 }}
                label='Pendiente de pago'
                variant='outlined'
                color='error'
                icon={<CreditCardOffOutlined />}
            /> */}
            <Chip
                sx={{ my: 2 }}
                label='Order ya fue pagada'
                variant='outlined'
                color='success'
                icon={<CreditScoreOutlined />}
            />


            <Grid container >
                {/* carlist */}
                <Grid item xs={12} sm={7}>
                    <CartList />

                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent >
                            <Typography variant='h2' >
                                Resumen (3 productos)
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1' >Direccion de entrega</Typography>
                                <NextLink href='/chechout/address' passHref legacyBehavior>
                                    <Link >
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>


                            <Typography>Julian</Typography>
                            <Typography >Julian</Typography>
                            <Typography >Julian</Typography>
                            <Typography >Julian</Typography>
                            <Typography >Julian</Typography>

                            <Divider sx={{ my: 1 }} />
                            <Box display='flex' justifyContent='end'>
                                <NextLink href='/cart' passHref>
                                    <Link >
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>
                            <OrdenSummary />
                            <Box sx={{ mt: 3 }}>
                                <h1>
                                    Pagar
                                </h1>
                                <Chip
                                    sx={{ my: 2 }}
                                    label='Order ya fue pagada'
                                    variant='outlined'
                                    color='success'
                                    icon={<CreditScoreOutlined />}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </ShopLayout>
    )
}

export default OrderPage