import ItemListSkeleton from '../ItemListSkeleton/ItemListSkeleton'
import Item from '../Item/Item'
import './ItemList.css'

const ItemList = ({items, category}) => {
   
    //Conditional rendering
    if(items.length === 0){
       return <ItemListSkeleton/>  
    } else {
        return (
            <div style={{textAlign: "center"}}>
                {category ? <h1 style={{margin:"2rem", textTransform: "capitalize"}}>{category}</h1> : null}
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