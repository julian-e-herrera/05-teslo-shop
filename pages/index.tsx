import React from 'react'
import type { NextPage } from 'next'
import { ShopLayout } from '../components/layouts'
import { Typography } from '@mui/material'

import { initialData } from '../database/products'
import { ProductList } from '../components/products/ProductList';


const Home: NextPage = () => {
  return (
    <ShopLayout title={'Teslo-Shop -Home'} pageDescription={'Find best products here'}>
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ marginBottom: 1 }}>Todos los productos</Typography>
      <ProductList products={initialData.products as any} />
    </ShopLayout>
  )
}
export default Home