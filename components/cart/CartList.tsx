import NextLink from 'next/link'
import { initialData } from "@/database/seed-data"
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { ItemCounter } from '../ui'
import { useContext } from 'react'
import { CartContext } from '@/context'
import { ICartProduct } from '@/interfaces'
interface Props {
  editable?:boolean;
}

export const CartList = ({editable=false}:Props) => {

  const {cart,updateCartQuantity,removeCartProduct} = useContext(CartContext)

  const onNewCartQuantityValue=(product:ICartProduct,newQuantityValue:number)=>{
    product.quantity=newQuantityValue
    updateCartQuantity(product)
  }

  return (
    <>
      {
        cart.map(product=>(
          <Grid container spacing={2} key={product.slug+product.size} sx={{mb:1}}>
            <Grid item xs={3}>
              {/* llevar a la pagina del producto */}
              <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
                <Link>
                  <CardActionArea>
                    <CardMedia 
                      image={`/products/${product.image}`}
                      component='img'
                      sx={{borderRadius:'5px'}}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={7}>
              <Box display='flex' flexDirection='column'>
                <Typography variant='body1'>{product.title}</Typography>
                <Typography variant='body1'>Talla <strong>{product.size}</strong></Typography>
                {
                  editable
                    ? <ItemCounter 
                        maxValue={10} 
                        currentValue={product.quantity} 
                        updatedQuantity={(value)=> onNewCartQuantityValue(product,value)} 
                        />
                    : <Typography variant='h5'>{product.quantity} producto{product.quantity ?'s':''}</Typography>
                }
              </Box>
            </Grid>
            <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
              <Typography variant='subtitle1'>${product.price}</Typography>
                {
                  editable&&
                    <Button variant='text' color='secondary'
                      onClick={()=>removeCartProduct(product)}
                    >
                      Remover
                    </Button>

                }
            </Grid>
          </Grid>
        ))
      }
    </>
  )
}
