import { ICartProduct } from '../../interfaces';
import { CartState } from './';
import { ShippingAddress } from './CartProvider';

type CartActionType =
    | { type: '[Cart] - LoadCart from cooklies | storage',payload:ICartProduct[] }
    | { type: '[Cart] - Update products in cart', payload: ICartProduct[] }
    | { type: '[Cart] - Change products quantity', payload: ICartProduct }
    | { type: '[Cart] - Remove product in cart', payload: ICartProduct }
    | { type: '[Cart] - Load address from cookies', payload: ShippingAddress }
    | { type: '[Cart] - Update Address', payload: ShippingAddress }
    | {
        type: '[Cart] - Update order summary',
        payload: {
            numberOfItem: number;
            subTotal: number;
            tax: number;
            total: number;
         }
     }
 

export const cartReducer = (state: CartState, action: CartActionType): CartState => {

    switch (action.type) {

        case '[Cart] - LoadCart from cooklies | storage':
            return {
                ...state,
                isLoaded:true,
                cart:[...action.payload]
            }
        case '[Cart] - Update products in cart':
            return {
                ...state,
                cart:[...action.payload]
            }
        case '[Cart] - Change products quantity':
            return {
                ...state,
                cart: state.cart.map(product => {
                    if (product._id !== action.payload._id) return product
                    if (product.size !== action.payload.size) return product
                    return action.payload
                }
                )
            }
        case '[Cart] - Remove product in cart':
            return {
                ...state,
                cart: state.cart.filter( product => !(product._id === action.payload._id && product.size === action.payload.size ))
                
            }
        case '[Cart] - Update order summary':
            return {
                ...state,
                ...action.payload
            }
        case '[Cart] - Load address from cookies':
        case '[Cart] - Update Address':   
            return {
                ...state,
                shippingAddress: action.payload
            }
     

        default:
            return state
    }


}