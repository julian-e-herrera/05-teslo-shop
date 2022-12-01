import { PeopleOutlined } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { AdminLayout } from '../../components/layouts'
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Grid, MenuItem, Select } from '@mui/material';
import useSWR from 'swr';
import { IUser } from '../../interfaces';
import { tesloApi } from '../../api';

const UsersPage = () => {


    const { data, error } = useSWR<IUser[]>('/api/admin/users')

    const [users, setUsers] = useState<IUser[]>([])
    useEffect(() => {
        if (data && !error) {
            setUsers(data)
        }
    }, [data])

    if (!data && !error) return <></>





    const onRoleUpdated = async (userId: string, newRole: string) => {
        const previosUsers = users.map(user => ({ ...user }))
        const updatedUsers = users.map(user => ({
            ...user,
            role: userId == user._id ? newRole : user.role
        }))

        setUsers(updatedUsers)

        try {
            await tesloApi.put('/admin/users', { userId, role: newRole })
        } catch (error) {
            setUsers(previosUsers)
            console.log(error)
            alert('no se pudo actualizar')
        }
    }

    const rows = users.map(user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }))


    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Correo', width: 250 },
        { field: 'name', headerName: 'Nombre completo', width: 300 },
        {
            field: 'role',
            headerName: 'Rol',
            width: 300,
            renderCell: ({ row }: GridRenderCellParams) => {
                return (
                    <Select
                        value={row.role}
                        label='Rol'
                        sx={{ width: '300px' }}
                        onChange={({ target }) => onRoleUpdated(row.id, target.value)}
                    >
                        <MenuItem value='admin'>Admin</MenuItem>
                        <MenuItem value='client'>Client</MenuItem>
                        <MenuItem value='super-user'>Super User</MenuItem>
                        <MenuItem value='SEO'>SEO</MenuItem>

                    </Select>
                )
            }
        },

    ]






    return (
        <AdminLayout title={'Usuarios'} subtitle={'Mantenimiento de usuarios'} icon={<PeopleOutlined />} >

            <Grid container>

                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}

                    />

                </Grid>
            </Grid>



        </AdminLayout>
    )
}

export default UsersPage


