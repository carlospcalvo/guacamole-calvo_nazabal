import {useCartContext} from '../../context/cartContext'
import {ListGroup, Container, Row, Col, Table, Card, Media, Button} from 'react-bootstrap'
import {FaTrash, FaTimes} from 'react-icons/fa'
import './Cart.css'

const Cart = () => {
    const { cart, removeFromCart, clearCart, cartSize } = useCartContext()
    let total = 0

    const removeItem = (e) => {
        if(window.confirm("El item será eliminado del carrito.")){
           console.log(e)
            if(e.target.nodeName === "path"){
                let { id, size } = cart[e.target.nearestViewportElement.id]["item"]
                removeFromCart(id, size) 
            } else {
                let { id, size } = cart[e.target.id]["item"]
                removeFromCart(id, size)
            }
        }
    }

    const removeAll = () => {
        if(window.confirm("El carrito será vaciado.")){
            total = 0
            clearCart()
        }
    }

    return (
            cartSize > 0 ?
            <Container fluid className="CartListItemContainer">
                <Row>
                    <Col md="auto">
                        <Table hover style={{outlineStyle: "solid", outlineColor: "rgb(222, 226, 230)", outlineWidth: "1px"}}>
                            <thead>
                                <tr>
                                <th>Producto</th>
                                <th className="align-middle text-center">Cantidad</th>
                                <th className="align-middle text-center">Precio</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.map((x,i) => {
                                        total += x.item.price
                                        let requestImageFile = require.context('../../images/items', true, /.jpeg$/);
                                        let imgUrl = requestImageFile(`./${x.item.pictureUrl}.jpeg`).default
                                            return (
                                                <tr key={i}>
                                                    <td>
                                                        <Media as="li" style={{minWidth:"25rem"}}>
                                                            <img width={64} height={64} className="mr-3" src={imgUrl} alt={x.item.title}/>
                                                            <Media.Body>
                                                            <h5>{x.item.title}</h5>
                                                            <p>Talle: {x.item.size}</p>
                                                            </Media.Body>
                                                        </Media>
                                                    </td>
                                                    <td className="align-middle text-center">{x.quantity}</td>
                                                    <td className="align-middle text-center">${x.item.price}</td>
                                                    <td className="align-middle">
                                                        <Button variant="light" id={i} onClick={(e) => removeItem(e)}>
                                                            <FaTimes style={{color: 'red'}} id={i}/>
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )
                                }      
                                <tr>
                                    <td/>
                                    <td/>
                                    <td className="align-middle text-center">Vaciar carrito</td>
                                    <td className="align-middle text-center">
                                        <Button variant="light" onClick={() => removeAll()}>
                                            <FaTrash style={{color: 'red'}}/>
                                        </Button>
                                    </td>
                                </tr>                      
                            </tbody>
                        </Table>
                    </Col>
                    <Col md="auto">
                    <Card style={{ width: '18rem' }}>
                        <Card.Header style={{textAlign: "center", fontWeight: "500"}}>Resumen de compra</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item style={{textAlign: "right"}}>
                                <p>Productos: ${total}</p>
                                <span>Envío: $500</span>
                            </ListGroup.Item>
                            <ListGroup.Item style={{textAlign: "right", fontWeight: "500"}}>
                                Total: $ {total + 500} 
                            </ListGroup.Item>
                        </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </Container>
            : 
            <h3>Aún no hay items en el carrito!</h3>  
    )
}

export default Cart 
