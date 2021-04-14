import {useState} from 'react'
import {Card, Form, Col, Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {useCartContext} from '../../context/cartContext'
import {getFirestore} from '../../config/firebase'
import firebase from 'firebase/app' 
import provincias from '../../config/provincias.json'
import './Checkout.css'

const Checkout = () => {   
    //context
    const { cart, clearCart } = useCartContext()

    //State Hooks
    const [validated, setValidated] = useState(false);
    const [order, setOrder] = useState(undefined);

    //AMPLIAR EL README, AGREGAR INSTALACION DE NODE Y DEL REPO

    const handleSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()
        let form = e.target
        setValidated(true);

        if(form.checkValidity()){
            const newOrder = {
                buyer: {
                    name: document.getElementById("formName").value + ' ' + document.getElementById("formSurname").value,
                    email: document.getElementById("formEmail").value,
                    phone: document.getElementById("formPhone").value,
                    address: document.getElementById("formAddress").value,
                    address_2: document.getElementById("formAddress2").value,
                    city: document.getElementById("formCity").value,
                    state: document.getElementById("formState").value,
                    zip: document.getElementById("formZip").value
                },
                products: [...cart],
                //el acumulador arranca en 500 simluando el precio de envío
                total: cart.reduce((runningTotal, order) => runningTotal + order.item.price * order.quantity ,500),
                createOn: firebase.firestore.Timestamp.fromDate(new Date())
            }
            const db = getFirestore()
            const orders = db.collection("orders")
            const itemCollection = db.collection('items')
            
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
                    .then(console.log("[Checkout] Stock updated succesfully"))
                    .catch((err) => {
                    console.log("[Checkout] Error updating stock ", err)
                    })
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
                        <Form.Control required type="text" placeholder="Nombre" hasValidation/>
                            <Form.Control.Feedback type="invalid">
                                Indique su nombre.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formSurname">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control required type="text" placeholder="Apellido" hasValidation/>
                            <Form.Control.Feedback type="invalid">
                                Indique su apellido.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    
                    <Form.Row>
                        <Form.Group as={Col} controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="email" placeholder="usuario@gmail.com" hasValidation/>
                            <Form.Control.Feedback type="invalid">
                                Email no válido.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formPhone">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control required type="tel" pattern="[0-9+-]{8,14}" maxLength={14} placeholder="Teléfono"/>
                            <Form.Control.Feedback type="invalid">
                                Ingrese un número entre 4 y 14 dígitos.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formAddress">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control required placeholder="Av. Siempreviva 742" />
                        <Form.Control.Feedback type="invalid">
                            Indique su dirección.
                        </Form.Control.Feedback>   
                    </Form.Group>

                    <Form.Group controlId="formAddress2">
                        <Form.Label>Dirección 2</Form.Label>
                        <Form.Control placeholder="Piso, departamento, lote" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formCity">
                        <Form.Label>Ciudad/Localidad</Form.Label>
                        <Form.Control required placeholder="Ciudad"/>
                        <Form.Control.Feedback type="invalid">
                            Indique ciudad o localidad.
                        </Form.Control.Feedback>   
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Provincia</Form.Label>
                        <Form.Control required as="select" className="form-select" id="formState" defaultValue="">
                            <option disabled value="">Seleccionar...</option>
                            {
                                provincias.data.map((provincia, i) => <option key={i}>{provincia.name}</option>)
                            }
                        </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Seleccione una provincia.
                            </Form.Control.Feedback>    
                        </Form.Group>

                        <Form.Group as={Col} controlId="formZip">
                        <Form.Label>Código Postal</Form.Label>
                        <Form.Control required type="tel" pattern="[0-9]{4}" maxLength={4}/>
                        <Form.Control.Feedback type="invalid">
                            Indique su código postal.
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
        <div className="Checkout">
            { order === undefined ? <BillingInfoForm/> : <Redirect to={`/order/${order.id}`}/> }
        </div>
    )
}

export default Checkout