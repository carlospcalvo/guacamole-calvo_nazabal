
import ItemList from '../ItemList/ItemList'
import logo from '../../images/guacamole-logo.png';
import './ItemListContainer.css'

const ItemListContainer = ({greeting}) => {    
    
    const HomeBanner = <>
        <img id="logo" src={logo} alt="logo"/>
        <h4 className="greeting">{greeting}</h4>
    </>
    
    return(
        <div className= "itemListContainer">
            {greeting ?  HomeBanner : null }
            <ItemList className='ItemList'/>
        </div>        
    )
}

export default ItemListContainer
