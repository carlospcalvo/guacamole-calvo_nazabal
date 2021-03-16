import {useState, useEffect} from 'react'
import Item from '../Item/Item'
import './ItemList.css'

const ItemList = () => {

    const [items, setItems] = useState([]);

    const getItems = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    [
                        {
                            id : 1, 
                            title : "Vestido Sandía",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum.",
                            price: 1485,
                            pictureUrl: 'vestido_sandia'
                        },
                        {
                            id : 2, 
                            title : "Vestido Ucrania",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum.",
                            price: 1200,
                            pictureUrl: 'vestido_ucrania'
                        },
                        {
                            id : 3, 
                            title : "Vestido Unicornio",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum.",
                            price: 1000,
                            pictureUrl: 'vestido_unicornio'
                        }
                    ]
                )  
                reject('Error al cargar, intenta volver a cargar la página')
            }, 2000);      
        })
    }

    useEffect(() => {
        getItems()
        .then(setItems)
        .catch((err) => console.log('error: ', err))
    }, []);

    return (
        <div className='itemList'>
        {items.map((x,i) => {
            return(
            <ul key={i}>
                <Item key={x.id} item={x}/>
            </ul>
            )
        })}
        </div>
    )

}

export default ItemList