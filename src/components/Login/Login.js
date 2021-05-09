import {useRef, useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Container, Form, Button, Card, Alert} from 'react-bootstrap'
import {useAuth} from '../../context/AuthContext'

const Login = ({location}) => { 
    //Auth
    const {login} = useAuth()

    //Location
    const history = useHistory()

    //Refs
    const emailRef = useRef()
    const passwordRef = useRef()

    //State
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false) 

    //Helpers 
    async function handleSubmit(e){
        e.preventDefault()
        e.stopPropagation()
        
        try{
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            location?.state?.fromCart ? history.push('/checkout') : history.push('/')
        } catch(error) {
            switch (error.code) {
                case 'auth/invalid-email':
                    setError("Email no válido.")    
                    break;
                case 'auth/user-disabled':
                    setError('Su usuario ha sido inhabilitado.')
                    break;
                case 'auth/user-not-found':
                    setError('El usuario no existe.')
                    break;
                case 'auth/wrong-password':
                    setError('Contraseña incorrecta.')
                    break;
                default:
                    setError(error.message)
                    break;
            }
            
        }
        setLoading(false)
        
    }   

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "30rem"}}>   
                <Card className="rounded">
                    <Card.Body>
                        <h2 className="text-center mb-4">Logueate!</h2>
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
                            <Button disabled={loading} style={{backgroundColor: "#e25a00"}} type="submit" block>Ingresar</Button>
                        </Form>
                        <div className="w-100 text-center mt-3">
                            <Link to="/recover-password" style={{color: "blue"}}>Olvidé mi contraseña</Link>
                        </div>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    ¿Aún no tenés tu cuenta? <Link to="/registrate" style={{color: "blue"}}>Registrate</Link>
                </div>
            </div>
        </Container> 
    )
}

export default Login