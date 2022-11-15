import React from 'react'
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { ShopLayout } from '../../components/layouts'
import { Box, Typography } from '@mui/material'
import { ProductList } from '../../components/products'
import { dbProducts } from '../../database'
import { IProduct } from '../../interfaces'

interface Props {
    products: IProduct[],
    findProducts: boolean,
    query: string
}

const SearchPage: NextPage<Props> = ({ products, findProducts, query }) => {
    return (
        <ShopLayout title={'Teslo-Shop - SearchPage'} pageDescription={'Find best products here'}>
            <Typography variant='h1' component='h1'>Buscar productos</Typography>
            {
                findProducts ?
                    <Box display='flex' sx={{ marginBottom: 1 }}>
                        <Typography variant='h2' sx={{ marginBottom: 1 }}>No se encontraron productos relacionados a: </Typography>
                        <Typography variant='h2' sx={{ marginBottom: 1 }} color='secondary' textTransform='capitalize'> {query} </Typography>
                    </Box>
                    :
                    <Typography variant='h2' sx={{ marginBottom: 1 }} textTransform='capitalize'>Termino: {query}</Typography>
            }
            <ProductList products={products} />
        </ShopLayout>
    )
}





export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { query = '' } = params as { query: string }
    if (query.length === 0) {
        return ({
            redirect: {
                destination: '/',
                permanent: true
            }
        })
    }
    let products = await dbProducts.getProductsByTerm(query)
    const findProducts = products.length === 0

    if (findProducts) {
        products = await dbProducts.getAllProducts()
    }
    return {
        props: {
            products,
            findProducts,
            query
        }
    }
}
export default SearchPage