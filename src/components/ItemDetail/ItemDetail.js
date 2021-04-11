import {useState} from 'react'
import {Image, Card, ListGroup, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import ItemStockDetail from '../ItemStockDetail/ItemStockDetail'
import ItemCount from '../ItemCount/ItemCount'
import {useCartContext} from '../../context/cartContext'
import './ItemDetail.css'

const ItemDetail = (props) => {
    //props
    const {id, title, description, price, pictureUrl, sizes, stock_per_size, materials} = props.item[0]
    //images
    const requestImageFile = require.context('../../images/items', true, /.jpeg$/);
    const imgUrl = requestImageFile(`./${pictureUrl}.jpeg`).default
    
    //Context
    const cartContext = useCartContext()

    //State Hooks
    const [stockActual, setStockActual] = useState(-1);
    const [selectedSize, setSelectedSize] = useState(0);
    const [stockPerSize, setStockPerSize] = useState(stock_per_size);
    const [hideCartBtn, setHideCartBtn] = useState(true);

    //Helpers
    const restarStock = (e, pedido) => {
        e.preventDefault()
        if(stockActual >= pedido){
            setStockActual((stockActual) => stockActual - pedido)
            let aux = {...stockPerSize}
            aux[selectedSize] = stockActual - pedido
            setStockPerSize(aux)
            setHideCartBtn(false)
            cartContext.addToCart({
                item: {
                    id, 
                    title,
                    description,
                    price,
                    size: selectedSize,
                    pictureUrl
                }, 
                quantity: pedido
            })
        }
    }
    
    const selectSize = (e) => {
        setSelectedSize(e.target.value)
        setStockActual(stockPerSize[e.target.value])
    }
    
    const Counter = () => {
        if(parseInt(stockActual) === 0){
            return <b>No hay stock disponible :(</b>
        } else {
            return parseInt(selectedSize) === 0 ? null : <ItemCount stock={stockActual} initial={1} onAdd={restarStock}/>
        }  
    }

    return (            
        <>
            <Card key={pictureUrl}>
                <div className="DetailsContainer">
                    <div className="ItemDetailImageContainer">
                        <Image className="ItemDetailImage" src={imgUrl} alt={title} thumbnail />
                    </div>                    
                    <div className="Details">
                        <Card.Body>
                            <Card.Header><h1>{title}</h1></Card.Header>
                            <ListGroup variant="flush">
                                <ListGroup.Item><h2>Precio: ${price}</h2></ListGroup.Item>
                                <ListGroup.Item>Descripción: {description}</ListGroup.Item>
                                <ListGroup.Item>Materiales: {materials}</ListGroup.Item>
                                <ListGroup.Item className="ItemDetailSizes">
                                    <ItemStockDetail onClick={selectSize} stock={stockActual} sizes={sizes} />                                 
                                </ListGroup.Item>
                                <ListGroup.Item id="ItemDetailCartBtn">
                                    <Counter/>
                                    <Button hidden={hideCartBtn} as={Link} to="/cart" variant="warning" id="ItemDetailGoToCartBtn">Ir al carrito</Button>
                                </ListGroup.Item>    
                            </ListGroup>                                
                        </Card.Body>                            
                    </div>                        
                </div>
            </Card>
        </>
    )
}

export default ItemDetail