import {useState, useEffect} from 'react'
import {Accordion, Card, Button, ListGroup} from 'react-bootstrap';
import {getFirestore} from '../../config/firebase'
import {useAuth} from '../../context/AuthContext'
import './ProfileOrders.css'

const ProfileOrders = () => {
    //Auth
    const {currentUser} = useAuth()

    //State
    const [orders, setOrders] = useState([]);

    //Effects
    useEffect(() => {
        if(currentUser){
            const db = getFirestore()
            const orderCollection = db.collection('orders')
    
            setOrders([])
            orderCollection.where("buyer.uid", "==", currentUser.uid).get()
            .then((querySnapshot) => {
                if(querySnapshot.size === 0){
                    console.log('[ItemList] No results')
                } 
                setOrders(querySnapshot.docs.map(doc => doc.data()))
            })
            .catch((err) => {
            console.log("[ItemList] Error searching items ", err)
            })
        } 
    }, [currentUser]);

    //Helpers
    const formatDate = (firestoreDate) => {
        let timestamp = firestoreDate.seconds * 1000 + firestoreDate.nanoseconds / 1000000;
        let auxDate = new Date(timestamp);
        let date = auxDate.getDate();
        let month = auxDate.getMonth() + 1;
        let year = auxDate.getFullYear();
        let fullDate = `${date}/${month}/${year}`;
        return fullDate;
    } 

    return (
        <Accordion style={{flexDirection: "column"}}>
            <Card className="w-auto p-3" style={{minWidth: "100%"}}>
                {
                    orders.map((order, i) => {
                        return (
                            <div key={i}>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey={i.toString()} style={{minWidth: "100%", color: "black"}}>
                                    <span style={{float: "left"}}>{formatDate(order.createOn)} - Estado: {order.status}</span> <span style={{float: "right"}}> $ {order.total} </span> 
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey={i.toString()}>
                                    <Card.Body>
                                        <ListGroup variant="flush">
                                            {
                                                order.products.map((orderDetail, index) => 
                                                    <ListGroup.Item key={index}>
                                                        {orderDetail.quantity}x {orderDetail.item.title} <span style={{float: "right"}}>$ {orderDetail.item.price}</span>
                                                    </ListGroup.Item>
                                                )
                                            }
                                            <ListGroup.Item >
                                                Envío <span style={{float: "right"}}>$ 500</span>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card.Body>
                                </Accordion.Collapse>   
                            </div>
                        )
                    })
                }         
            </Card>   
        </Accordion>
    );
}

export default ProfileOrders;
