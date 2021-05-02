import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {getFirestore} from '../../config/firebase'
import ItemList from '../ItemList/ItemList'
import logo from '../../images/guacamole-logo.png';
import './ItemListContainer.css'

const ItemListContainer = ({greeting}) => {     
    //Location
    let {categoryId} = useParams()
        
    //State
    const [items, setItems] = useState([]);
    
    //Effect
    useEffect(() => {        
        const db = getFirestore()
        const itemCollection = db.collection('items')

        if(categoryId){
            setItems([])
            itemCollection.where("category", "==", categoryId).get()
            .then((querySnapshot) => {
                if(querySnapshot.size === 0){
                    console.log('[ItemListContainer] No results')
                } 
                setItems(querySnapshot.docs.map(doc => {
                    return {
                        uid: doc.id,
                        ...doc.data()
                    }    
                }))
            })
            .catch((err) => {
                console.log("[ItemList] Error searching items ", err)
            })
        } else {
            setItems([])
            itemCollection.get()
            .then((querySnapshot) => {
                if(querySnapshot.size === 0){
                    console.log('[ItemListContainer] No results')
                } 
                setItems(querySnapshot.docs.map(doc => {
                    return {
                        uid: doc.id,
                        ...doc.data()
                    }    
                }))
            })
            .catch((err) => {
                console.log("[App] Error searching items ", err)
            })
        }
        
    }, [categoryId]);   

    //Helpers
    const HomeBanner = <>
        <img id="logo" src={logo} alt="logo"/>
        <h4 className="greeting">{greeting}</h4>
    </>
    

    return(
        <div className= "itemListContainer">
            {greeting ?  HomeBanner : null }
            <ItemList items={items} category={categoryId} className='ItemList'/>
        </div>        
    )
}

export default ItemListContainer
