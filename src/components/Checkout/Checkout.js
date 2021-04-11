import {useState, useEffect} from 'react'
import {Card, Form, Col, Button} from 'react-bootstrap'
import {useCartContext} from '../../context/cartContext'
import {getFirestore} from '../../config/firebase'
import './Checkout.css'

const Checkout = () => {   
    //context
    const { cart, cartSize } = useCartContext()
    console.log(cart)
    //State Hooks
    const [validated, setValidated] = useState(false);

    //useEffect - creacion de la orden ? render "gracias por tu compra" : render "Hubo un error al generar la orden"


    const handleSubmit = (e) => {
        e.preventDefault()
        


        setValidated(true);
    }

    /* 
    const OrderDetail = () => {
        return (
            <h3>Su pedido ha sido realizado</h3>
        )
    }

    */

    const BillingInfoForm = () => {
        return (
            <Card className="CheckoutFormContainer">
                <h3>Datos de facturación</h3>
                <Form noValidate validated={validated} className={validated ? "was-validated" : "not-validated" } onSubmit={(e) => handleSubmit(e)}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type="email" placeholder="usuario@gmail.com" hasValidation/>
                            <Form.Control.Feedback type="invalid">
                                Email no válido.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control required type="tel" pattern="[0-9+-]{8,14}" maxLength={14} placeholder="Teléfono"/>
                            <Form.Control.Feedback type="invalid">
                                Teléfono no válido.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control required placeholder="Av. Siempreviva 742" />
                        <Form.Control.Feedback type="invalid">
                            Indique su dirección.
                        </Form.Control.Feedback>   
                    </Form.Group>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>Dirección 2</Form.Label>
                        <Form.Control placeholder="Piso, departamento, lote" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>Ciudad</Form.Label>
                        <Form.Control required placeholder="Ciudad"/>
                        <Form.Control.Feedback type="invalid">
                            Indique ciudad o localidad.
                        </Form.Control.Feedback>   
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Provincia</Form.Label>
                        <Form.Control required as="select" className="form-select" id="SelectProvince" defaultValue="">
                            <option disabled value="">Seleccionar...</option>
                            <option value="BA">Buenos Aires</option>
                            <option value="CF">Capital Federal</option>
                            <option value="CA">Catamarca</option>
                            <option value="CH">Chaco</option>
                            <option value="CT">Chubut</option>
                            <option value="CO">Córdoba</option>
                            <option value="CR">Corrientes</option>
                            <option value="ER">Entre Ríos</option>
                            <option value="FO">Formosa</option>
                            <option value="JU">Jujuy</option>
                            <option value="LP">La Pampa</option>
                            <option value="LR">La Rioja</option>
                            <option value="ME">Mendoza</option>
                            <option value="MI">Misiones</option>
                            <option value="NE">Neuquén</option>
                            <option value="RN">Río Negro</option>
                            <option value="SA">Salta</option>
                            <option value="SJ">San Juan</option>
                            <option value="SL">San Luis</option>
                            <option value="SC">Santa Cruz</option>
                            <option value="SF">Santa Fe</option>
                            <option value="SE">Santiago del Estero</option>
                            <option value="TF">Tierra del Fuego</option>
                            <option value="TU">Tucumán</option>
                        </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Seleccione una provincia.
                            </Form.Control.Feedback>    
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
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
            <BillingInfoForm />
        </div>
    )
}

export default Checkout