import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import ItemDetail from "../ItemDetail/ItemDetail"
import './ItemDetailContainer.css'
import ItemDetailSkeleton from '../ItemDetailSkeleton/ItemDetailSkeleton'


const ItemDetailContainer = () => {
    //params
    let {id} = useParams()
    
    //State Hooks
    const [item, setItem] = useState([]);

    //Effect Hooks
    useEffect(() => {
        getItem()
        .then((data) => {
            let filteredData = id ? data.filter((element) => element.id === parseInt(id)) : data
            setItem(filteredData)
        })
        .catch((err) => console.log('error: ', err))
    }, [id]);

    //Helpers
    const getItem = () => {
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
                            stock_per_size: {2: 0, 4: 8, 6: 10},
                            materials: "Poliéster"
                        },
                        {
                            id : 2, 
                            category: "nenas",
                            title : "Vestido Ucrania",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum.",
                            price: 1200,
                            pictureUrl: 'vestido_ucrania', 
                            sizes: [2, 4, 6, 8, 10],
                            stock_per_size: {2: 5, 4: 8, 6: 10, 8: 2, 10: 3},
                            materials: "Lanilla"
                        },
                        {
                            id : 3, 
                            category: "chiquititas",
                            title : "Vestido Unicornio",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum.",
                            price: 1000,
                            pictureUrl: 'vestido_unicornio',
                            sizes: [2, 4, 6, 8, 10, 12],
                            stock_per_size: {2: 5, 4: 8, 6: 10, 8: 1, 10: 8, 12: 6},
                            materials: "Lanilla"
                        },
                        {
                            id : 4, 
                            category: "pre-teens",
                            title : "Remera Rayas",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum.",
                            price: 800,
                            pictureUrl: 'remera_rayas',
                            sizes: [10, 12, 14, 16],
                            stock_per_size: {10: 8, 12: 6, 14: 1, 16: 4},
                            materials: "Algodón"
                        },
                        {
                            id : 5, 
                            category: "nenas",
                            title : "Remera Mariposas",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum.",
                            price: 750,
                            pictureUrl: 'remera_mariposas',
                            sizes: [2, 4, 6, 8, 10],
                            stock_per_size: {2: 5, 4: 8, 6: 10, 8: 1, 10: 8},
                            materials: "Algodón"
                        },
                        {
                            id : 6, 
                            category: "pre-teens",
                            title : "Campera Rosa",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum.",
                            price: 1600,
                            pictureUrl: 'campera_corderito_rosa',
                            sizes: [10, 12, 14, 16],
                            stock_per_size: {10: 2, 12: 3, 14: 7, 16: 5},
                            materials: "Corderito"
                        },
                        {
                            id : 7, 
                            category: "pre-teens",
                            title : "Sweater Estambul",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum.",
                            price: 1200,
                            pictureUrl: 'sweater_estambul',
                            sizes: [10, 12, 14, 16],
                            stock_per_size: {10: 3, 12: 5, 14: 6, 16: 8},
                            materials: "Lanilla"
                        },
                        {
                            id : 8, 
                            category: "chiquititas",
                            title : "Remera Conejito",
                            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rutrum.",
                            price: 650,
                            pictureUrl: 'remera_conejito',
                            sizes: [2, 4, 6, 8, 10, 12],
                            stock_per_size: {2: 7, 4: 5, 6: 3, 8:4, 10:2, 12:1},
                            materials: "Lanilla"
                        }
                    ]
                )  
                reject('Error al cargar, intenta volver a cargar la página')
            }, 2000);      
        })
    }

    return (
        <div className="ItemDetailContainer">
            {item.length > 0 ? <ItemDetail item={item} /> : <ItemDetailSkeleton />}
        </div>
    )
}

export default ItemDetailContainer
