import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { CartList, OrdenSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import NextLink from 'next/link'
import { CartContext } from '../../context'
import { countries } from '../../utils'
import { useEffect } from 'react';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'


const SummaryPage = () => {
    const { shippingAddress, numberOfItem } = useContext(CartContext)
    const router = useRouter()


    useEffect(() => {
        if (!Cookies.get('firstName')) {
            router.push('/checkout/address')
        }

    }, [router])



    if (!shippingAddress) {
        return (<></>)
    }
    const { firstName, lastName, address, address2 = '', city, country, phone, zip } = shippingAddress
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
                                Resumen ({numberOfItem} {numberOfItem === 1 ? 'producto' : 'productos'})
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1' >Direccion de entrega</Typography>
                                <NextLink href='/checkout/address' passHref legacyBehavior>
                                    <Link >
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>


                            <Typography>{firstName} {lastName}</Typography>
                            <Typography >{address} {address2 ? `,${address2}` : ''}</Typography>
                            <Typography >{city} , {zip}</Typography>
                            <Typography >{country}</Typography>
                            {/* <Typography >{countries.find(c => c.code === country)?.name}</Typography> */}
                            <Typography >{phone}</Typography>


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