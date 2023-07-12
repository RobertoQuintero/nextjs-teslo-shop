import { ShopLayout } from "@/components/layouts"
import { Chip, Grid, Typography } from "@mui/material"
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid"
import Link from "next/link"

const columns: GridColDef[]=[
  {field:'id',headerName:'ID',width:100},
  {field:'fullname',headerName:'Nombre completo',width:300},
  {
    field: 'paid',
    headerName:'Pagada',
    description:'Muestra información si está pagada la orden o no',
    width:200,
    renderCell:(params:GridRenderCellParams)=>{
      
      return params.row.paid
              ?<Chip color='success' label='Pagada' variant='outlined'/>
              :<Chip color='error' label='No pagada' variant='outlined'/>
              
    }
  },
  {
    field:'details',
    headerName:'Detalle de orden',
    width:200,
    sortable:false,
    renderCell:(params:GridRenderCellParams)=>{
      
      return <Link href={`/orders/${params.row.id}`}>Detalle de orden</Link>
              
    }

},
]

const rows=[
  {id:1,paid:true,fullname:'Roberto Quintero'},
  {id:2,paid:false,fullname:'Fernando Herrera'},
  {id:3,paid:true,fullname:'James Clear'},
  {id:4,paid:false,fullname:'Marian Rojas'},
  {id:5,paid:false,fullname:'Viktor Frankl'},
  {id:6,paid:true,fullname:'Robert Greene'},
]

const HistoryPage = () => {
  return (
    <ShopLayout title={'Historial de ordenes'} pageDescription="Hisorial de ordenes del cliente">
      <Typography variant='h1' component='h1'>Historial de ordenes</Typography>

      <Grid container>
        <Grid item xs={12} sx={{height:650,width:'100%'}}>
          <DataGrid
            rows={ rows }
            columns={ columns }
            initialState={{
              pagination: { 
                paginationModel: { pageSize: 10 } 
              },
            }}
            pageSizeOptions={[5, 10, 25]}
          />
        </Grid>

      </Grid>
    </ShopLayout>
  )
}

export default HistoryPage