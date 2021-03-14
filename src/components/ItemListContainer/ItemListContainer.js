import ItemCard from '../ItemCard/ItemCard'

const ItemListContainer = ({greeting}) => {     
    return(
        <>
            <h4 style={{display: "flex", margin: '.5rem', justifyContent: "space-around", textAlign: "center"}}>{greeting}</h4>
            <ItemCard/>
        </>
        
    )
}

export default ItemListContainer
