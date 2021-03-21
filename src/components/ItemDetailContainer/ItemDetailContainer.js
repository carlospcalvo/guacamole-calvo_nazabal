import {useState, useEffect} from 'react'
import ItemDetail from "../ItemDetail/ItemDetail"
import './ItemDetailContainer.css'
import ItemDetailSkeleton from '../ItemDetailSkeleton/ItemDetailSkeleton'


const ItemDetailContainer = () => {

    /* const item = {
        id : 1, 
        title : "Vestido Unicornio",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum.",
        price: 1485,
        pictureUrl: "vestido_unicornio",
        sizes: [2, 4, 6],
        stock: 10,
        materials: "Lanilla"
    } */

    const [item, setItem] = useState([]);

    const getItem = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(
                    [
                        {
                            id : 3, 
                            title : "Vestido Unicornio",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum.",
                            price: 1485,
                            pictureUrl: "vestido_unicornio",
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

    useEffect(() => {
        getItem()
        .then(setItem)
        .catch((err) => console.log('error: ', err))
    }, []);

    return (
        <div className="ItemDetailContainer">
            {item.length > 0 ? <ItemDetail item={item} /> : <ItemDetailSkeleton />}
        </div>
    )
}

export default ItemDetailContainer


/*

{
    id : 3, 
    title : "Vestido Unicornio",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum.",
    price: 1485,
    pictureUrl: "vestido_sandia",
    sizes: [2, 4, 6],
    stock: 10,
    materials: "Lanilla"
}

*/