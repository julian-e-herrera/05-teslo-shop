import React from 'react'
import type { NextPage } from 'next'
import { ShopLayout } from '../components/layouts'
import { Typography } from '@mui/material'

import { useSession } from "next-auth/react"
import { ProductList } from '../components/products';
import { useProducts } from '../hooks';
import { FullScreenLoading } from '../components/ui';


const Home: NextPage = () => {

  // const { session } = useSession()
  // console.log(session)

  const { products, isLoading } = useProducts('/products')

  return (
    <ShopLayout title={'Teslo-Shop - Home'} pageDescription={'Find best products here'}>
      <Typography variant='h1' component='h1'>Tienda</Typography>
      <Typography variant='h2' sx={{ marginBottom: 1 }}>Todos los productos</Typography>

      {isLoading ?
        <FullScreenLoading />
        :
        <ProductList products={products} />
      }
    </ShopLayout>
  )
}
export default Home