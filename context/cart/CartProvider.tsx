import React, { useEffect, useReducer } from 'react'
import { CartContext, cartReducer } from './'
import { ICartProduct } from '@/interfaces'

import Cookie from 'js-cookie'

interface Props{
  children:JSX.Element|JSX.Element[]
}

export interface CartState{
  cart:ICartProduct[]
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

const Cart_INITIAL_STATE:CartState={
  cart:[],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
}

export const CartProvider = ({children}:Props) => {
  const [state, dispatch] = useReducer(cartReducer, Cart_INITIAL_STATE)

  useEffect(() => {
   try {
    const cookieProducts = Cookie.get('cart') ?JSON.parse(Cookie.get('cart')!) :[]
    dispatch({type:'[cart] - LoadCard from cookies | storage',payload:cookieProducts})
  } catch (error) {
     dispatch({type:'[cart] - LoadCard from cookies | storage',payload:[]})
   }
  }, [])

  useEffect(() => {
    if (state.cart.length > 0) Cookie.set('cart',JSON.stringify(state.cart))
  }, [state.cart])

  useEffect(() => {
    const numberOfItems=state.cart.reduce((prev,current)=> current.quantity+prev,0)
    const subTotal = state.cart.reduce((prev,current)=>(current.price*current.quantity)+prev,0)
    const taxRate= Number(process.env.NEXT_PUBLIC_TAX_RATE) || 0

    const orderSummary={
      numberOfItems,
      subTotal,
      tax:subTotal * taxRate,
      total:subTotal*(taxRate+1)
    }

    dispatch({type:'[cart] - Update cart summary',payload:orderSummary})
  }, [state.cart])

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
  

  const updateCartQuantity=(product:ICartProduct)=>{
    dispatch({
      type:'[cart] - Change product quantity',payload:product
    })
  }

  const removeCartProduct=(product:ICartProduct)=>{

    dispatch({
      type:'[cart] - Remove product in cart',
      payload:product
    })

  }


  return (
    <CartContext.Provider value={{
      ...state,
      addProductToCart,
      updateCartQuantity,
      removeCartProduct
    }}>
      {children}
    </CartContext.Provider>
  )
}


// const addProductToCart2=(product:ICartProduct)=>{
  // dispatch({
  //   type:'[cart] - Add Product',
  //   payload:product
  // })

//   const productInCart= state.cart.some(p=>p._id===product._id)
//   if(!productInCart) return dispatch({type:'[cart] - Update products in cart',payload:[...state.cart,product]})

//   const productInCartButDifferentSize= state.cart.some(p=>p._id===product._id && p.size === product.size)
//   if(!productInCartButDifferentSize) return dispatch({type:'[cart] - Update products in cart',payload:[...state.cart,product]})

//   const updatedProducts = state.cart.map(p=>{
//     if(p._id !==product._id) return p
//     if(p.size !==product.size) return p

//     p.quantity += product.quantity

//     return p
//   })

//   dispatch({type:'[cart] - Update products in cart',payload:updatedProducts})

// }