import {useState, useEffect} from 'react'
import {Image, Card, ListGroup, Button} from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import ItemStockDetail from '../ItemStockDetail/ItemStockDetail'
import ItemCount from '../ItemCount/ItemCount'
import {useCartContext} from '../../context/cartContext'
import {useAuth} from '../../context/AuthContext'
import {getFirestore} from '../../config/firebase'
import firebase from 'firebase/app' 
import './ItemDetail.css'

const ItemDetail = (props) => {
    //props
    const {id, title, description, price, pictureUrl, sizes, stock_per_size, materials} = props.item
    const itemUid = props.itemUid
    const requestImageFile = require.context('../../images/items', true, /.jpeg$/);
    const imgUrl = requestImageFile(`./${pictureUrl}.jpeg`).default
    
    //Context
    const cartContext = useCartContext()

    //Auth
    const {currentUser} = useAuth()

    //Location
    const history = useHistory()    

    //State Hooks
    const [stockActual, setStockActual] = useState(-1)
    const [previousSize, setPreviousSize] = useState()
    const [selectedSize, setSelectedSize] = useState(0)
    const [stockPerSize, setStockPerSize] = useState(stock_per_size)
    const [hideCartBtn, setHideCartBtn] = useState(true)
    const [wishlistItems, setWishlistItems] = useState([])
    const [loading, setLoading] = useState(false)

    //Effects
    useEffect(() => {
        if(currentUser){
            const db = getFirestore()
            const wishlist = db.collection("wishlists")
            setLoading(true)
            
            wishlist.doc(currentUser.uid).get()
            .then((docRef) => {            
                if(docRef.exists){
                    setWishlistItems([...docRef.data().items.map(item => item.id)])
                }
            })
            .catch((err) => {
                console.log("[ItemDetail] Error fetching wishlist.", err)
            })               
            setLoading(false)
        }
        
    }, [currentUser, id]);

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
        
        if(previousSize) {
            previousSize.className = previousSize.className.substring( 0, previousSize.className.indexOf("active"))
            previousSize.blur()
        }
        e.target.className += ' active'
        e.target.focus()
        setPreviousSize(e.target)
    }

    const addToWishlist = () => {
        
        if(!currentUser){
            if(window.confirm("Para agregar a favoritos debes loguearte. ¿Quieres ingresar?")){
                history.push("/login")
            }
        } else {
            const db = getFirestore()
            const wishlist = db.collection("wishlists").doc(currentUser.uid)
            setLoading(true)

            if(wishlistItems.includes(itemUid)){
                wishlist.update({"items": firebase.firestore.FieldValue.arrayRemove({"id":itemUid, "size": selectedSize})})
                setWishlistItems(wishlistItems.filter(item => item !== itemUid))
            } else {
                if(wishlistItems.length > 0){
                    wishlist.update({items: firebase.firestore.FieldValue.arrayUnion({"id":itemUid, "size": selectedSize})})
                    setWishlistItems([...wishlistItems, itemUid])
                } else {
                    wishlist.set({
                         uid: currentUser.uid,
                         items: [{
                            "id": itemUid,
                            "size": selectedSize
                        }]
                    })
                    setWishlistItems([itemUid])
                }        
            }
            setLoading(false)
        }
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
                                    <Button hidden={selectedSize === 0} disabled={loading} variant="warning" id="ItemDetailAddToFavs" onClick={addToWishlist}>{!wishlistItems.includes(itemUid) ? "Agregar a" : "Quitar de"} favoritos</Button>
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