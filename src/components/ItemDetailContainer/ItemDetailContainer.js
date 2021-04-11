import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {getFirestore} from '../../config/firebase'
import ItemDetail from "../ItemDetail/ItemDetail"
import ItemDetailSkeleton from '../ItemDetailSkeleton/ItemDetailSkeleton'
import './ItemDetailContainer.css'

const ItemDetailContainer = () => {
    //params
    let {id} = useParams()

    //State Hooks
    const [item, setItem] = useState([]);

    //Effect Hooks
    useEffect(() => {
        const db = getFirestore()
        const itemCollection = db.collection('items')

        if(id){
            setItem([])
            itemCollection.where("id", "==", parseInt(id)).get()
            .then((querySnapshot) => {
                if(querySnapshot.size === 0){
                    console.log('[ItemDetailContainer] No results')
                } 
                setItem(querySnapshot.docs.map(doc => doc.data()))
            })
            .catch((err) => {
            console.log("[ItemDetailContainer] Error searching items ", err)
            })
        } 
    }, [id]);

    

    return (
        <div className="ItemDetailContainer">
            {item.length > 0 ? <ItemDetail item={item} /> : <ItemDetailSkeleton />}
        </div>
    )
}

export default ItemDetailContainer
