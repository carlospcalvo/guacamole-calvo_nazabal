import React from 'react';
import {Link} from 'react-router-dom'
import { Button, Badge } from 'react-bootstrap';
import { FaShoppingCart } from "react-icons/fa";
import {useCartContext} from '../../context/cartContext'

const CartWidget = (props) => {
    //context
    let {cartSize} = useCartContext()

    //styles
    let {backgroundColor, borderColor} = props
    let buttonStyle = {
        backgroundColor: backgroundColor, 
        borderColor: borderColor, 
        maxWidth: "3rem", 
        padding: "0", 
        margin: "10px",
        marginLeft: "5px"
    }
    return (
        <Button as={Link} to="/cart" variant='danger' style={buttonStyle}>
            <Badge variant="warning" id="CartBadge">{cartSize}</Badge>
            <FaShoppingCart size={28}/>
        </Button>
    )
}

export default CartWidget