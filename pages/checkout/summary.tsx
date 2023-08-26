import NextLink from 'next/link'
import { CartList, OrderSummary } from "@/components/cart"
import { ShopLayout } from "@/components/layouts"
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from "@mui/material"
import { useContext } from 'react'
import { CartContext, ShippingAddress } from '@/context'
import { countries } from '@/utils'

const SummaryPage = () => {
  const {shippingAddress,numberOfItems} = useContext(CartContext)

  if(!shippingAddress)return <></>

  const { firstName,lastName,phone,address,city,country:c,zip,address2}= shippingAddress as ShippingAddress

  const countryName=countries.find(country=>country.code===c)?.name

  return (
    <ShopLayout title="Resumen de orden" pageDescription="Resumen de la orden">
      <Typography variant="h1" component='h1'>Resumen de la orden</Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>

        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography variant='h2'>Resumen ({numberOfItems} productos)</Typography>
              <Divider sx={{my:1}}/>

              <Box display='flex' justifyContent='space-between'>
              <Typography variant='subtitle1'>Dirección de entrega</Typography>
                <NextLink href='/checkout/address' passHref legacyBehavior>
                  <Link underline='always'>
                    Editar
                  </Link>
                </NextLink>
              </Box>

              <Typography >{firstName} {lastName}</Typography>
              <Typography >{address}</Typography>
              <Typography >{city} {zip}</Typography>
              <Typography >{countryName}</Typography>
              <Typography >+52 {phone}</Typography>
              <Divider sx={{my:1}}/>

              <Box display='flex' justifyContent='end'>
                <NextLink href='/cart' passHref legacyBehavior>
                  <Link underline='always'>
                    Editar
                  </Link>
                </NextLink>
              </Box>

              <OrderSummary/>

              <Box sx={{mt:3}}>
                <Button color='secondary' className="circular-btn" fullWidth>
                  Confirmar orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </ShopLayout>
  )
}

export default SummaryPage