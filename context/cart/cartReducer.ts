import { ICartProduct } from '@/interfaces'
import { CartState, ShippingAddress } from './'

type cartActionType=
          {type:'[cart] - LoadCard from cookies | storage',payload:ICartProduct[]}
        | {type:'[cart] - Update products in cart',payload:ICartProduct[]}
        | {type:'[cart] - Change product quantity',payload:ICartProduct}
        | {type:'[cart] - Remove product in cart',payload:ICartProduct}
        | {type:'[cart] - LoadAddress from Cookies',payload:ShippingAddress}
        | {type:'[cart] - update address',payload:ShippingAddress}
        | {type:'[cart] - Update cart summary',payload:{
            numberOfItems: number;
            subTotal: number;
            tax: number;
            total: number;
        }}
        
export const cartReducer = (state:CartState,action:cartActionType):CartState => {
  
  switch (action.type) {
    case '[cart] - LoadCard from cookies | storage':
      return {
        ...state,
        isLoaded:true,
        cart:[...action.payload]
      }
    
    case '[cart] - Update products in cart':
      return {
        ...state,
        cart:[...action.payload]
      }

    case '[cart] - Change product quantity':
      return {
        ...state,
        cart:state.cart.map(product=>{
          if(product._id !== action.payload._id) return product
          if(product.size !== action.payload.size) return product

          return action.payload
        })
      }
    
      case '[cart] - Remove product in cart':
      return {
        ...state,
        // cart:state.cart.filter(product=>product!==action.payload),
        cart:state.cart.filter(product=>!(product._id===action.payload._id&&product.size===action.payload.size ))
      }

      case '[cart] - Update cart summary':
      return {
        ...state,
        ...action.payload
      }

      case '[cart] - update address':
      case '[cart] - LoadAddress from Cookies':
        return {
          ...state,
          shippingAddress:action.payload
        }
      

    default:
      return state
  }
}