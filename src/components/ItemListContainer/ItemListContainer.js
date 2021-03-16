import ItemList from '../ItemList/ItemList'
import './ItemListContainer.css'

const ItemListContainer = ({greeting}) => {     
    return(
        <div className= "itemListContainer">
            <h4 className="greeting">{greeting}</h4>
            <ItemList className='ItemList'/>
        </div>        
    )
}

export default ItemListContainer
