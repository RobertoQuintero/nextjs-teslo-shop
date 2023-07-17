import { ICartProduct, ISize } from "@/interfaces"
import { Box, Button } from "@mui/material"
import { Dispatch, SetStateAction } from "react"

interface Props{
  selectedSize?: ISize
  sizes: ISize[],
  onSelectedSize: (size:ISize)=>void
}

export const SizeSelector = ({selectedSize,sizes,onSelectedSize}:Props) => {
  console.log(selectedSize)
  return (
    <Box>
      {
        sizes.map(size=>(
          <Button 
            key={size} 
            size='small'
            color={selectedSize===size ? 'primary':'info'}
            onClick={()=>onSelectedSize(size)}
            >
              {size}
          </Button>
        ))
      }
    </Box>
  )
}
