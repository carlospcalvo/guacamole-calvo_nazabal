import {useState} from 'react'
import {Toast} from 'react-bootstrap'
import './ItemCount.css'

const ItemCount = ({stock, initial, onAdd}) => {
    //State Hooks
    const [finalValue, setFinalValue] = useState(initial);    
    const [ShowNoStockToast, setShowNoStockToast] = useState(false);
    const [ToastMessage, setToastMessage] = useState("Seleccione un talle");

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
        } else if(stock === 0){
            setToastMessage("No hay stock disponible, lo sentimos!")
            setShowNoStockToast(true)
        } else {
            setShowNoStockToast(true)
        }
    }

    return (
        <>
            <form className="ItemCountContainer">
                <div>
                    <div className='ItemCountBtnContainer'>
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <button className="ItemCountDecreaseBtn" onClick={(e) => reduceUnits(e)}>-</button>
                            <input className="number" readOnly type="text" value={"Cantidad: " + finalValue}/>
                            <button className="ItemCountIncreaseBtn" onClick={stock > 0 ? (e)=> addUnits(e) : (e) => e.preventDefault()}>+</button>
                        </div>                        
                        <button className="ItemCountSubmit" onClick={ submitClickHandler }>Agregar al carrito</button>    
                    </div>                                    
                </div>
                <Toast id="NoStockToast" onClose={() => setShowNoStockToast(false)} show={ShowNoStockToast} delay={3000} autohide>
                    <Toast.Body>{ToastMessage}</Toast.Body>
                </Toast>
            </form>
        </>
    )
}

export default ItemCount