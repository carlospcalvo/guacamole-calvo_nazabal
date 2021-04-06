import React, {useContext, useState} from 'react'

export const CartContext = React.createContext([])

export const CartContextProvider = ({children}) => {
    const [cart, setCart] = useState([])

    const getItem = (id, size) => cart.find(({item}) => item.id === id && item.size === size )

    const removeItem = (id, size) => setCart(cart.filter(({item}) => item.id !== id || item.size !== size ))

    const clear = () => setCart([])

    const isInCart = (id, size) => id === undefined ? undefined : getItem(id, size) !== undefined

    const addItem = (obj) => {    
        
        if(isInCart(obj.item.id, obj.item.size)){
            console.log("[CartContext] Item already exists in Cart")
            alert("El item ya fue agregado al carrito anteriormente")
        } else { 
            setCart([...cart, obj])
        }
    }
    
    const value = { cart, addToCart: addItem, isInCart, removeFromCart: removeItem, clearCart: clear, cartSize: cart.length }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    const context = useContext(CartContext)
    
    if(!context) 
        throw new Error('useCartContext must be used within CartContextProvider')
    return context
}

