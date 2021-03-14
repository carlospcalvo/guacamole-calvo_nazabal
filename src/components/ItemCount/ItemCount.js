import {useState} from 'react'
import './ItemCount.css'

const ItemCount = ({stock, initial, onAdd}) => {
    const [finalValue, setFinalValue] = useState(initial);    

    const reduceUnits = (e) => {
        e.preventDefault()
        if(finalValue > 1){
            setFinalValue(finalValue - 1) 
        }        
    }

    const addUnits = (e) => {
        e.preventDefault()
        if(finalValue >= 0){
            setFinalValue(finalValue + 1) 
        }        
    }

    const submitClickHandler = (e) => {
        if(stock > 0){
            onAdd(e, finalValue)
            setFinalValue(initial)
        } else {
            e.preventDefault()
        }
    }

    return (
        <>
            <form className="ItemCountContainer">
                <div>
                    <h4 style={{display: "flex", fontSize: '.8rem', justifyContent: "center"}}>{stock > 0 ? `Stock disponible: ${stock} unidades` : 'No hay stock disponible'} </h4> 
                    <div className='ItemCountBtnContainer'>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <button className="ItemCountDecreaseBtn" onClick={(e) => reduceUnits(e)}>-</button>
                            <input className="number" readOnly type="text" value={finalValue}/>
                            <button className="ItemCountIncreaseBtn" onClick={stock > 0 ? (e)=> addUnits(e) : (e) => e.preventDefault()}>+</button>
                        </div>                        
                        <button className="ItemCountSubmit" onClick={ submitClickHandler }>Agregar al carrito</button>    
                    </div>                                    
                </div>
            </form>
        </>
    )
}

export default ItemCount