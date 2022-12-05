import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import React, { FC, useContext } from 'react'
import NextLink from 'next/link'
import { ItemCounter } from '../ui/ItemCounter';
import { CartContext } from '../../context';
import { ICartProduct, IOrderItem } from '../../interfaces';
import { IOrder } from '../../interfaces/order';





interface Props {
    editable?: boolean,
    products?: IOrderItem[],
}

export const CartList: FC<Props> = ({ editable = false, products }) => {
    const { cart, updateCartQuantity, removeCartProduct } = useContext(CartContext)


    const onNewCartQuantityValue = (product: ICartProduct, newCartQuantityValue: number) => {
        product.quantity = newCartQuantityValue
        updateCartQuantity(product)

    }
    const productToShow = products ? products : cart

    return (
        <>
            {
                productToShow.map(product => {
                    return (
                        <Grid container spacing={2} key={product.slug + product.size} sx={{ mb: 1 }}>
                            <Grid item xs={3}>
                                <NextLink href={`/product/${product.slug}`} passHref >
                                    <Link>
                                        <CardActionArea>
                                            <CardMedia
                                                className='fadeIn'
                                                component='img'
                                                image={product.image}
                                                alt={product.title}
                                                sx={{ borderRadius: '5px' }}
                                            />

                                        </CardActionArea>
                                    </Link>
                                </NextLink>

                            </Grid>
                            <Grid item xs={7}>
                                <Box display='flex' flexDirection='column'>
                                    <Typography variant='body1' >{product.title}</Typography>
                                    <Typography variant='body1' >Talla: <strong>{product.size}</strong></Typography>
                                    {editable ? (
                                        <ItemCounter
                                            currentValue={product.quantity}
                                            updatedQuantity={(value) => { onNewCartQuantityValue(product as ICartProduct, value) }}
                                            maxValue={10} />
                                    ) : (
                                        <Typography variant='h6' >{product.quantity} {product.quantity > 1 ? 'productos' : 'producto'}</Typography>)
                                    }
                                </Box>
                            </Grid>
                            <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                                <Typography variant='subtitle1'> {`$${product.price}`}</Typography>
                                {editable &&
                                    <Button variant='text' color='secondary' onClick={() => removeCartProduct(product as ICartProduct)}>
                                        Remover
                                    </Button>
                                }

                            </Grid>

                        </Grid>
                    );
                }

                )
            }
        </>
    )
}
