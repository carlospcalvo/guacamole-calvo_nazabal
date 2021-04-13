import {useState, useEffect} from 'react'
import {Card, Form, Col, Button, ListGroup} from 'react-bootstrap'
import {Link, useParams} from 'react-router-dom'
import {getFirestore} from '../../config/firebase'
import './OrderDetail.css'

const OrderDetail = () => {
    const { id } = useParams()
    //State
    const [order, setOrder] = useState(undefined);    
    //Effects
    useEffect(() => {
        if(id){
            const db = getFirestore()
            const orderCollection = db.collection('orders')
    
            orderCollection.doc(id).get()
            .then((docRef) => {
                setOrder(docRef.data())
            })
            .catch((err) => {
            console.log("[OrderDetail] Error searching items ", err)
            })
        } 
    }, [id]);


    console.log(order)

    return (
        <div className="Checkout">
            {
                order
                ? 
                <>
                    <h3 style={{textAlign: "center"}}>Su pedido ha sido realizado con éxito</h3>
                    <Card style={{marginTop: "1rem", fontSize: "1.5rem"}}>
                        <Card.Header style={{textAlign: "center", fontWeight: "500"}}>ID de su Pedido: {id}</Card.Header>
                        <ListGroup variant="flush">
                            {
                                order.products.map((orderDetail,i) => 
                                    <ListGroup.Item key={i}>
                                        {orderDetail.quantity}x {orderDetail.item.title} <span style={{float: "right"}}>$ {orderDetail.item.price}</span>
                                    </ListGroup.Item>
                                )
                            }
                            <ListGroup.Item >
                                Envío <span style={{float: "right"}}>$ 500</span>
                            </ListGroup.Item>
                        </ListGroup>
                        <Card.Footer style={{textAlign: "right", fontWeight: "500"}}>
                            Total: $ {order.total} 
                        </Card.Footer>
                    </Card>
                    <div id="ReturnBtnContainer" style={{display: "flex", justifyContent: "center", marginTop: "1rem"}}>
                        <Button as={Link} to="/" variant="outline-danger" id="ReturnBtn" style={{maxWidth: "10rem", display:"flex", alignSelf: "center"}}>Volver al inicio</Button>
                    </div>
                    
                </> 
                :
                <>
                    <h3>Hubo un error al generar su pedido, intente nuevamente.</h3>
                </>
            }
            
        </div>
        
    )

}

export default OrderDetail