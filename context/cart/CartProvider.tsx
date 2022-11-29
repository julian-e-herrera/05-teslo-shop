import { FC, useEffect, useReducer } from 'react';
import { ICartProduct, IOrder, ShippingAddress } from '../../interfaces';
import { CartContext, cartReducer } from './';
import Cookie from 'js-cookie'
import Cookies from 'js-cookie';
import { tesloApi } from '../../api';
import axios from 'axios';

type Props = {
    children?: JSX.Element | JSX.Element[];
}
export interface CartState {
    isLoaded: boolean,
    cart: ICartProduct[],
    numberOfItem: number;
    subTotal: number;
    tax: number;
    total: number;

    shippingAddress?: ShippingAddress,

}


const Cart_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [],
    numberOfItem: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined,
}

export const CartProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, Cart_INITIAL_STATE)


    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
            dispatch({ type: '[Cart] - LoadCart from cooklies | storage', payload: cookieProducts })
        } catch (error) {
            dispatch({ type: '[Cart] - LoadCart from cooklies | storage', payload: [] })
        }

    }, [])

    useEffect(() => {

        if (Cookies.get('firstName')) {
            const cookieAddress = {
                firstName: Cookies.get('firstName') || '',
                lastName: Cookies.get('lastName') || '',
                address: Cookies.get('address') || '',
                address2: Cookies.get('address2') || '',
                zip: Cookies.get('zip') || '',
                city: Cookies.get('city') || '',
                country: Cookies.get('country') || '',
                phone: Cookies.get('phone') || '',

            }
            dispatch({ type: '[Cart] - Load address from cookies', payload: cookieAddress })
        }
    }, [])


    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart])


    useEffect(() => {
        const numberOfItem = state.cart.reduce((prev, current) => current.quantity + prev, 0)
        const subTotal = state.cart.reduce((prev, current) => (current.price * current.quantity) + prev, 0)
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0)
        const orderSummary = {
            numberOfItem,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * (taxRate + 1)
        }
        dispatch({ type: '[Cart] - Update order summary', payload: orderSummary })
    }, [state.cart])


    const addProductToCart = (product: ICartProduct) => {
        const productInCart = state.cart.some(p => p._id === product._id)
        if (!productInCart) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })

        const productInCartButDiffSize = state.cart.some(p => p._id === product._id && p.size === product.size)
        if (!productInCartButDiffSize) return dispatch({ type: '[Cart] - Update products in cart', payload: [...state.cart, product] })

        const updateProducts = state.cart.map(p => {
            if (p._id !== product._id) return p
            if (p.size !== product.size) return p
            p.quantity += product.quantity
            return p
        })
        dispatch({ type: '[Cart] - Update products in cart', payload: updateProducts })

    }

    const updateCartQuantity = (product: ICartProduct) => {

        dispatch({ type: '[Cart] - Change products quantity', payload: product })
    }

    const removeCartProduct = (product: ICartProduct) => {
        dispatch({ type: '[Cart] - Remove product in cart', payload: product })
    }

    const updateAddress = (address: ShippingAddress) => {

        Cookies.set('firstName', address.firstName)
        Cookies.set('lastName', address.lastName)
        Cookies.set('address', address.address)
        Cookies.set('address2', address.address2 || '')
        Cookies.set('zip', address.zip)
        Cookies.set('city', address.city)
        Cookies.set('country', address.country)
        Cookies.set('phone', address.phone)

        dispatch({ type: '[Cart] - Update Address', payload: address })
    }


    const createOrder = async (): Promise<{ hasError: boolean, message: string }> => {
        if (!state.shippingAddress) {
            throw new Error('No hay direccion de entrega')
        }

        const body: IOrder = {
            orderItems: state.cart.map(p => ({
                ...p,
                size: p.size!
            })),
            shippingAddress: state.shippingAddress,
            numberOfItems: state.numberOfItem,
            subTotal: state.subTotal,
            tax: state.tax,
            total: state.total,
            isPaid: false
        }
        try {


            const { data } = await tesloApi.post('/orders', body)
            dispatch({ type: '[Cart] - Order complete' })

            return {
                hasError: false,
                message: data._id!
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
                message: "Error no controlado,contacte support team"
            }
        }
    }

    return (
        < CartContext.Provider value={{
            ...state,
            addProductToCart,
            updateCartQuantity,
            removeCartProduct,
            updateAddress,

            createOrder
        }}>
            {children}
        </ CartContext.Provider>
    )
};