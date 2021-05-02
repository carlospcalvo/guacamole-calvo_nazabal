import {useRef} from 'react';
import {Link} from 'react-router-dom'
import {Container,Table, Media, Button} from 'react-bootstrap'
import {FaTrash, FaTimes, FaShoppingCart} from 'react-icons/fa'
import {useAuth} from '../../context/AuthContext'
import {getFirestore} from '../../config/firebase'
import firebase from 'firebase/app' 
import {useCartContext} from '../../context/cartContext'

const Wishlist = ({items, loading}) => {
    //Auth
    const {currentUser} = useAuth()

    //Cart Context
    const {addToCart} = useCartContext()    

    //Ref
    const qtyRef = useRef([])

    //Helpers
    const addItemToCart = (index, item) => {
        if(window.confirm("El item será agregado al carrito.")){
            const db = getFirestore()
            const wishlist = db.collection("wishlists").doc(currentUser.uid)
            let itemAux = {
                "item": {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    price: item.price,
                    size: item.selectedSize,
                    pictureUrl: item.pictureUrl
                },
                quantity: parseInt(document.getElementById(qtyRef.current[index].id).value)
            }

            if(item.stock_per_size[item.selectedSize] === 0){
                window.alert(`No tenemos stock disponible, lo sentimos :(`)
                return;
            } else if(itemAux.quantity > item.stock_per_size[item.selectedSize] && item.stock_per_size[item.selectedSize] > 0){
                window.alert(`Esa cantidad supera el stock, actualmente sólo contamos con ${item.stock_per_size[item.selectedSize]} unidades disponibles.`)
                return;
            } else {
                addToCart(itemAux)
                wishlist.update({"items": firebase.firestore.FieldValue.arrayRemove({"id":item.uid, "size": item.selectedSize})})
            }
        }
    }

    const removeItem = (item) => {
        if(window.confirm("El item será eliminado de favoritos.")){
            const db = getFirestore()
            const wishlist = db.collection("wishlists").doc(currentUser.uid)

            wishlist.update({"items": firebase.firestore.FieldValue.arrayRemove({"id":item.uid, "size": item.selectedSize})})
        }
    }

    const removeAll = () => {
        if(window.confirm("Se eliminarán todos los items de favoritos.")){
            const db = getFirestore()
            const wishlist = db.collection("wishlists").doc(currentUser.uid)

            wishlist.delete()
        }
    }

    return (
        <>
            {
                items.length > 0  ? 
                <Container fluid className="CartListItemContainer">     
                    <Table hover style={{outlineStyle: "solid", outlineColor: "rgb(222, 226, 230)", outlineWidth: "1px"}}>
                        <thead>
                            <tr>
                            <th>Producto</th>
                            <th className="align-middle text-center">Cantidad</th>
                            <th className="align-middle text-center">Precio</th>
                            <th className="align-middle text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                        {  
                            items.map((item,i) => {
                                    let requestImageFile = require.context('../../images/items', true, /.jpeg$/);
                                    let imgUrl = requestImageFile(`./${item.pictureUrl}.jpeg`).default
                                    return (
                                        <tr key={i}>
                                            <td>
                                                <Media as="li" style={{minWidth:"10rem"}}>
                                                    <img width={64} height={64} className="mr-3" src={imgUrl} alt={item.title}/>
                                                    <Media.Body>
                                                    <h5>{item.title}</h5>
                                                    <p>Talle: {item.selectedSize}</p>
                                                    </Media.Body> 
                                                </Media>
                                            </td>
                                            <td className="align-middle text-center">
                                                <input 
                                                    type="number" 
                                                    ref={ref => qtyRef.current.length < items.length ? qtyRef.current.push(ref) : null} 
                                                    defaultValue={1} 
                                                    min={1} 
                                                    max={item.stock_per_size[item.selectedSize]} 
                                                    style={{maxWidth: "3.5rem", textAlign: "center"}} 
                                                    name={`item_${i}_amount`} id={`item_${i}_amount`}
                                                />
                                            </td>
                                            <td className="align-middle text-center">${item.price}</td>
                                            <td className="align-middle">
                                                <div style={{display: "flex", justifyContent: "space-around"}}>
                                                    <Button variant="light" id={i} onClick={() => addItemToCart(i, item)} style={{maxWidth:"3rem", marginRight: ".5rem"}}>
                                                        <FaShoppingCart style={{color: 'green'}} id={i}/>
                                                    </Button>
                                                    <Button variant="light" id={i} onClick={() => removeItem(item)}>
                                                        <FaTimes style={{color: 'red'}} id={i}/>
                                                    </Button>
                                                </div>                                        
                                            </td>
                                        </tr>
                                    ) 
                                }
                            )
                        }  
                            <tr>
                                <td/>
                                <td/>
                                <td className="align-middle text-center">Vaciar carrito</td>
                                <td className="align-middle text-center">
                                    <Button variant="light" onClick={() => removeAll()}>
                                        <FaTrash style={{color: 'red'}}/>
                                    </Button>
                                </td>
                            </tr>                      
                        </tbody>
                    </Table>
                </Container>
                :
                loading &&
                <div className="d-flex flex-column justify-content-center text-center align-middle mt-5">
                    <h3>Aún no agregaste nada a favoritos!</h3>
                    <Button as={Link} to="/" variant="outline-danger" id="EmptyCartBtn" style={{maxWidth: "10rem", display:"flex", alignSelf: "center"}}>Ir al catálogo</Button>
                </div>
            }
        </>
    )   
}

export default Wishlist;
