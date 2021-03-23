import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
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
        setItems([])
        getItems()
        .then((data) => {
            let filteredData = categoryId ? data.filter((element) => element.category === categoryId) : data
            setItems(filteredData)
        })
        .catch((err) => console.log('error: ', err))
    }, [categoryId]);

    //Helpers
    const getItems = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    [
                        {
                            id : 1, 
                            category: "nenas",
                            title : "Vestido Sandía",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum.",
                            price: 1485,
                            pictureUrl: 'vestido_sandia',
                            sizes: [2, 4, 6],
                            stock_per_size: {2: 5, 4: 8, 6: 10},
                            materials: "Lanilla"
                        },
                        {
                            id : 2, 
                            category: "nenas",
                            title : "Vestido Ucrania",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum.",
                            price: 1200,
                            pictureUrl: 'vestido_ucrania', 
                            sizes: [2, 4, 6],
                            stock_per_size: {2: 5, 4: 8, 6: 10},
                            materials: "Lanilla"
                        },
                        {
                            id : 3, 
                            category: "chiquititas",
                            title : "Vestido Unicornio",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum.",
                            price: 1000,
                            pictureUrl: 'vestido_unicornio',
                            sizes: [2, 4, 6],
                            stock_per_size: {2: 5, 4: 8, 6: 10},
                            materials: "Lanilla"
                        },
                        {
                            id : 1, 
                            category: "nenas",
                            title : "Vestido Sandía",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum.",
                            price: 1485,
                            pictureUrl: 'vestido_sandia',
                            sizes: [2, 4, 6],
                            stock_per_size: {2: 5, 4: 8, 6: 10},
                            materials: "Lanilla"
                        },
                        {
                            id : 2, 
                            category: "nenas",
                            title : "Vestido Ucrania",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum.",
                            price: 1200,
                            pictureUrl: 'vestido_ucrania',
                            sizes: [2, 4, 6],
                            stock_per_size: {2: 5, 4: 8, 6: 10},
                            materials: "Lanilla"
                        },
                        {
                            id : 3, 
                            category: "chiquititas",
                            title : "Vestido Unicornio",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum.",
                            price: 1000,
                            pictureUrl: 'vestido_unicornio',
                            sizes: [2, 4, 6],
                            stock_per_size: {2: 5, 4: 8, 6: 10},
                            materials: "Lanilla"
                        }
                    ]
                )  
                reject('Error al cargar, intenta volver a cargar la página')
            }, 2000);      
        })
    }

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