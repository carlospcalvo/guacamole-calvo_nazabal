import {useState} from 'react'
import './ItemCount.css'

const ItemCount = ({stock, initial, onAdd}) => {
    //State 
    const [finalValue, setFinalValue] = useState(initial);    
    
    //Helpers
    const reduceUnits = (e) => {
        e.preventDefault()
        if(finalValue > 1){
            setFinalValue(finalValue - 1) 
        }        
    }

    const addUnits = (e) => {
        e.preventDefault()
        if(finalValue < stock){
            setFinalValue(finalValue + 1) 
        }        
    }

    const submitClickHandler = (e) => {
        e.preventDefault()
        if(stock > 0){
            onAdd(e, finalValue)
            setFinalValue(initial)
        }
    }

    return (
        <>
            <form className="ItemCountContainer">
                <div>
                    <div className='ItemCountBtnContainer'>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <button className="ItemCountDecreaseBtn" onClick={(e) => reduceUnits(e)}>-</button>
                            <input className="ItemCountAmount" readOnly type="tel" value={"Cantidad: " + finalValue}/>
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