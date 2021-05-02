import {useState, useEffect} from 'react'
import {Card, Form, Col, Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {useCartContext} from '../../context/cartContext'
import {getFirestore} from '../../config/firebase'
import firebase from 'firebase/app' 
import { useAuth } from '../../context/AuthContext'
import CurrentUser from '../CurrentUser/CurrentUser'
import provincias from '../../config/provincias.json'
import './Checkout.css'

const Checkout = () => {   
    //Cart Context
    const { cart, clearCart } = useCartContext()

    //Auth
    const {currentUser} = useAuth()
    
    //State 
    const [validated, setValidated] = useState(false);
    const [order, setOrder] = useState(undefined);
    const [userData, setUserAddress] = useState({})

    //Effect
    useEffect(() => {
        const db = getFirestore()
        const userCollection = db.collection('users')

        userCollection.where("uid", "==", currentUser.uid).get()
        .then((querySnapshot) => {
            if(querySnapshot.size === 0){
                console.log('[Checkout] No data found for this user')
            } 
            setUserAddress(querySnapshot.docs.map(doc => doc.data())[0])
        })
        .catch((err) => {
            console.log("[Checkout] Error searching user data.", err)
        })
       
    }, [currentUser]);

    //Helpers
    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let form = e.target
        setValidated(true);

        if(form.checkValidity()){

            let buyer = {
                name: document.getElementById("formName").value,
                surname: document.getElementById("formSurname").value,
                phone: document.getElementById("formPhone").value,
                uid: currentUser.uid,
                address: document.getElementById("formAddress").value,
                address_2: document.getElementById("formAddress2").value,
                city: document.getElementById("formCity").value,
                state: document.getElementById("formState").value,
                zip: document.getElementById("formZip").value
            }

            const newOrder = {
                buyer: buyer,
                products: [...cart],
                //el acumulador arranca en 500 simluando el precio de envío
                total: cart.reduce((runningTotal, order) => runningTotal + order.item.price * order.quantity ,500),
                status: 'Generada',
                createOn: firebase.firestore.Timestamp.fromDate(new Date())
            }
            const db = getFirestore()
            const orders = db.collection('orders')
            const itemCollection = db.collection('items')
            const users = db.collection('users')
            
            orders.add(newOrder)
            .then((resp) => {
                setOrder({
                    id: resp.id, 
                    details: newOrder
                }) 

                //Stock update
                cart.forEach(element => {
                    let stockUpdate = {}
                    stockUpdate[`stock_per_size.${element.item.size}`] = firebase.firestore.FieldValue.increment( element.quantity * -1)

                    itemCollection.where("id", "==", element.item.id).get()
                    .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => itemCollection.doc(doc.id).update(stockUpdate))
                    })
                    .catch((err) => {
                    console.log("[Checkout] Error updating stock ", err)
                    })
                })

                //Address update
                users.where("uid", "==", buyer.uid).get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => users.doc(doc.id).update(buyer))
                })
                .catch((err) => {
                    console.log("[Checkout] Error updating user.", err)
                })

                clearCart()
            })
            .catch((err) => setOrder({
                id: undefined,
                details: err
                }
            ))
        }        
    }  

    const BillingInfoForm = () => {
        return (
            <Card className="CheckoutFormContainer">
                <h3>Datos de facturación</h3>
                <Form noValidate validated={validated} className={validated ? "was-validated" : "not-validated" } onSubmit={(e) => handleSubmit(e)}>
                    
                    <Form.Row>
                        <Form.Group as={Col} controlId="formName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control required type="text" placeholder="Nombre" hasValidation defaultValue={userData?.name || ''} />
                            <Form.Control.Feedback type="invalid">
                                Indique su nombre.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formSurname">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control required type="text" placeholder="Apellido" hasValidation defaultValue={userData?.surname || ''} />
                            <Form.Control.Feedback type="invalid">
                                Indique su apellido.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    
                    <Form.Row>
                        <Form.Group as={Col} controlId="formPhone">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control required type="tel" pattern="[0-9+-]{8,14}" maxLength={14} placeholder="Teléfono" defaultValue={userData?.phone || ''} />
                            <Form.Control.Feedback type="invalid">
                                Ingrese un número entre 4 y 14 dígitos.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formZip">
                        <Form.Label>Código Postal</Form.Label>
                        <Form.Control required type="tel" pattern="[0-9]{4}" maxLength={4} placeholder="1234" defaultValue={userData?.zip || ''} />
                        <Form.Control.Feedback type="invalid">
                            Indique su código postal.
                        </Form.Control.Feedback>   
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formAddress">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control required placeholder="Av. Siempreviva 742" defaultValue={userData?.address || ''} />
                        <Form.Control.Feedback type="invalid">
                            Indique su dirección.
                        </Form.Control.Feedback>   
                    </Form.Group>

                    <Form.Group controlId="formAddress2">
                        <Form.Label>Dirección 2</Form.Label>
                        <Form.Control placeholder="Piso, departamento, lote" defaultValue={userData?.address_2 || ''} />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formCity">
                        <Form.Label>Ciudad/Localidad</Form.Label>
                        <Form.Control required placeholder="Ciudad" defaultValue={userData?.city || ''} />
                        <Form.Control.Feedback type="invalid">
                            Indique ciudad o localidad.
                        </Form.Control.Feedback>   
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Provincia</Form.Label>
                        <Form.Control required as="select" className="form-select" id="formState"  defaultValue={userData?.state || ''} >
                            <option disabled value="">Seleccionar...</option>
                            {
                                provincias.data.map((provincia, i) => <option key={i}>{provincia.name}</option>)
                            }
                        </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Seleccione una provincia.
                            </Form.Control.Feedback>    
                        </Form.Group>
                    </Form.Row>

                    <Button variant="warning" type="submit" block>
                        FINALIZAR MI COMPRA
                    </Button>
                </Form>
            </Card>
        )
    }

    return (
        <section className="Checkout">
            {currentUser && <CurrentUser/>}
            { order === undefined ? <BillingInfoForm/> : <Redirect to={`/order/${order.id}`}/> }
        </section>
    ) 
}

export default Checkout