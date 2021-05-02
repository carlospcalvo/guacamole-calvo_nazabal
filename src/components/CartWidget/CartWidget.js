import React from 'react';
import {Link} from 'react-router-dom'
import { Button, Badge } from 'react-bootstrap';
import { FaShoppingCart } from "react-icons/fa";
import {useCartContext} from '../../context/cartContext'

const CartWidget = (props) => {
    //Cart Context
    let {cartSize} = useCartContext()

    //styles
    let {backgroundColor, borderColor} = props
    let buttonStyle = {
        backgroundColor: backgroundColor, 
        borderColor: borderColor, 
        maxWidth: "3rem", 
        padding: "0", 
        marginTop: "10px",
        marginRight: "10px",
        marginLeft: "5px"
    }
    
    return (
        <Button as={Link} to="/cart" variant='danger' style={buttonStyle}>
            <FaShoppingCart size={30} style={{margin:"auto"}}/>
            {cartSize > 0 && <Badge variant="warning" id="CartBadge">{cartSize}</Badge>}
            
        </Button>
    )
}

export default CartWidget