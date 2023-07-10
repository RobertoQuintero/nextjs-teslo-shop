import { Grid, Typography } from "@mui/material"

export const OrderSummary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid display='flex' justifyContent='end' item xs={6}>
        <Typography>3  items</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>
      <Grid display='flex' justifyContent='end' item xs={6}>
        <Typography>${155.66}</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>IMpuestos (15%)</Typography>
      </Grid>
      <Grid display='flex' justifyContent='end' item xs={6}>
        <Typography>${35.66}</Typography>
      </Grid>

      <Grid item xs={6} sx={{mt:2}}>
        <Typography variant='subtitle1'>Total: </Typography>
      </Grid>
      <Grid display='flex' justifyContent='end' item xs={6} sx={{mt:2}}>
        <Typography variant='subtitle1'>${185.66}</Typography>
      </Grid>

    </Grid>
  )
}
