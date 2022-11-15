import { Typography } from '@mui/material'
import { NextPage } from 'next'
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'

const MenPage: NextPage = () => {

    const { products, isLoading } = useProducts('/products?gender=men')

    return (
        <ShopLayout title={'Teslo-Shop - Men '} pageDescription={'Find best men products here'}>
            <Typography variant='h1' component='h1'>Hombres</Typography>
            <Typography variant='h2' sx={{ marginBottom: 1 }}>Todos los productos para ellos</Typography>

            {isLoading ?
                <FullScreenLoading />
                :
                <ProductList products={products} />
            }
        </ShopLayout>
    )
}

export default MenPage