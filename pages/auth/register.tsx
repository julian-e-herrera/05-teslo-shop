import { Box, Grid, TextField, Typography, Button, Link, Chip } from '@mui/material';
import React, { useContext, useState } from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from 'next/link'
import { tesloApi } from '../../api';
import { validations } from '../../utils';
import { useForm } from 'react-hook-form'
import { ErrorOutlineOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context';
import { signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';



type FormData = {
    name: string,
    email: string,
    password: string,
};

const RegisterPage = () => {

    const router = useRouter()
    const { registerUser } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')



    const onRegisterForm = async ({ name, email, password }: FormData) => {
        setShowError(false)
        const { hasError, message } = await registerUser(name, email, password)

        if (hasError) {
            setShowError(true)
            setErrorMessage(message!)
            setTimeout(() => setShowError(false), 3000);
            return
        }

        // const destination = router.query.p?.toString() || '/'
        // router.replace(destination)
        await signIn('credentials', { email, password })
    }
    return (
        <AuthLayout title={'Registrar'}>
            <form onSubmit={handleSubmit(onRegisterForm)}>
                <Box sx={{ width: 350, padding: '10px 20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component='h1'>Crear cuenta</Typography>
                            <Chip
                                label='No reconocemos ese usuario / password'
                                color='error'
                                icon={<ErrorOutlineOutlined />}
                                className='fadeIn'
                                sx={{ display: showError ? 'flex' : 'none' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label='Nombre Completo' variant='filled' fullWidth type='text'
                                {...register('name', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'minimo 2 caracteres' }
                                }

                                )}
                                error={!!errors.name}
                                helperText={errors.name?.message}
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
                                helperText={errors.email?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField label="Contraseña"
                                variant="filled"
                                type="password"
                                fullWidth
                                {...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 5, message: 'minimo 6 caracteres' }
                                }

                                )}
                                error={!!errors.password}
                                helperText={errors.password?.message} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button color='secondary' className='circular-btn' size='large' fullWidth type='submit'>
                                Ingresar
                            </Button>
                        </Grid>
                        <Grid item xs={12} display='flex' justifyContent='end'>
                            <NextLink href={router.query.p ? `/auth/login?p=${router.query.p}` : `/auth/login`} passHref legacyBehavior>
                                <Link>
                                    Ya tienes cuenta?
                                </Link>
                            </NextLink>

                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout >
    )
}
export const getServerSideProps: GetServerSideProps = async ({ req, res, query }) => {
    const session = await unstable_getServerSession(req, res, authOptions)

    const { p = '/' } = query
    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }
}
export default RegisterPage


