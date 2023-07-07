import { ShopLayout } from '@/components/layouts'
import { Box, Typography } from '@mui/material'
import React from 'react'

const Custom404 = () => {
  return (
    <ShopLayout pageDescription='No hay nada que mostrar aqui' title='Page not found'>
      <Box
      sx={{
        flexDirection:{xs:'column',sm:'row'}
      }}
      display='flex' justifyContent='center' alignItems='center' height='calc(100vh - 200px)'>
        <Typography variant='h1' component='h1' fontSize={100} fontWeight={200}>404 |</Typography>
        <Typography marginLeft={2}>No encontramos ninguna página aquí</Typography>
      </Box>
    </ShopLayout>
  )
}

export default Custom404