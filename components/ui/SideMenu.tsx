import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { useContext, useState } from "react"
import { AuthContext, UiContext } from "../../context"
import { useRouter } from 'next/router'

export const SideMenu = () => {
    const { isMenuOpen, toggleSideMenu } = useContext(UiContext)
    const router = useRouter()
    const { isLoggedIn, logOut, user } = useContext(AuthContext)

    const [searchTerm, setSearchTerm] = useState('')


    const onSearchTerm = () => {
        if (searchTerm.length === 0) return
        toggleSideMenu()
        navigateTo(`/search/${searchTerm}`)
    }

    const navigateTo = (url: string) => {
        toggleSideMenu()
        router.push(url)
    }
    const onLogout = () => {
        toggleSideMenu()
        logOut()
        //router.replace('/')
    }
    return (
        <Drawer
            open={isMenuOpen}
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={toggleSideMenu}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>

                <List>

                    <ListItem>
                        <Input
                            autoFocus
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' ? onSearchTerm() : null}
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={onSearchTerm}
                                    >
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>
                    {isLoggedIn && (
                        <>
                            <ListItem button >
                                <ListItemIcon>
                                    <AccountCircleOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Perfil'} />
                            </ListItem>

                            <ListItem button >
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Mis Ordenes'} />
                            </ListItem>
                        </>
                    )}



                    <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={() => navigateTo('/category/men')}>
                        <ListItemIcon>
                            <MaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'} />
                    </ListItem>

                    <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={() => navigateTo('/category/women')}>
                        <ListItemIcon>
                            <FemaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Mujeres'} />
                    </ListItem>

                    <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={() => navigateTo('/category/kid')}>
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Niños'} />
                    </ListItem>

                    {isLoggedIn ? (
                        <ListItem button onClick={() => onLogout()}>
                            <ListItemIcon>
                                <LoginOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItem>

                    ) : (
                        <ListItem button sx={{ display: isLoggedIn ? 'none' : 'flex' }} onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}>
                            <ListItemIcon>
                                <VpnKeyOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Ingresar'} />
                        </ListItem>)
                    }




                    {/* Admin */}
                    {user?.role === 'admin' &&
                        <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>

                            <ListItem button>
                                <ListItemIcon>
                                    <CategoryOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Productos'} />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Ordenes'} />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <AdminPanelSettings />
                                </ListItemIcon>
                                <ListItemText primary={'Usuarios'} />
                            </ListItem>
                        </>
                    }
                </List>
            </Box>
        </Drawer>
    )
}