import { AddCircleOutlined, RemoveCircleOutlined } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material';
import React, { FC } from 'react'

interface Props {

}

export const ItemCounter: FC<Props> = () => {
  return (
    <Box display='flex' alignItems='center'>
      <IconButton>
        <RemoveCircleOutlined />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>1</Typography>
      <IconButton>
        <AddCircleOutlined />
      </IconButton>
    </Box>
  )
}
