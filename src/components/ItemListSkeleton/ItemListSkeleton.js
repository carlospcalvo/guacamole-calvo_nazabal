import Skeleton from 'react-loading-skeleton'
import ItemSkeleton from '../ItemSkeleton/ItemSkeleton'
import {useParams} from 'react-router-dom'

const ItemListSkeleton = () => {
    //params
    let {categoryId} = useParams()
    let cards = [0,1,2,3] //cantidad de skeleton cards a renderizar

    return (
        <div style={{justifyContent: "center"}}>
            {categoryId ? <Skeleton width={100} /> : null}
            <div className='itemList'>    
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