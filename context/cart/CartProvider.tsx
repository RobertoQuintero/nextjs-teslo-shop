import React, { useReducer } from 'react'
import { CartContext, cartReducer } from './'
import { ICartProduct } from '@/interfaces'

interface Props{
  children:JSX.Element|JSX.Element[]
}

export interface CartState{
  cart:ICartProduct[]
}

const Cart_INITIAL_STATE:CartState={
  cart:[]
}

export const CartProvider = ({children}:Props) => {
  const [state, dispatch] = useReducer(cartReducer, Cart_INITIAL_STATE)


  const addProductToCart=(product:ICartProduct)=>{

   const isInCart = state.cart.some(p=>p._id===product._id && p.size===product.size)
   
   if(isInCart){
    const newCart= state.cart.map(p=>{
      if(p._id===product._id){
        p.quantity += product.quantity
      }
      return p
    })
    dispatch({type:'[cart] - Update products in cart',payload:[...newCart]})
   }else{
    dispatch({type:'[cart] - Update products in cart',payload:[...state.cart,product]})
   }
  }
  
  const addProductToCart1=(product:ICartProduct)=>{

   const payload=[...state.cart,product]

    const productInCart= state.cart.some(p=>p._id===product._id)
    if(!productInCart) return dispatch({type:'[cart] - Update products in cart',payload})

    const productInCartButDifferentSize= state.cart.some(p=> p.size === product.size)
    if(!productInCartButDifferentSize) return dispatch({type:'[cart] - Update products in cart',payload})

    const updatedProducts = state.cart.map(p=>{
      p.quantity += product.quantity
      return p
    })

    dispatch({type:'[cart] - Update products in cart',payload:updatedProducts})

  }
  const addProductToCart2=(product:ICartProduct)=>{
    // dispatch({
    //   type:'[cart] - Add Product',
    //   payload:product
    // })

    const productInCart= state.cart.some(p=>p._id===product._id)
    if(!productInCart) return dispatch({type:'[cart] - Update products in cart',payload:[...state.cart,product]})

    const productInCartButDifferentSize= state.cart.some(p=>p._id===product._id && p.size === product.size)
    if(!productInCartButDifferentSize) return dispatch({type:'[cart] - Update products in cart',payload:[...state.cart,product]})

    const updatedProducts = state.cart.map(p=>{
      if(p._id !==product._id) return p
      if(p.size !==product.size) return p

      p.quantity += product.quantity

      return p
    })

    dispatch({type:'[cart] - Update products in cart',payload:updatedProducts})

  }

  return (
    <CartContext.Provider value={{
      ...state,
      addProductToCart
    }}>
      {children}
    </CartContext.Provider>
  )
}