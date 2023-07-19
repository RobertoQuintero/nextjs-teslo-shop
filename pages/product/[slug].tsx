import { ShopLayout } from "@/components/layouts"
import { ProductSlideshow, SizeSelector } from "@/components/products"
import { ItemCounter } from "@/components/ui"
import { CartContext } from "@/context"
import { dbProducts } from "@/database"
import { ICartProduct, IProduct, ISize } from "@/interfaces"
import { Box, Button,  Chip,  Grid, Typography } from "@mui/material"
import {  NextPage,GetStaticPaths,GetStaticProps  } from "next"
import { useRouter } from "next/router"
import { useContext, useState } from "react"


interface Props {
  product: IProduct
}

const ProductPage:NextPage<Props> = ({product}) => {

  const router = useRouter()

  const {addProductToCart} = useContext(CartContext)

  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  })

  const onSelectedSize=(size:ISize)=>{
    setTempCartProduct(prev=>({...prev,size}))
  }

  const updatedQuantity=(quantity:number)=>{
    
    setTempCartProduct(prev=>({...prev,quantity}))
  }

  const onAddProduct=()=>{
    if(!tempCartProduct.size)return

    addProductToCart(tempCartProduct)
    router.push('/cart')
    // console.log(tempCartProduct)
  }
  
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images}/>
        </Grid>

        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant="h1" component='h1'>{product.title}</Typography>
            <Typography variant="subtitle1" component='h2'>${product.price}</Typography>

            <Box sx={{my:2}}>
              <Typography variant='subtitle1'>Cantidad</Typography>
              
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updatedQuantity={updatedQuantity}
                maxValue={product.inStock>10 ?10:product.inStock}
              />

              <SizeSelector
                selectedSize={tempCartProduct.size}
                sizes={product.sizes}
                onSelectedSize={onSelectedSize}
              />
            </Box>
            {
              product.inStock>0
                ? <Button 
                    onClick={onAddProduct}
                    color='secondary' 
                    className='circular-btn'>
                    {
                      tempCartProduct.size
                        ? 'Agregar al Carrito'
                        : 'Seleccione una talla'
                    }
                  </Button>
                : <Chip label='No hay disponibles' color='error' variant='outlined'/>
            }
            

            
            <Box sx={{mt:3}}>
              <Typography variant="subtitle1">Descripción</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

// nextgetss
// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const product=await dbProducts.getProductsBySlug(`${ctx.query.slug}`);
//   if(!product){
//     return {
//       redirect:{
//         destination:'/',
//         permanent:false
//       }
//     }
//   }
//   return {
//     props: {
//       product
//     }
//   }
// }

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const slugs = await dbProducts.getAllPoductSlug()

  return {
    paths: slugs.map(slug=>({params:{slug:slug.slug}})),
    fallback: "blocking"
  }
}


export const getStaticProps: GetStaticProps = async (ctx) => {
  const {slug} = ctx.params as {slug:string}
  const product=await dbProducts.getProductsBySlug(`${slug}`);
  if(!product){
    return {
      redirect:{
        destination:'/',
        permanent:false
      }
    }
  }
  return {
    props: {
      product
    },
    revalidate: 86400,// 60 * 60 * 24
  }
}

export default ProductPage