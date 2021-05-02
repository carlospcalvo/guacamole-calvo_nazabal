import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {getFirestore} from '../../config/firebase'
import ItemDetail from "../ItemDetail/ItemDetail"
import ItemDetailSkeleton from '../ItemDetailSkeleton/ItemDetailSkeleton'
import ItemNotFound from '../ItemNotFound/ItemNotFound'
import './ItemDetailContainer.css'

const ItemDetailContainer = () => {
    //params
    let {id} = useParams()

    //State Hooks
    const [item, setItem] = useState([]);
    const [itemExists, setItemExists] = useState(undefined); 

    //Effect Hooks
    useEffect(() => {
        const db = getFirestore()
        const itemRef = db.collection('items').doc(id)

        if(id){
            setItem([])
            itemRef.get()
            .then((docRef) => {
                if(!docRef.exists){
                    setItemExists(false)
                } else {
                    setItem(docRef.data())
                    setItemExists(true)
                }
            })
            .catch((err) => {
                console.log("[ItemDetailContainer] Error searching items ", err)
            })
        } 
    }, [id]);

    //Helpers
    const Detail = () => itemExists ? <ItemDetail item={item} itemUid={id} /> : <ItemNotFound/>

    return (
        <div className="ItemDetailContainer">
            {itemExists !== undefined ? <Detail/> : <ItemDetailSkeleton />}
        </div>
    )
}

export default ItemDetailContainer