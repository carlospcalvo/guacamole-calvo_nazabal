import React, {useContext, useState} from 'react'

export const CartContext = React.createContext([])

export const CartContextProvider = ({children}) => {
    const local = window.localStorage

    const [cart, setCart] = useState(JSON.parse(local.getItem('cart')) || [])

    const getItem = (id, size) => cart.find(({item}) => item.id === id && item.size === size )

    const removeFromCart = (id, size) => {
        setCart(cart.filter(({item}) => item.id !== id || item.size !== size)) 
        local.setItem('cart', JSON.stringify(cart.filter(({item}) => item.id !== id || item.size !== size)))
    }

    const clearCart = () => setCart([]) && local.clear()

    const isInCart = (id, size) => id === undefined ? undefined : getItem(id, size) !== undefined

    const addItem = (obj) => {    
        
        if(isInCart(obj.item.id, obj.item.size)){
            console.log("[CartContext] Item already exists in Cart")
            alert("El item ya fue agregado al carrito anteriormente")
        } else { 
            setCart([...cart, obj])
            local.setItem('cart', JSON.stringify([...cart, obj]))
        }
    }

    const cartSize = cart.reduce((runningTotal, order) => runningTotal + order.quantity , 0)
    
    const cartSubTotal = cart.reduce((runningTotal, order) => runningTotal + order.item.price * order.quantity , 0)

    const value = { cart, addToCart: addItem, isInCart, removeFromCart, clearCart, cartSubTotal, cartSize }

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

