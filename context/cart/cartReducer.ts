import { ICartProduct } from '@/interfaces'
import { CartState } from './'

type cartActionType=
          {type:'[cart] - LoadCard from cookies | storage',payload:ICartProduct[]}
        | {type:'[cart] - Add Product',payload:ICartProduct}
        
export const cartReducer = (state:CartState,action:cartActionType):CartState => {
  
  switch (action.type) {
    case '[cart] - LoadCard from cookies | storage':
      return {
        ...state,
      }

    default:
      return state
  }
}