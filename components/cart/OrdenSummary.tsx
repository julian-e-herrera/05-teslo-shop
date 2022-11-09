import { Grid, Typography } from '@mui/material';
import React from 'react'

export const OrdenSummary = () => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography>No. Productos</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography>3 items</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>Subtotal:</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography> {`$${105}`}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography>Impuestos(15%)</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end'>
                <Typography> {`$${43}`}</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }}>
                <Typography variant='subtitle1'>Total:</Typography>
            </Grid>
            <Grid item xs={6} display='flex' justifyContent='end' sx={{ mt: 2 }}>
                <Typography variant='subtitle1'> {`$${148}`}</Typography>
            </Grid>
        </Grid>
    )
}
