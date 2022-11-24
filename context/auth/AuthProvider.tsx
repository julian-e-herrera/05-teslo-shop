import { FC, useEffect, useReducer } from 'react';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';
import tesloApi from '../../api/tesloApi';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSession, signOut } from "next-auth/react"

type Props = {
    children?: JSX.Element | JSX.Element[];
}
export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser,
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}

export const AuthProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)
    const router = useRouter()
    const { data, status } = useSession()


    useEffect(() => {
        if (status === 'authenticated') {
            console.log(data?.user)
            dispatch({ type: '[Auth] - LogIn', payload: data?.user as IUser })
        }
    }, [status, data])
    // useEffect(() => {
    //     checkToken()
    // }, [])


    // const checkToken = async () => {
    //     if (Cookies.get('token')) return
    //     try {
    //         const { data } = await tesloApi.get('/user/validate-token')
    //         const { token, user } = data
    //         Cookies.set('token', token)
    //         dispatch({ type: '[Auth] - LogIn', payload: user })

    //     } catch (error) {
    //         Cookies.remove('token')
    //     }
    // }


    const loginUser = async (email: string, password: string): Promise<boolean> => {

        try {
            const { data } = await tesloApi.post('/user/login', { email, password })
            const { token, user } = data
            Cookies.set('token', token)
            dispatch({ type: '[Auth] - LogIn', payload: user })
            return true
        } catch (error) {
            return false
        }
    }

    const logOut = () => {

        Cookies.remove('cart')
        Cookies.remove('firstName')
        Cookies.remove('lastName')
        Cookies.remove('address')
        Cookies.remove('address2')
        Cookies.remove('zip')
        Cookies.remove('city')
        Cookies.remove('country')
        Cookies.remove('phone')
        signOut()

        // if (!Cookies.get('token')) return
        // Cookies.remove('token')
        // router.reload()
        // dispatch({ type: '[Auth] - LogOut' })
    }


    const registerUser = async (name: string, email: string, password: string): Promise<{ hasError: boolean, message?: string }> => {

        try {
            const { data } = await tesloApi.post('/user/register', { name, email, password })
            const { token, user } = data
            Cookies.set('token', token)
            dispatch({ type: '[Auth] - LogIn', payload: user })
            return {
                hasError: false
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hasError: true,
                message: "No se puso crear el usuario - intente de nuevo"
            }
        }
    }





    return (
        < AuthContext.Provider value={{
            ...state,
            loginUser, registerUser, logOut
        }}>
            {children}
        </ AuthContext.Provider>
    )
};