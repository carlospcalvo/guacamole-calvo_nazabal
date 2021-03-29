import {useState} from 'react'
import {Image, Card, ListGroup, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import ItemStockDetail from '../ItemStockDetail/ItemStockDetail'
import ItemCount from '../ItemCount/ItemCount'
import './ItemDetail.css'

const ItemDetail = (props) => {
    //props
    const {title, description, price, pictureUrl, sizes, stock_per_size, materials} = props.item[0]
    //context for images
    const requestImageFile = require.context('../../images/items', true, /.jpeg$/);
    const imgUrl = requestImageFile(`./${pictureUrl}.jpeg`).default
    
    //State Hooks
    const [stockActual, setStockActual] = useState(-1);
    const [SelectedSize, setSelectedSize] = useState(0);
    const [StockPerSize, setStockPerSize] = useState(stock_per_size);
    const [CounterComponent, setCounterComponent] = useState("ItemCount");

    //Helpers
    const restarStock = (e, pedido) => {
        e.preventDefault()
        if(stockActual >= pedido){
            setStockActual((stockActual) => stockActual - pedido)
            let aux = {...StockPerSize}
            aux[SelectedSize] = stockActual - pedido
            setStockPerSize(aux)
            setCounterComponent("Add to cart")
        }
    }
    
    const selectSize = (e) => {
        setSelectedSize(e.target.value)
        setStockActual(StockPerSize[e.target.value])
    }

    //Components

    const Counter = () => {
        if(CounterComponent === 'ItemCount'){
            return <ItemCount stock={stockActual} initial={1} onAdd={restarStock}/>
        } else {
            return <Button as={Link} to="/cart" variant="warning" id="ItemDetailGoToCartBtn">Terminar mi compra</Button>
        }

    }

    return (            
        <>
            <Card key={pictureUrl}>
                <div className="DetailsContainer">
                    <Image className="ItemDetailImage" src={imgUrl} alt={title} thumbnail />
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