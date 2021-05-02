import {useRef, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Container, Form, Button, Card, Alert} from 'react-bootstrap'
import {useAuth} from '../../context/AuthContext'

const SignUp = ({location}) => { 
    //Auth
    const {signUp} = useAuth()

    //Location
    const history = useHistory()
        
    //Refs
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    //State
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    //Helpers 
    const  handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Las contraseñas no son iguales.")
        }

        try{
            setError('')
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value)
            location?.state?.fromCart ? history.push("/checkout") : history.goBack()
        } catch {
            setError("Hubo un error al crear tu usuario, intenta nuevamente.")
        }
        setLoading(false)
    }   

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "30rem"}}>   
                <Card className="rounded">
                    <Card.Body>
                        <h2 className="text-center mb-4">Registrate!</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={(e)=>handleSubmit(e)}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Confirmá tu contraseña</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required />
                            </Form.Group>
                            <Button disabled={loading} style={{backgroundColor: "#e25a00"}} type="submit" block>Registrarse</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    ¿Ya tenés una cuenta? <Link to={{pathname: "/login", state: { fromCart: location.state.fromCart }}}>Ingresar</Link>
                </div>
            </div>
        </Container>            
    )
}

export default SignUp