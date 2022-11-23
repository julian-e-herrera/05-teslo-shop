import { Box, Grid, TextField, Typography, Button, Link, Chip } from '@mui/material';
import React, { useContext, useState } from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { validations } from '../../utils';
import { tesloApi } from '../../api';
import { ErrorOutlineOutlined } from '@mui/icons-material';
import { AuthContext } from '../../context';
import { useRouter } from 'next/router';



type FormData = {
    email: string,
    password: string,
};

const LoginPage = () => {

    const router = useRouter()
    const { loginUser } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false)

    const onLoginUser = async ({ email, password }: FormData) => {
        setShowError(false)

        const isValidLogin = await loginUser(email, password)

        if (!isValidLogin) {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 3000);
            return
        }
        const destination = router.query.p?.toString() || '/'
        router.replace(destination)
    }

    return (
        <AuthLayout title={'Ingresar'}>
            <form onSubmit={handleSubmit(onLoginUser)}>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'>Iniciar sesion</Typography>
                            <Chip
                                label='No reconocemos ese usuario / password'
                                color='error'
                                icon={<ErrorOutlineOutlined />}
                                className='fadeIn'
                                sx={{ display: showError ? 'flex' : 'none' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                type="email"
                                label="Correo"
                                variant="filled"
                                fullWidth
                                {...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail
                                }

                                )}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Contraseña"
                                variant="filled"
                                type="password"
                                fullWidth
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 5, message: 'minimo 6 caracteres' }
                                }

                                )}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button color='secondary' className='circular-btn' size='large' fullWidth type='submit'>
                                Ingresar
                            </Button>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href={router.query.p ? `/auth/register?p=${router.query.p}` : `/auth/register`} passHref legacyBehavior>
                                <Link>
                                    No tienes cuenta?
                                </Link>
                            </NextLink>

                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default LoginPage


