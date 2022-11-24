import { Box, Grid, TextField, Typography, Button, Link, Chip, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form'
import { validations } from '../../utils';
import { GetServerSideProps } from 'next'
import { ErrorOutlineOutlined } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { signIn, getProviders } from 'next-auth/react'
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from '../api/auth/[...nextauth]'//"../../auth/[...nextauth]"



type FormData = {
    email: string,
    password: string,
};

const LoginPage = () => {

    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false)

    const [providers, setProviders] = useState<any>({})


    useEffect(() => {
        getProviders().then((prov) => {

            setProviders(prov)
        }

        )


    }, [])


    const onLoginUser = async ({ email, password }: FormData) => {
        setShowError(false)

        // const isValidLogin = await loginUser(email, password)

        // if (!isValidLogin) {
        //     setShowError(true)
        //     setTimeout(() => {
        //         setShowError(false)
        //     }, 3000);
        //     return
        // }
        // const destination = router.query.p?.toString() || '/'
        // router.replace(destination)

        await signIn('credentials', { email, password })
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

                        <Grid item xs={12} display='flex' justifyContent='end' flexDirection='column'>
                            <Divider sx={{ with: '100%', mb: 2 }} />
                            {
                                Object.values(providers).map((provider: any) => {
                                    if (provider.id === 'credentials') return (<div key='credentials'></div>)
                                    return (
                                        <Button key={provider.id} variant='outlined' fullWidth color='primary' sx={{ mb: 1 }} onClick={() => signIn(provider.id)}>
                                            {provider.name}
                                        </Button>
                                    )
                                })
                            }
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
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

export default LoginPage


