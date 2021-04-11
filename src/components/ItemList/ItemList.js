import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {getFirestore} from '../../config/firebase'
import ItemListSkeleton from '../ItemListSkeleton/ItemListSkeleton'
import Item from '../Item/Item'
import './ItemList.css'

const ItemList = () => {
    //params
    let {categoryId} = useParams()
    
    //State Hooks
    const [items, setItems] = useState([]);
    
    //Effect Hooks
    useEffect(() => {        
        const db = getFirestore()
        const itemCollection = db.collection('items')

        if(categoryId){
            setItems([])
            itemCollection.where("category", "==", categoryId).get()
            .then((querySnapshot) => {
                if(querySnapshot.size === 0){
                    console.log('[ItemList] No results')
                } 
                setItems(querySnapshot.docs.map(doc => doc.data()))
            })
            .catch((err) => {
            console.log("[ItemList] Error searching items ", err)
            })
        } else {
            setItems([])
            itemCollection.get()
            .then((querySnapshot) => {
                if(querySnapshot.size === 0){
                    console.log('[ItemList] No results')
                } 
                setItems(querySnapshot.docs.map(doc => doc.data()))
            })
            .catch((err) => {
            console.log("[App] Error searching items ", err)
            })
        }
        
    }, [categoryId]);   

    //Conditional rendering
    if(items.length === 0){
       return <ItemListSkeleton/>  
    } else {
        return (
            <div style={{textAlign: "center"}}>
                {categoryId ? <h1 style={{margin:"2rem", textTransform: "capitalize"}}>{categoryId}</h1> : null}
                <div className='itemList'>    
                    {items.map((x,i) => {
                        return(
                        <ul key={i}>
                            <Item key={x.id} item={x}/>
                        </ul>
                        )
                    })}    
                </div>
            </div>        
        )
    }
}

export default ItemList