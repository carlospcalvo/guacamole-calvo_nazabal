import Skeleton from 'react-loading-skeleton'
import ItemSkeleton from '../ItemSkeleton/ItemSkeleton'
import {useParams} from 'react-router-dom'

const ItemListSkeleton = () => {
    //params
    let {categoryId} = useParams()
    let cards = [0,1,2,3] //cantidad de skeleton cards a renderizar

    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "2rem"}}>
            {categoryId ? <Skeleton width={200} height={50} /> : null}
            <div className='itemList' style={{marginTop: "1.5rem"}}>    
                {cards.map((x,i) => {
                    return(
                    <ul key={i}>
                        <ItemSkeleton key={x.id}/>
                    </ul>
                    )
                })}    
            </div>
        </div>        
    )
}

export default ItemListSkeleton