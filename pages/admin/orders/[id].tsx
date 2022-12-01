import { CreditScoreOutlined, CreditCardOffOutlined, ConfirmationNumberOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import { NextPage, GetServerSideProps } from 'next';


import NextLink from 'next/link'


import { CartList, OrdenSummary } from '../../../components/cart';
import { AdminLayout } from '../../../components/layouts';
import { dbOrders } from '../../../database';
import { IOrder } from '../../../interfaces';



interface Props {
    order: IOrder,

}

const OrderPage: NextPage<Props> = ({ order }) => {


    const { shippingAddress } = order





    return (
        <AdminLayout title={'Resumen de la orden'} subtitle={`OrdenId: ${order._id}`} icon={<ConfirmationNumberOutlined />} >

            {
                order.isPaid ? (
                    <Chip
                        sx={{ my: 2 }}
                        label='Order ya fue pagada'
                        variant='outlined'
                        color='success'
                        icon={<CreditScoreOutlined />}
                    />
                ) : (
                    <Chip
                        sx={{ my: 2 }}
                        label='Pendiente de pago'
                        variant='outlined'
                        color='error'
                        icon={<CreditCardOffOutlined />}
                    />
                )
            }

            <Grid container >
                {/* carlist */}
                <Grid item xs={12} sm={7}>
                    <CartList products={order.orderItems} />

                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent >
                            <Typography variant='h2' >
                                Resumen ({order.numberOfItems}  {order.numberOfItems > 1 ? 'productos' : 'producto'})
                            </Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display='flex' justifyContent='space-between'>
                                <Typography variant='subtitle1' >Direccion de entrega</Typography>
                                <NextLink href='/chechout/address' passHref >
                                    <Link >
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>


                            <Typography>{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                            <Typography >{shippingAddress.address} {shippingAddress.address2 ? `,${shippingAddress.address2}` : ''}</Typography>
                            <Typography >{shippingAddress.city} , {shippingAddress.zip}</Typography>
                            <Typography >{shippingAddress.country}</Typography>
                            <Typography >{shippingAddress.phone}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <OrdenSummary
                                orderValues={{
                                    numberOfItem: order.numberOfItems,
                                    subTotal: order.subTotal,
                                    tax: order.tax,
                                    total: order.total
                                }}
                            />
                            <Box sx={{ mt: 3 }} display='flex' flexDirection='column' >

                                <Box display='flex' flexDirection='column'>
                                    {
                                        order.isPaid ? (
                                            <Chip
                                                sx={{ my: 2 }}
                                                label='Order ya fue pagada'
                                                variant='outlined'
                                                color='success'
                                                icon={<CreditScoreOutlined />}
                                            />
                                        ) : (

                                            <Chip
                                                sx={{ my: 2 }}
                                                label='Order pendiente de pago'
                                                variant='outlined'
                                                color='error'
                                                icon={<CreditCardOffOutlined />} />

                                        )
                                    }

                                </Box>

                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </AdminLayout >
    )
}




export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = '' } = query




    if (!req) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false
            }
        }
    }

    const order = await dbOrders.getOrderById(id.toString())

    if (!order) {
        return {
            redirect: {
                destination: `/orders/history`,
                permanent: false
            }
        }
    }


    return {
        props: {
            order
        }
    }
}

export default OrderPage