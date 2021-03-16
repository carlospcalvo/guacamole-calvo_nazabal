import {useState} from 'react'
import {Card} from 'react-bootstrap'
import ItemCount from '../ItemCount/ItemCount'
import './Item.css'

const Item = (props) => {
    const {title, description, price, pictureUrl} = props.item
    const [stockActual, setStockActual] = useState(5);
    const requestImageFile = require.context('../../images/items', true, /.jpg$/);
    const imgUrl = requestImageFile(`./${pictureUrl}.jpg`).default

    const restarStock = (e, pedido) => {
        e.preventDefault()
        if(stockActual >= pedido){
            setStockActual((stockActual) => stockActual - pedido)
        } 
    }

    return (
        <>
            <Card className='ItemContainer'>
                    <Card.Img className="ItemImage" variant="top" src={imgUrl} alt={title}/>
                    <Card.Body className="ItemBody">
                        <Card.Title className="ItemTitle">{title}</Card.Title>
                        <Card.Subtitle className="ItemDescription">{description}</Card.Subtitle>
                        <Card.Title className="ItemPrice">$ {price}</Card.Title>
                        <ItemCount stock={stockActual} initial={1} onAdd={restarStock} />
                    </Card.Body>                
            </Card>
        </>
    )

}

export default Item