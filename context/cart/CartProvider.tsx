import { FC, useEffect, useReducer } from 'react';
import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer } from './';
import Cookie from 'js-cookie'

type Props = {
    children?: JSX.Element | JSX.Element[];
}
export interface CartState {
    cart: ICartProduct[],
    numberOfItem: number;
    subTotal: number;
    tax: number;
    total: number;

}

const Cart_INITIAL_STATE: CartState = {
    cart: Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [],
    numberOfItem: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
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

    return (
        < CartContext.Provider value={{
            ...state,
            addProductToCart,
            updateCartQuantity,
            removeCartProduct
        }}>
            {children}
        </ CartContext.Provider>
    )
};