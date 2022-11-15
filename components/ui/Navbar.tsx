import React, { useState } from 'react'
import NextLink from 'next/link'
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material'
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { useContext } from "react"
import { UiContext } from "../../context"

export const NavBar = () => {

    const { asPath, push } = useRouter()
    const { toggleSideMenu } = useContext(UiContext)




    const [searchTerm, setSearchTerm] = useState('')
    const [isSearchVisible, setIsSearchVisible] = useState(false)


    const onSearchTerm = () => {
        if (searchTerm.length === 0) { return }
        push(`/search/${searchTerm}`)
    }




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
                <Box sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block' } }} className='fadeIn'>
                    <NextLink href='/category/men' style={{ textDecoration: 'none' }} passHref>
                        <Link >
                            <Button color={asPath === '/category/men' ? 'primary' : 'info'}>Hombres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/women' style={{ textDecoration: 'none' }} passHref>
                        <Link >
                            <Button color={asPath === '/category/women' ? 'primary' : 'info'}>Mujeres</Button>
                        </Link>
                    </NextLink>
                    <NextLink href='/category/kid' style={{ textDecoration: 'none' }} passHref>
                        <Link >
                            <Button color={asPath === '/category/kid' ? 'primary' : 'info'}>Niños</Button>
                        </Link>
                    </NextLink>
                </Box>
                <Box flex={1} />

                {isSearchVisible ?
                    (<Input
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                        className='fadeIn'
                        autoFocus
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' ? onSearchTerm() : null}
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setIsSearchVisible(false)}
                                >
                                    <ClearOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />)
                    :
                    (<IconButton sx={{ display: { xs: 'none', sm: 'flex' } }} className='fadeIn' onClick={() => setIsSearchVisible(true)}>
                        <SearchOutlined />
                    </IconButton>
                    )
                }

                <IconButton sx={{ display: { xs: 'flex', sm: 'none' } }} onClick={toggleSideMenu}>
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
                <Button onClick={toggleSideMenu}>Menu</Button>
            </Toolbar>

        </AppBar>
    )
}
