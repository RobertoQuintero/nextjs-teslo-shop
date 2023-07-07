import { ShopLayout } from "@/components/layouts"
import { initialData } from "@/database/products"
import { Card, CardActionArea, CardMedia, Grid, Typography } from "@mui/material"

const Home = () => {
  return (
    <ShopLayout  title={"Teslo-Shop - Home"} pageDescription={"Encuentra los mejores productos de Teslo aqui"}>
      <Typography variant="h1" component='h1'>Tienda</Typography>
      <Typography variant="h2" sx={{mb:1}}>Todos los productos</Typography>

      <Grid container spacing={4}>
        {
          initialData.products.map(product=>(
            <Grid item key={product.slug} xs={6} sm={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component='img'
                    image={`products/${product.images[0]}`}
                    alt={product.title}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </ShopLayout>
  )
}

export default Home