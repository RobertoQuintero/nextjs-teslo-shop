import { CartContext } from "@/context"
import { currency } from "@/utils"
import { LocalTaxi } from "@mui/icons-material"
import { Grid, Typography } from "@mui/material"
import { useContext } from "react"

export const OrderSummary = () => {

  const {numberOfItems,subTotal,total,tax}= useContext(CartContext)


  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid display='flex' justifyContent='end' item xs={6}>
        <Typography>{numberOfItems} {numberOfItems>1?'productos':'producto'}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid display='flex' justifyContent='end' item xs={6}>
        <Typography>{currency.format(subTotal)}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE)*100}%)</Typography>
      </Grid>
      <Grid display='flex' justifyContent='end' item xs={6}>
        <Typography>{currency.format(tax)}</Typography>
      </Grid>

      <Grid item xs={6} sx={{mt:2}}>
        <Typography variant='subtitle1'>Total: </Typography>
      </Grid>
      <Grid display='flex' justifyContent='end' item xs={6} sx={{mt:2}}>
        <Typography variant='subtitle1'>{currency.format(total)}</Typography>
      </Grid>

    </Grid>
  )
}
