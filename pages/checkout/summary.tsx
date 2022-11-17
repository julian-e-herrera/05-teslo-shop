import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import { CartList, OrdenSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import NextLink from 'next/link'

const SummaryPage = () => {
    return (
        <ShopLayout title={'Resumen de orden'} pageDescription={'Resumen de la orden'}>
            <Typography variant='h1' component='h1'>
                Resumen de la orden
            </Typography>
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
                                <NextLink href='/cart' passHref legacyBehavior>
                                    <Link >
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>
                            <OrdenSummary />
                            <Box sx={{ mt: 3 }}>
                                <Button color='secondary' className='circular-btn' fullWidth>
                                    Confirmar Orden
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </ShopLayout>
    )
}

export default SummaryPage