import { RemoveShoppingCartOutlined } from '@mui/icons-material'
import { Box, Link, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import NextLink from 'next/link'

const EmptyPage = () => (
    <ShopLayout title={'Carrito de compras vacio'} pageDescription={'No hay nada q mostrar aqui'}>
        <Box display='flex'
            justifyContent='center'
            alignItems='center'
            height='calc(100vh - 200px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
        >
            <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Typography>
                    Su carrito esta vacio
                </Typography>
                <NextLink href='/' style={{ textDecoration: 'none' }} passHref legacyBehavior >
                    <Link typography='h4' color='secondary'
                    >
                        Regresar
                    </Link>
                </NextLink>
            </Box>
        </Box>
    </ShopLayout>
)

export default EmptyPage