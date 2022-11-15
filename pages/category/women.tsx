import { Typography } from '@mui/material'
import { NextPage } from 'next'
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'

const WomenPage: NextPage = () => {

    const { products, isLoading } = useProducts('/products?gender=women')

    return (
        <ShopLayout title={'Teslo-Shop - Women '} pageDescription={'Find best women products here'}>
            <Typography variant='h1' component='h1'>Mujeres</Typography>
            <Typography variant='h2' sx={{ marginBottom: 1 }}>Todos los productos para ellas</Typography>

            {isLoading ?
                <FullScreenLoading />
                :
                <ProductList products={products} />
            }
        </ShopLayout>
    )
}

export default WomenPage