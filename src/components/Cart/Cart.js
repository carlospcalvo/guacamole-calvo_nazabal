import {ListGroup, Container, Row, Col, Table, Card, Media, Button} from 'react-bootstrap'
import {FaTrash, FaTimes} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import {useCartContext} from '../../context/cartContext'
import { useAuth } from '../../context/AuthContext'
import CurrentUser from '../CurrentUser/CurrentUser'
import emptyCart from '../../images/empty-cart.png'
import './Cart.css'


const Cart = () => {
    const { cart, removeFromCart, clearCart, cartSize } = useCartContext()
    let total = 0

    //Auth
    const {currentUser} = useAuth()

    //Helpers
    const removeItem = (item) => {
        if(window.confirm("El item será eliminado del carrito.")){
            removeFromCart(item.id, item.size)
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
            <section className="align-items-center justify-content-center">
                {currentUser && <CurrentUser/>}
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
                                                            <Media as="li" style={{minWidth:"10rem"}}>
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
                                                            <Button variant="light" id={i} onClick={() => removeItem(x.item)}>
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
                        <Card style={{ minWidth: '18rem' }}>
                            <Card.Header style={{textAlign: "center", fontWeight: "500"}}>Resumen de compra</Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <p>Productos: <span style={{float: "right"}}> $ {total}</span></p>
                                    <span>Envío: <span style={{float: "right"}}> $ 500</span></span>
                                </ListGroup.Item>
                                <ListGroup.Item style={{fontWeight: "500"}}>
                                    Total: <span style={{float: "right"}}> $ {total + 500} </span> 
                                </ListGroup.Item>
                            </ListGroup>
                            </Card>
                            <Button as={Link} to={currentUser ? "/checkout" : {pathname: "/registrate", state: { fromCart: true }}} variant="warning" style={{marginTop: "1rem"}} block>Iniciar la compra</Button>
                        </Col>
                    </Row>
                </Container>
            </section>
            
            : 
            <div className="EmptyCartDiv">
                <img src={emptyCart} alt="Your cart is empty."/>
                <h3 style={{margin: "3rem"}}>Aún no hay items en el carrito!</h3>  
                <Button as={Link} to="/" variant="outline-danger" id="EmptyCartBtn" style={{maxWidth: "10rem", display:"flex", alignSelf: "center"}}>Ir al catálogo</Button>
            </div>
            
    )
}

export default Cart 
