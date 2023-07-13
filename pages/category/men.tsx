import { ShopLayout } from '@/components/layouts'
import { ProductList } from '@/components/products'
import { FullScreenLoading } from '@/components/ui'
import { Typography } from '@mui/material'
import React from 'react'
import { useProducts } from '@/hooks'

const MenPage = () => {
  const {products,isLoading}= useProducts('/products?gender=men')

  return (
    <ShopLayout title='Caballeros' pageDescription='Productos para  caballero'>
      <Typography variant="h1" component='h1'>Tienda</Typography>
      <Typography variant="h2" sx={{mb:1}}>Todos los productos</Typography>

      {
        isLoading
          ? <FullScreenLoading />
          : <ProductList
              products={products}
            />
      }
    </ShopLayout>
  )
}

export default MenPage