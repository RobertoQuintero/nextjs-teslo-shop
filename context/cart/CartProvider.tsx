import React, { useEffect, useReducer } from 'react'
import { CartContext, cartReducer } from './'
import { ICartProduct } from '@/interfaces'

import Cookie from 'js-cookie'
import Cookies from 'js-cookie'

interface Props{
  children:JSX.Element|JSX.Element[]
}
export interface ShippingAddress {
  firstName : string;
  lastName : string;
  address : string;
  address2? : string;
  zip : string;
  city : string;
  country : string;
  phone : string;
}

export interface CartState{
  isLoaded:boolean;
  cart:ICartProduct[]
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
  shippingAddress?:ShippingAddress;
}

const Cart_INITIAL_STATE:CartState={
  isLoaded:false,
  cart:[],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
  shippingAddress:undefined
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
    if(Cookies.get('firstName')){
      const shippingAddress={
        firstName: Cookies.get('firstName') || '',
        lastName: Cookies.get('lastName') || '',
        address: Cookies.get('address') || '',
        address2: Cookies.get('address2') || '',
        zip: Cookies.get('zip') || '',
        city : Cookies.get('city') || '',
        country: Cookies.get('country') || '',
        phone: Cookies.get('phone') || '',
      }
  
      dispatch({
        type:'[cart] - LoadAddress from Cookies',
        payload:shippingAddress
      })
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

  const updateAddress = (address:ShippingAddress)=>{
    Cookies.set('firstName',address.firstName)
    Cookies.set('lastName',address.lastName)
    Cookies.set('address',address.address)
    Cookies.set('address2',address.address2||'')
    Cookies.set('zip',address.zip)
    Cookies.set('city',address.city)
    Cookies.set('country',address.country)
    Cookies.set('phone',address.phone)

    dispatch({
      type:'[cart] - update address',
      payload:address
    })
  }


  return (
    <CartContext.Provider value={{
      ...state,
      addProductToCart,
      updateCartQuantity,
      removeCartProduct,
      updateAddress
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