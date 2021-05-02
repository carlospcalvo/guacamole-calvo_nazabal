import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './ItemNotFound.css'

const ItemNotFound = () => {
    return (
        <div className="ItemNotFound">
            <h1>El item que buscas no existe</h1>
            <Button as={Link} to="/" variant="outline-danger" id="EmptyCartBtn" style={{maxWidth: "10rem", display:"flex", alignSelf: "center"}}>Ir al catálogo</Button>
        </div>
    )
}

export default ItemNotFound