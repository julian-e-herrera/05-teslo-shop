import React, { useContext, useEffect } from 'react'
import { ShopLayout } from '../../components/layouts'
import { Box, Button, FormControl, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { countries } from '../../utils';
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { CartContext } from '../../context';

type FormData = {
    firstName: string,
    lastName: string,
    address: string,
    address2: string,
    zip: string,
    city: string,
    country: string,
    phone: string
}


const getAddressFromCookies = (): FormData => {
    return {
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city: Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',

    }
}


const AddressPage = () => {

    const router = useRouter()
    const { updateAddress } = useContext(CartContext)
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            address: '',
            address2: '',
            zip: '',
            city: '',
            country: '',
            phone: '',
        }
    });

    useEffect(() => {
        reset(getAddressFromCookies())
    }, [reset])



    const onSendForm = async (data: FormData) => {

        updateAddress(data)
        router.push('/checkout/summary')
    }


    return (
        <ShopLayout title='Direccion' pageDescription='Confirmar direccion del destino' >
            <form onSubmit={handleSubmit(onSendForm)}>
                <Typography variant='h1' component='h1'>Direccion</Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField label='Nombre' variant='filled' fullWidth
                            {...register('firstName', {
                                required: 'Este campo es requerido',
                            })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='Apellido' variant='filled' fullWidth  {...register('lastName', {
                            required: 'Este campo es requerido',
                        })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='Direccion' variant='filled' fullWidth {...register('address', {
                            required: 'Este campo es requerido',
                        })}
                            error={!!errors.address}
                            helperText={errors.address?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='Direccion 2 (opcional)' variant='filled' fullWidth  {...register('address2', {
                            required: false,

                        })}
                            error={!!errors.address2}
                            helperText={errors.address2?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='Codigo Postal' variant='filled' fullWidth  {...register('zip', {
                            required: 'Este campo es requerido',

                        })}
                            error={!!errors.zip}
                            helperText={errors.zip?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='Ciudad' variant='filled' fullWidth  {...register('city', {
                            required: 'Este campo es requerido',

                        }
                        )}
                            error={!!errors.city}
                            helperText={errors.city?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {/* <FormControl fullWidth> */}
                        <TextField
                            // select
                            fullWidth
                            variant='filled'
                            label='Pais'
                            defaultValue={Cookies.get('country') || countries[0].code}
                            {...register('country')}
                            error={!!errors.country}
                            helperText={errors.country?.message}
                        >
                            {/* {countries.map(country => (
                                    <MenuItem key={country.code} value={country.code}>{country.name}</MenuItem>
                                ))} */}
                        </TextField>
                        {/* </FormControl> */}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField label='Telefono' variant='filled' fullWidth  {...register('phone', {
                            required: 'Este campo es requerido',
                            minLength: { value: 9, message: 'minimo 10 caracteres' }
                        }

                        )}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Grid>
                </Grid>
                <Box sx={{ mt: 5 }} display='flex' justifyContent='center'>
                    <Button color='secondary' className='circular-btn' size='large' type='submit'>
                        Revisar Pedido
                    </Button>
                </Box>
            </form>
        </ShopLayout>
    )
}





export default AddressPage