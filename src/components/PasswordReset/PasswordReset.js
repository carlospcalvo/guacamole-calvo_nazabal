import {useRef, useState} from 'react'
import {Link} from 'react-router-dom'
import {Container, Form, Button, Card, Alert} from 'react-bootstrap'
import {useAuth} from '../../context/AuthContext'

const PasswordReset = () => { 
    //Auth
    const {currentUser, resetPassword} = useAuth()

    //Refs
    const emailRef = useRef()
        
    //State
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');    

    //Helpers 
    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        try{
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Las instrucciones para restaurar la contraseña te llegarán a tu mail en breve.')
        } catch {
            setError("Hubo un error al tratar de restaurar tu contraseña, intenta nuevamente.")
        }
        setLoading(false)
        
    }   

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth: "30rem"}}>   
                <Card className="rounded">
                    <Card.Body>
                        <h2 className="text-center mb-4">Restaurar contraseña</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        {message && <Alert variant="success">{message}</Alert>}
                        <Form onSubmit={(e)=>handleSubmit(e)}>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Button disabled={loading} style={{backgroundColor: "#e25a00"}} type="submit" block>Restaurar contraseña</Button>
                        </Form>
                        <div className="w-100 text-center mt-3">
                            {!currentUser && <Link to="/login">Ingresar</Link>}
                        </div>
                    </Card.Body>
                </Card>
                {
                    !currentUser && 
                    <div className="w-100 text-center mt-2">
                        ¿Aún no tenés tu cuenta? <Link to="/registrate">Registrate</Link>
                    </div>
                }
                
            </div>
        </Container> 
    )

}

export default PasswordReset