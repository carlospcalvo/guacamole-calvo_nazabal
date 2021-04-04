import React from 'react';
import {Link} from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { FaShoppingCart } from "react-icons/fa";

const CartWidget = (props) => {
    let {backgroundColor, borderColor} = props

    return (
        <Button as={Link} to="/cart" variant='danger' style={{backgroundColor: backgroundColor, borderColor: borderColor}}>
            <FaShoppingCart size={28}/>
        </Button>
    )
}

export default CartWidget