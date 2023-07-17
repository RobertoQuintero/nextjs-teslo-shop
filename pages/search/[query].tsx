import { GetServerSideProps } from 'next'
import { ShopLayout } from "@/components/layouts"
import { ProductList } from "@/components/products"
import {  Box, Typography } from "@mui/material"
import { dbProducts } from '@/database'
import { IProduct } from '@/interfaces'

interface Props {
  products: IProduct[],
  foundProducts: boolean,
  query:string
}

const SearchPage = ({products,foundProducts,query}:Props) => {
  
  

  return (
    <ShopLayout  title={"Teslo-Shop - Home"} pageDescription={"Encuentra los mejores productos de Teslo aqui"}>
      <Typography variant="h1" component='h1'>Buscar Producto</Typography>
      
      {
        foundProducts
          ?<Typography variant="h2" sx={{mb:1}} textTransform='capitalize'>Término: {query}</Typography>
          :<Box display='flex'>
            <Typography variant="h2" sx={{mb:1}}>No encontramos ningún producto</Typography>
            <Typography variant="h2" sx={{ml:1}} color='secondary' textTransform='capitalize'>{query}</Typography>
          </Box>    
      }
      <ProductList products={products} />
    </ShopLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {query = ''}= ctx.params as {query:string}

  if(!query.length){
    return {
      redirect:{
        destination:'/',
        permanent:true
      }
    }
  }

  let products= await dbProducts.getProductsByTerm(query)
  const foundProducts:boolean = products.length>0

  //TODO: busqueda de guardados en  cookies
  if(!foundProducts){
    products= await dbProducts.getAllProducts()
  }
  return {
    props: {
      products,
      foundProducts,
      query
    }
  }
}

export default SearchPage