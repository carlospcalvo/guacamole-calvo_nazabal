import {useState} from 'react'
import {Card} from 'react-bootstrap'
import './ItemCard.css'
import ItemCount from '../ItemCount/ItemCount'
import picture from '../../images/vestido_sandia.jpg'

const ItemCard = ({stock, initial, onAdd}) => {
    const [stockActual, setStockActual] = useState(5);

    const restarStock = (e, pedido) => {
        e.preventDefault()
        if(stockActual >= pedido){
            setStockActual((stockActual) => stockActual - pedido)
        } 
    }

    return (
        <>
            <Card className='ItemCardContainer'>
                <Card.Img variant="top" src={picture} alt='Vestido Sandía'/>
                <Card.Body>
                    <div className="ItemCardTitle">
                        <Card.Subtitle>Vestido Sandía</Card.Subtitle>
                    </div>
                    <div className="ItemCardPrice">
                        <Card.Title>$1.485</Card.Title>
                    </div>
                    <ItemCount stock={stockActual} initial={1} onAdd={restarStock} />
                </Card.Body>
            </Card>
        </>
    )

}

export default ItemCard