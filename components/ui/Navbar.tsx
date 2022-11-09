import React from 'react'
import NextLink from 'next/link'
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material'
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'

export const NavBar = () => {
    return (
        <AppBar>
            <Toolbar>
                <NextLink href='/' style={{ textDecoration: 'none' }} passHref>
                    <Link display='flex' alignItems='center'>
                        <Typography variant='h6' component='div'>Teslo |</Typography>
                        <Typography component='div' sx={{ ml: 0.5 }}>Shop</Typography>
                    </Link>
                </NextLink>
                <Box flex={1} />
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <NextLink href='/category/men' style={{ textDecoration: 'none' }} passHref>
                        <Link >
                            <Button>Hombres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/women' style={{ textDecoration: 'none' }} passHref>
                        <Link >
                            <Button>Mujeres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/kid' style={{ textDecoration: 'none' }} passHref>
                        <Link >
                            <Button>Niños</Button>
                        </Link>
                    </NextLink>
                </Box>
                <Box flex={1} />
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <NextLink href='/cart' style={{ textDecoration: 'none' }} passHref>
                    <Link >
                        <IconButton>
                            <Badge badgeContent={2} color='secondary'>
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>
                <Button>Menu</Button>
            </Toolbar>

        </AppBar>
    )
}
