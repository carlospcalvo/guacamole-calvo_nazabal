import React, {useContext, useState} from 'react'

export const CartContext = React.createContext([])

export const CartContextProvider = ({children}) => {
    const [name, setName] = useState("test")

    const value = { name, setName }

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

