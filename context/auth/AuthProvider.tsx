import React, { useEffect, useReducer } from 'react'
import { AuthContext, authReducer } from './'
import { IUser } from '@/interfaces'
import { tesloApi } from '@/api'
import Cookies from 'js-cookie'
import axios from 'axios'
import { config } from 'process'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

interface Props{
  children:JSX.Element|JSX.Element[]
}

export interface AuthState{
  isLoggedIn:boolean,
  user?:IUser
}

const Auth_INITIAL_STATE:AuthState={
  isLoggedIn:false,
  user:undefined

}

export const AuthProvider = ({children}:Props) => {
  const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE)
  const {data,status}= useSession()
  const router= useRouter()

  useEffect(() => {
    if(status==='authenticated'){
      console.log({user:data.user})
      // dispatch({
      //   type:'[Auth] - Login',
      //   payload:data?.user as IUser
      // })
    }
  }, [status,data])

  // useEffect(() => {
  //   checkToken()
  // }, [])

  // const checkToken=async()=>{
  //   if(!Cookies.get('token'))return
  //   // const token = Cookies.get('token')
  //   try {
  //     const {data}= await tesloApi.get('/user/validate-token')
  //     const {token,user}= data;
  //     Cookies.set('token',token);
  //     dispatch({type:'[Auth] - Login',payload:user})
  //   } catch (error) {
  //     Cookies.remove('token')      
  //   }
  // }

  const loginUser= async(email:string,password:string):Promise<boolean>=>{
    try {
      const {data}= await tesloApi.post('/user/login',{email,password})
      const {token,user}= data;
      console.log(user)
      Cookies.set('token',token);
      dispatch({type:'[Auth] - Login',payload:user})
      return true
    } catch (error) {
      return false
    }
  }

  const registerUser= async(name:string,email:string,password:string):Promise<{hasError:boolean, message?:string}>=>{
    try {
      const {data}= await tesloApi.post('/user/register',{name,email,password})
      const {token,user}= data;
      Cookies.set('token',token);
      dispatch({type:'[Auth] - Login',payload:user})
      return {
        hasError:false
      }
    } catch (error) {
      if(axios.isAxiosError(error)){
        return {
          hasError:true,
          message:error.response?.data.message
        }
      }

      return {
        hasError:true,
        message:'No se pudo crear el usuario - intente de nuevo'
      }
    }
  }

  const logout=()=>{
    Cookies.remove('token')
    Cookies.remove('cart')
    Cookies.remove('firstName')
    Cookies.remove('lastName')
    Cookies.remove('address')
    Cookies.remove('address2')
    Cookies.remove('zip')
    Cookies.remove('city')
    Cookies.remove('country')
    Cookies.remove('phone')
    router.reload()
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      loginUser,
      registerUser,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}