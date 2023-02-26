import * as actionTypes from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: []}, action) => {
    switch(action.type) {
        case actionTypes.ADD_TO_CART:
            const item = action.payload;
            const existItem = state.cartItems.find(product => product._id.includes(item._id));
            if(existItem){
                return {            
                    ...state, cartItems: state.cartItems.map(x => x._id.includes(existItem._id) ?  {...x,quantity:x.quantity+1} : x)
                }
            } else {
                return  { ...state, cartItems: [...state.cartItems, item]}
            }
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state, cartItems: state.cartItems.filter(product => product._id !== action.payload)
            }
        case actionTypes.INCREASE_QUANTITY:{
            const item=action.payload;
            const existingItem = state.cartItems.find(product => product._id.includes(item._id));
            if(existingItem){
                return {            
                    ...state, cartItems: state.cartItems.map(x => x._id.includes(existingItem._id) ?  {...x,quantity:x.quantity+1} : x)
                }
            } else {
                return  { ...state, cartItems: [...state.cartItems, item]}
            }
        };
        case actionTypes.DECREASE_QUANTITY:{
                const item=action.payload;
                const existingItem = state.cartItems.find(product => product._id.includes(item._id));
                if(existingItem){
                    return {            
                        ...state, cartItems: state.cartItems.map(x => x._id.includes(existingItem._id) ?  {...x,quantity:x.quantity-1} : x)
                    }
                } else {
                    return  { ...state, cartItems: [...state.cartItems, item]}
                }
        }
        default:
            return state;
    }
}