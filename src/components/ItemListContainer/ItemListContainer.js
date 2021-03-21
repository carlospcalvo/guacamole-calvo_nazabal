import ItemList from '../ItemList/ItemList'
import logo from '../../images/guacamole-logo.png';
import './ItemListContainer.css'

const ItemListContainer = ({greeting}) => {     
    return(
        <div className= "itemListContainer">
            <img id="logo" src={logo} alt="logo"/>
            <h4 className="greeting">{greeting}</h4>
            <ItemList className='ItemList'/>
        </div>        
    )
}

export default ItemListContainer
