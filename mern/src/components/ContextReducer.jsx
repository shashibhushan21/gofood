import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, { id: action.id, name: action.name, price: action.price, qty: action.qty, size: action.size, img: action.img }];
        case 'REMOVE':
            return state.filter((_, index) => index !== action.index);

        case 'UPDATE':
            return state.map((item) => {
                if (item.id === action.id && item.size === action.size) {
                    return {
                        ...item,
                        qty: item.qty + parseInt(action.qty, 20),
                        // qty: item.qty + action.qty, 
                        price: item.price + parseInt(action.price, 10)
                    };
                }
                return item;
            });

        case 'CLEAR':
            let empArray = [];
            return empArray;
        default:
            console.log("Error in reducer");
            return state;
    }
}

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <div>
            <CartDispatchContext.Provider value={dispatch}>
                <CartStateContext.Provider value={state}>
                    {children}
                </CartStateContext.Provider>
            </CartDispatchContext.Provider>
        </div>
    )
}

export default CartProvider
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
